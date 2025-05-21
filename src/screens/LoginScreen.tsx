import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "@/src/styles/LoginStyle";
import BackButton from "@/src/components/BackButton";
import Logo from "@/src/components/Logo";
import StyledText from "@/src/components/StyledText";
import { useState } from "react";
import { loginUser } from "@/src/services/LoginService";
import { router } from "expo-router";
import useSessionStore from "@/src/zustand/sessionStore";

export default function LoginScreen() {
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// @ts-ignore
	const signIn = useSessionStore((state) => state.signIn);

	// Handle form submission and login logic
	const handleSubmit = async () => {
		const result = await loginUser({ identifier, password });
		if (result.success) {
			// Save session and redirect to home
			signIn(
				result.message.id,
				result.message.username,
				result.message.token
			);
			router.replace("/");
			return;
		} else {
			alert(result.message);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<BackButton />
				<Logo />
			</View>
			<View style={styles.formContainer}>
				<StyledText style={styles.title}>Connexion</StyledText>
				<TextInput
					style={styles.input}
					placeholder="Adresse mail ou Pseudo"
					placeholderTextColor="#fff"
					onChangeText={setIdentifier}
				/>
				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					placeholderTextColor="#fff"
					secureTextEntry
					onChangeText={setPassword}
				/>
				<View style={styles.btnForm}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit}>
						<Text style={styles.buttonText}>Connexion</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
