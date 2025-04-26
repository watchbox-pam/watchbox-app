import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "@/src/styles/LoginStyle";
import BackButton from "@/src/components/BackButton";
import Logo from "@/src/components/Logo";
import StyledText from "@/src/components/StyledText";
import { useState } from "react";
import { handleLoginSubmit } from "@/src/screens/utils/utils";

export default function LoginScreen() {
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");

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
						onPress={async () =>
							await handleLoginSubmit(identifier, password)
						}>
						<Text style={styles.buttonText}>Connexion</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
