import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import styles from "@/src/styles/UserVerificationStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { checkPasswordResetTokenValidity } from "@/src/services/PasswordResetService";
import UserSignup from "@/src/models/UserSignup";
import UserPassword from "@/src/models/UserPassword";

export default function ResetPasswordScreen() {
	const { token }: { token: string } = useLocalSearchParams();

	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const verifyUserToken = async () => {
		if (token === "") {
			alert("Ce lien n'est pas valide");
			router.replace("/");
		}
		const result = await checkPasswordResetTokenValidity(token);
		if (!result) {
			alert("Ce lien n'est pas valide");
			router.replace("/");
		}
	};

	const resetPassword = async () => {
		const passwordtoReset: UserPassword = {
			token: token,
			password: password,
			confirmPassword: confirmPassword
		};
		const result = await resetUserPassword(token);
		if (!result) {
			alert("Ce lien n'est pas valide");
			router.replace("/");
		}
	};

	useEffect(() => {
		verifyUserToken();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#fff"
				secureTextEntry
				onChangeText={setPassword}
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirmation mot de passe"
				placeholderTextColor="#fff"
				secureTextEntry
				onChangeText={setConfirmPassword}
			/>
			<View style={styles.btnSignUp}>
				<TouchableOpacity style={styles.button} onPress={sendCode}>
					<Text style={styles.buttonText}>
						Réinitialiser votre compte
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
