import { Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "@/src/styles/BasePageStyle";
import StyledText from "@/src/components/StyledText";
import { router } from "expo-router";
import { useEffect } from "react";
import { checkLogin } from "@/src/services/LandingService";
import useSessionStore from "@/src/zustand/sessionStore";

export default function BaseScreen() {
	// @ts-ignore
	const signIn = useSessionStore((state) => state.signIn);

	const checkUserLogin = async () => {
		const result = await checkLogin();
		if (result !== null) {
			signIn(result.id, result.identifier);
			router.replace("/");
			return;
		}
	};

	useEffect(() => {
		checkUserLogin();
	}, []);

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
