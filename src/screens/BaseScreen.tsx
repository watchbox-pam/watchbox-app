import { Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "@/src/styles/BasePageStyle";
import StyledText from "@/src/components/StyledText";
import { router } from "expo-router";

export default function BaseScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				style={{ width: 75, height: 75 }}
				resizeMode="contain"
				source={require("@/src/assets/images/watchbox-logo.png")}
			/>
			<StyledText style={{ fontSize: 40 }}>WatchBox</StyledText>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/login")}>
				<Text style={styles.buttonText}>Déjà un compte ?</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/signup")}>
				<Text style={styles.buttonText}>Créez votre compte</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
