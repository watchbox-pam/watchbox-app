import {
	ActivityIndicator,
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import styles from "@/src/styles/BasePageStyle";
import StyledText from "@/src/components/StyledText";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { checkLogin } from "@/src/services/LandingService";
import useSessionStore from "@/src/zustand/sessionStore";
import useGoogleRegistrationStore from "@/src/zustand/googleRegistrationStore";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import {
	isGoogleSignInAvailable,
	signInWithGoogle
} from "@/src/services/GoogleAuthService";

export default function BaseScreen() {
	// Retrieve the signIn function from the session store
	// @ts-ignore
	const signIn = useSessionStore((state) => state.signIn);

	// Check if the user is already logged in
	const checkUserLogin = async () => {
		let verificationCodeToken: string | null;
		if (Platform.OS === "ios" || Platform.OS === "android") {
			verificationCodeToken = await SecureStore.getItemAsync(
				"verification_code_token"
			);
		} else {
			verificationCodeToken = await SecureStore.getItemAsync(
				"verification_code_token"
			);
		}

		if (verificationCodeToken !== null) {
			router.replace("/userVerification");
		}

		const result = await checkLogin();
		if (result !== null) {
			signIn(
				result.id ?? "",
				result.identifier ?? "",
				result.token ?? ""
			);
			router.replace("/"); // Redirect to home if logged in
			return;
		}
	};

	const [googleLoading, setGoogleLoading] = useState<boolean>(false);
	const setPendingGoogleRegistration = useGoogleRegistrationStore(
		(state) => state.setPending
	);

	// Connexion ou inscription avec un compte Google
	const handleGoogleSignIn = async () => {
		if (googleLoading) return;
		setGoogleLoading(true);
		try {
			const result = await signInWithGoogle();

			switch (result.status) {
				case "logged_in":
					// Session déjà enregistrée par le service : même chemin que la connexion classique
					signIn(
						result.session.id,
						result.session.username,
						result.session.token
					);
					router.replace("/");
					return;

				case "registration_required":
					// Nouveau compte : on demande le pseudo et la date de naissance
					setPendingGoogleRegistration({
						registrationToken: result.registrationToken,
						email: result.email,
						suggestedUsername: result.suggestedUsername
					});
					router.push("/googleRegistration");
					return;

				case "error":
					Toast.show({
						type: "error",
						text1: "Connexion avec Google",
						text2: result.message
					});
					return;

				case "cancelled":
					// L'utilisateur a fermé la fenêtre Google : rien à afficher
					return;
			}
		} finally {
			setGoogleLoading(false);
		}
	};

	useEffect(() => {
		checkUserLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.Logo}>
				<Image
					style={{ width: 75, height: 75 }}
					resizeMode="contain"
					source={require("@/src/assets/images/watchbox-logo.png")}
				/>
				<StyledText style={{ fontSize: 40 }}>WatchBox</StyledText>
			</View>
			<View style={styles.btns}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => router.push("/login")}>
					<Text style={styles.buttonText}>Déjà un compte ?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => router.push("/signup")}>
					<Text style={styles.buttonText}>Créez votre compte</Text>
				</TouchableOpacity>

				{isGoogleSignInAvailable && (
					<>
						<View style={styles.separator}>
							<View style={styles.separatorLine} />
							<Text style={styles.separatorText}>ou</Text>
							<View style={styles.separatorLine} />
						</View>
						<TouchableOpacity
							style={styles.googleButton}
							onPress={handleGoogleSignIn}
							disabled={googleLoading}
							accessibilityRole="button"
							accessibilityLabel="Continuer avec Google">
							{googleLoading ? (
								<ActivityIndicator color="#757575" />
							) : (
								<>
									<Image
										style={styles.googleLogo}
										source={require("@/src/assets/images/google-g.png")}
										accessibilityIgnoresInvertColors
									/>
									<Text style={styles.googleButtonText}>
										Continuer avec Google
									</Text>
								</>
							)}
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	);
}
