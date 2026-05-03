import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import styles from "@/src/styles/ForgotPasswordStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	checkPasswordResetTokenValidity,
	resetUserPassword
} from "@/src/services/PasswordResetService";
import UserPassword from "@/src/models/UserPassword";
import Toast from "react-native-toast-message";

export default function ResetPasswordScreen() {
	const { token }: { token: string } = useLocalSearchParams();

	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [userId, setUserId] = useState<string>("");

	const verifyUserToken = async () => {
		if (token === "") {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: "Ce lien n'est pas valide"
			});
			router.replace("/");
			return;
		}
		const result = await checkPasswordResetTokenValidity(token);
		if (!result || result === "") {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: "Ce lien n'est pas valide"
			});
			router.replace("/");
		} else {
			setUserId(result);
		}
	};

	const resetPassword = async () => {
		const passwordToReset: UserPassword = {
			id: userId,
			password,
			confirmPassword,
			token
		};
		const result = await resetUserPassword(passwordToReset);
		if (result.success) {
			Toast.show({
				type: "success",
				text1: "Succès",
				text2: "Votre mot de passe a bien été mis à jour"
			});
			router.replace("/");
		} else {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: result.message
			});
		}
	};

	useEffect(() => {
		verifyUserToken();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Nouveau mot de passe</Text>
			<Text style={styles.subtitle}>
				Choisissez un nouveau mot de passe sécurisé pour votre compte.
			</Text>

			<Text style={styles.inputLabel}>Mot de passe</Text>
			<View style={[styles.inputWrapper, { marginBottom: 16 }]}>
				<TextInput
					style={styles.input}
					placeholder="Nouveau mot de passe"
					placeholderTextColor="rgba(255,255,255,0.25)"
					secureTextEntry
					onChangeText={setPassword}
					value={password}
				/>
			</View>

			<Text style={styles.inputLabel}>Confirmation</Text>
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Confirmez le mot de passe"
					placeholderTextColor="rgba(255,255,255,0.25)"
					secureTextEntry
					onChangeText={setConfirmPassword}
					value={confirmPassword}
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={resetPassword}>
				<Text style={styles.buttonText}>Réinitialiser →</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
