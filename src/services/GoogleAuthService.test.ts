import * as SecureStore from "expo-secure-store";
import {
	GoogleSignin,
	statusCodes
} from "@react-native-google-signin/google-signin";
import { ApiHelper } from "@/src/utils/axios";

jest.mock("react-native", () => ({ Platform: { OS: "android" } }));
jest.mock("@react-native-google-signin/google-signin", () => ({
	GoogleSignin: {
		configure: jest.fn(),
		hasPlayServices: jest.fn().mockResolvedValue(true),
		signIn: jest.fn(),
		signOut: jest.fn().mockResolvedValue(null),
		hasPreviousSignIn: jest.fn().mockReturnValue(true)
	},
	isSuccessResponse: (response: any) => response?.type === "success",
	isErrorWithCode: (error: any) => error && typeof error.code === "string",
	statusCodes: {
		SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
		IN_PROGRESS: "IN_PROGRESS",
		PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE"
	}
}));
jest.mock("expo-secure-store", () => ({ setItemAsync: jest.fn() }));
jest.mock("@/src/utils/axios", () => ({ ApiHelper: { post: jest.fn() } }));

process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = "web-client-id";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const service = require("./GoogleAuthService");

const mockedSignIn = GoogleSignin.signIn as jest.Mock;
const mockedPost = ApiHelper.post as jest.Mock;

describe("GoogleAuthService", () => {
	beforeEach(() => jest.clearAllMocks());

	it("connecte un compte Google déjà connu et enregistre la session comme le login classique", async () => {
		mockedSignIn.mockResolvedValue({
			type: "success",
			data: { idToken: "google-token" }
		});
		mockedPost.mockResolvedValue({
			success: true,
			data: {
				status: "logged_in",
				user_id: "u1",
				username: "Arno",
				token: "jwt"
			}
		});

		const result = await service.signInWithGoogle();

		expect(GoogleSignin.configure).toHaveBeenCalledWith({
			webClientId: "web-client-id"
		});
		expect(mockedPost).toHaveBeenCalledWith("/users/auth/google", {
			id_token: "google-token"
		});
		expect(result).toEqual({
			status: "logged_in",
			session: { id: "u1", username: "Arno", token: "jwt" }
		});
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith("id", "u1");
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
			"identifier",
			"Arno"
		);
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
			"token",
			JSON.stringify("jwt")
		);
	});

	it("renvoie les infos d'inscription pour un nouveau compte, sans rien enregistrer", async () => {
		mockedSignIn.mockResolvedValue({
			type: "success",
			data: { idToken: "google-token" }
		});
		mockedPost.mockResolvedValue({
			success: true,
			data: {
				status: "registration_required",
				registration_token: "reg",
				email: "arno@gmail.com",
				suggested_username: "Arnaud"
			}
		});

		const result = await service.signInWithGoogle();

		expect(result).toEqual({
			status: "registration_required",
			registrationToken: "reg",
			email: "arno@gmail.com",
			suggestedUsername: "Arnaud"
		});
		expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
	});

	it("finalise l'inscription puis enregistre la session", async () => {
		mockedPost.mockResolvedValue({
			success: true,
			data: {
				status: "logged_in",
				user_id: "u2",
				username: "Arno",
				token: "jwt2"
			}
		});

		const result = await service.completeGoogleRegistration({
			registrationToken: "reg",
			username: "  Arno ",
			birthdate: new Date("1995-05-20T00:00:00.000Z"),
			country: "FR"
		});

		expect(mockedPost).toHaveBeenCalledWith("/users/auth/google/register", {
			registration_token: "reg",
			username: "Arno",
			birthdate: "1995-05-20",
			country: "FR"
		});
		expect(result.status).toBe("logged_in");
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith("id", "u2");
	});

	it("renvoie le message du backend si l'inscription est refusée", async () => {
		mockedPost.mockResolvedValue({
			success: false,
			data: "Ce pseudo est déjà utilisé"
		});

		const result = await service.completeGoogleRegistration({
			registrationToken: "reg",
			username: "Arno",
			birthdate: new Date("1995-05-20T00:00:00.000Z"),
			country: "FR"
		});

		expect(result).toEqual({
			status: "error",
			message: "Ce pseudo est déjà utilisé"
		});
		expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
	});

	it("ne fait rien si l'utilisateur ferme la fenêtre Google", async () => {
		mockedSignIn.mockResolvedValue({ type: "cancelled", data: null });

		expect(await service.signInWithGoogle()).toEqual({
			status: "cancelled"
		});
		expect(mockedPost).not.toHaveBeenCalled();
	});

	it("affiche le message du backend et déconnecte le compte Google en cas de refus", async () => {
		mockedSignIn.mockResolvedValue({
			type: "success",
			data: { idToken: "t" }
		});
		mockedPost.mockResolvedValue({
			success: false,
			data: "L'adresse mail de ce compte Google n'est pas vérifiée"
		});

		const result = await service.signInWithGoogle();

		expect(result).toEqual({
			status: "error",
			message: "L'adresse mail de ce compte Google n'est pas vérifiée"
		});
		expect(GoogleSignin.signOut).toHaveBeenCalled();
	});

	it("gère l'absence des services Google Play", async () => {
		mockedSignIn.mockRejectedValue({
			code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE
		});

		const result = await service.signInWithGoogle();

		expect(result.status).toBe("error");
		expect(result.message).toContain("Google Play");
	});

	it("transmet le statut d'onboarding renvoyé par le backend", async () => {
		mockedSignIn.mockResolvedValue({
			type: "success",
			data: { idToken: "google-token" }
		});
		mockedPost.mockResolvedValue({
			success: true,
			data: {
				status: "logged_in",
				user_id: "u1",
				username: "Arno",
				token: "jwt",
				onboarding_completed: false
			}
		});

		const result = await service.signInWithGoogle();

		expect(result.onboardingCompleted).toBe(false);
	});
});
