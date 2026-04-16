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
import { sendUserVerificationCode } from "@/src/services/UserVerificationService";
import BackButton from "@/src/components/BackButton";

export default function UserVerificationScreen() {
	const [code, setCode] = useState<string>("");

	const sendCode = async () => {
		if (code.length !== 6) return;
		const result = await sendUserVerificationCode(code);
		if (result) {
			router.replace("/");
		} else {
			alert("Code invalide, veuillez réessayer.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<BackButton />

			<Text style={styles.title}>Vérification</Text>
			<Text style={styles.subtitle}>
				Entrez le code à 6 chiffres envoyé à votre adresse mail.
			</Text>

			<Text style={styles.inputLabel}>Code de vérification</Text>
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="123456"
					placeholderTextColor="rgba(255,255,255,0.25)"
					keyboardType="number-pad"
					maxLength={6}
					onChangeText={setCode}
					value={code}
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={sendCode}>
				<Text style={styles.buttonText}>Vérifier mon compte →</Text>
			</TouchableOpacity>

			<Text style={styles.helperText}>
				Vous n'avez rien reçu ?{" "}
				<Text style={styles.helperLink}>Renvoyer</Text>
			</Text>
		</SafeAreaView>
	);
}
