import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import styles from "@/src/styles/UserVerificationStyle";
import { router } from "expo-router";
import { useState } from "react";
import { sendPasswordResetEmail } from "@/src/services/PasswordResetService";

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState<string>("");

	const sendPasswordReset = async () => {
		const result = await sendPasswordResetEmail(email);
		console.log(result);
		if (result) {
			alert(
				"Un lien de réinitialisation a été envoyé à votre adresse mail"
			);
			router.replace("/login");
			return;
		} else {
			alert(result);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Adresse mail"
				placeholderTextColor="#fff"
				onChangeText={setEmail}
			/>
			<View style={styles.btnSignUp}>
				<TouchableOpacity
					style={styles.button}
					onPress={sendPasswordReset}>
					<Text style={styles.buttonText}>Recevoir un lien</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
