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

export default function UserVerificationScreen() {
	const [code, setCode] = useState<string>("");

	const sendCode = async () => {
		const result = await sendUserVerificationCode(code);
		if (result) {
			//alert("Un code de vérification a été envoyé à votre adresse mail");
			//signIn(result.message.id, username, result.message.token);
			router.replace("/login");
			return;
		} else {
			alert("Non");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Pseudo"
				placeholderTextColor="#fff"
				onChangeText={setCode}
			/>
			<View style={styles.btnSignUp}>
				<TouchableOpacity style={styles.button} onPress={sendCode}>
					<Text style={styles.buttonText}>Créez votre compte</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
