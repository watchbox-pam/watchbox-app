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
import {
	checkPasswordResetTokenValidity,
	resetUserPassword
} from "@/src/services/PasswordResetService";
import UserPassword from "@/src/models/UserPassword";

export default function ResetPasswordScreen() {
	const { token }: { token: string } = useLocalSearchParams();

	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [userId, setUserId] = useState<string>("");

	const verifyUserToken = async () => {
		if (token === "") {
			alert("Ce lien n'est pas valide");
			router.replace("/");
		}
		const result = await checkPasswordResetTokenValidity(token);
		if (!result || result === "") {
			alert("Ce lien n'est pas valide");
			router.replace("/");
		} else {
			setUserId(result);
		}
	};

	const resetPassword = async () => {
		const passwordtoReset: UserPassword = {
			id: userId,
			password: password,
			confirmPassword: confirmPassword,
			token: token
		};
		const result = await resetUserPassword(passwordtoReset);
		if (result.success) {
			alert("Votre mot de passe a bien été mis à jour");
			router.replace("/");
		} else {
			alert(result.message);
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
				<TouchableOpacity style={styles.button} onPress={resetPassword}>
					<Text style={styles.buttonText}>
						Réinitialiser votre mot de passe
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
