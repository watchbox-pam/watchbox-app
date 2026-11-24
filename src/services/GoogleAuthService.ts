import {
	GoogleSignin,
	isErrorWithCode,
	isSuccessResponse,
	statusCodes
} from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { ApiHelper } from "@/src/utils/axios";

/**
 * Client ID OAuth Google de type "Application Web".
 * Google l'inscrit comme destinataire (audience) du jeton,
 * et le backend vérifie qu'il correspond à GOOGLE_CLIENT_IDS.
 */
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

// Android uniquement pour l'instant : iOS sera configuré dans la branche Apple
export const isGoogleSignInAvailable = Platform.OS === "android";

export type GoogleSession = {
	id: string;
	username: string;
	token: string;
};

export type GoogleSignInResult =
	// Compte connu : l'utilisateur est connecté, la session est enregistrée
	| { status: "logged_in"; session: GoogleSession }
	// Nouveau compte : il faut afficher l'écran "Finaliser l'inscription"
	| {
			status: "registration_required";
			registrationToken: string;
			email: string;
			suggestedUsername: string;
	  }
	// L'utilisateur a fermé la fenêtre Google : rien à afficher
	| { status: "cancelled" }
	| { status: "error"; message: string };

let isConfigured = false;

function configureGoogleSignIn() {
	if (isConfigured) return;
	GoogleSignin.configure({ webClientId });
	isConfigured = true;
}

/**
 * Enregistre la session exactement comme la connexion classique (LoginService) :
 * au prochain démarrage, checkLogin() la retrouve et l'utilisateur reste connecté.
 */
async function storeSession(session: GoogleSession) {
	if (Platform.OS === "ios" || Platform.OS === "android") {
		await SecureStore.setItemAsync("id", session.id);
		await SecureStore.setItemAsync("identifier", session.username);
		await SecureStore.setItemAsync("token", JSON.stringify(session.token));
	} else {
		localStorage.setItem("id", session.id);
		localStorage.setItem("identifier", session.username);
		localStorage.setItem("token", JSON.stringify(session.token));
	}
}

function errorMessage(data: unknown, fallback: string) {
	return typeof data === "string" && data ? data : fallback;
}

/**
 * Transforme la réponse "logged_in" du backend en session et l'enregistre.
 */
async function saveLoggedInResponse(data: any): Promise<GoogleSignInResult> {
	const session: GoogleSession = {
		id: data.user_id,
		username: data.username,
		token: data.token
	};
	await storeSession(session);
	return { status: "logged_in", session };
}

/**
 * Étape 1 : ouvre la fenêtre Google, puis envoie le jeton obtenu au backend.
 */
export async function signInWithGoogle(): Promise<GoogleSignInResult> {
	if (!isGoogleSignInAvailable) {
		return {
			status: "error",
			message:
				"La connexion avec Google n'est pas encore disponible sur cet appareil"
		};
	}

	if (!webClientId) {
		console.error(
			"[GOOGLE AUTH] EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID manquant dans le .env"
		);
		return {
			status: "error",
			message: "La connexion avec Google n'est pas configurée"
		};
	}

	try {
		configureGoogleSignIn();
		await GoogleSignin.hasPlayServices({
			showPlayServicesUpdateDialog: true
		});

		const response = await GoogleSignin.signIn();
		if (!isSuccessResponse(response)) {
			return { status: "cancelled" };
		}

		const idToken = response.data.idToken;
		if (!idToken) {
			return {
				status: "error",
				message: "Google n'a pas renvoyé de jeton d'identification"
			};
		}

		const result = await ApiHelper.post("/users/auth/google", {
			id_token: idToken
		});

		if (!result.success) {
			// Déconnecte le compte Google pour pouvoir en choisir un autre au prochain essai
			await signOutFromGoogle();
			return {
				status: "error",
				message: errorMessage(
					result.data,
					"La connexion avec Google a échoué"
				)
			};
		}

		if (result.data.status === "registration_required") {
			return {
				status: "registration_required",
				registrationToken: result.data.registration_token,
				email: result.data.email,
				suggestedUsername: result.data.suggested_username
			};
		}

		return await saveLoggedInResponse(result.data);
	} catch (error) {
		if (isErrorWithCode(error)) {
			switch (error.code) {
				case statusCodes.SIGN_IN_CANCELLED:
				case statusCodes.IN_PROGRESS:
					return { status: "cancelled" };
				case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
					return {
						status: "error",
						message:
							"Les services Google Play sont indisponibles ou doivent être mis à jour"
					};
			}
		}
		console.error("[GOOGLE AUTH] Erreur :", error);
		return {
			status: "error",
			message: "La connexion avec Google a échoué, veuillez réessayer"
		};
	}
}

/**
 * Étape 2 (nouveau compte) : envoie le pseudo, la date de naissance et le pays.
 * Le backend crée le compte puis renvoie la session.
 */
export async function completeGoogleRegistration(params: {
	registrationToken: string;
	username: string;
	birthdate: Date;
	country: string;
}): Promise<GoogleSignInResult> {
	try {
		const result = await ApiHelper.post("/users/auth/google/register", {
			registration_token: params.registrationToken,
			username: params.username.trim(),
			// Même format que l'inscription classique (SignupService) : AAAA-MM-JJ
			birthdate: params.birthdate.toISOString().split("T")[0],
			country: params.country
		});

		if (!result.success) {
			return {
				status: "error",
				message: errorMessage(
					result.data,
					"La création du compte a échoué"
				)
			};
		}

		return await saveLoggedInResponse(result.data);
	} catch (error) {
		console.error("[GOOGLE AUTH] Erreur inscription :", error);
		return {
			status: "error",
			message: "La création du compte a échoué, veuillez réessayer"
		};
	}
}

/**
 * Déconnecte le compte Google sur l'appareil (à appeler à la déconnexion Watchbox),
 * pour que l'utilisateur puisse choisir un autre compte la fois suivante.
 * Sans effet s'il ne s'était pas connecté avec Google.
 */
export async function signOutFromGoogle() {
	if (!isGoogleSignInAvailable || !webClientId) return;

	try {
		configureGoogleSignIn();
		if (GoogleSignin.hasPreviousSignIn()) {
			await GoogleSignin.signOut();
		}
	} catch (error) {
		console.warn("[GOOGLE AUTH] Déconnexion Google impossible :", error);
	}
}
