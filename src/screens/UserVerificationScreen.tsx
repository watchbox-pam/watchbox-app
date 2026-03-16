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
		if (code === "" || code.length !== 6) return;
		const result = await sendUserVerificationCode(code);
		if (result) {
			console.log(result);
			router.replace("/");
			return;
		} else {
			alert("Non");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Code"
				placeholderTextColor="#fff"
				onChangeText={setCode}
			/>
			<View style={styles.btnSignUp}>
				<TouchableOpacity style={styles.button} onPress={sendCode}>
					<Text style={styles.buttonText}>Vérifiez votre compte</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
