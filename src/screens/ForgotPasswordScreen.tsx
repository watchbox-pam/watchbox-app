import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import styles from "@/src/styles/ForgotPasswordStyle";
import { router } from "expo-router";
import { useState } from "react";
import { sendPasswordResetEmail } from "@/src/services/PasswordResetService";
import BackButton from "@/src/components/BackButton";

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState<string>("");

	const sendPasswordReset = async () => {
		const result = await sendPasswordResetEmail(email);
		if (result) {
			alert(
				"Un lien de réinitialisation a été envoyé à votre adresse mail"
			);
			router.replace("/login");
		} else {
			alert("Une erreur est survenue");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<BackButton />

			<Text style={styles.title}>Mot de passe oublié</Text>
			<Text style={styles.subtitle}>
				Entrez votre adresse mail et nous vous enverrons un lien de
				réinitialisation.
			</Text>

			<Text style={styles.inputLabel}>Adresse mail</Text>
			<View style={styles.inputWrapper}>
				<Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
					✉
				</Text>
				<TextInput
					style={styles.input}
					placeholder="exemple@mail.com"
					placeholderTextColor="rgba(255,255,255,0.25)"
					keyboardType="email-address"
					autoCapitalize="none"
					onChangeText={setEmail}
					value={email}
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={sendPasswordReset}>
				<Text style={styles.buttonText}>Recevoir un lien →</Text>
			</TouchableOpacity>

			<Text style={styles.helperText}>
				Retour à la{" "}
				<Text
					style={styles.helperLink}
					onPress={() => router.replace("/login")}>
					connexion
				</Text>
			</Text>
		</SafeAreaView>
	);
}
