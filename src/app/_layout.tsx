import { Slot } from "expo-router";
import {
	StatusBar,
	View,
	Image,
	ActivityIndicator,
	Platform
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "@/src/styles/LayoutStyle";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import useSessionStore from "@/src/zustand/sessionStore";

export default function Root() {
	const [isAppReady, setIsAppReady] = useState(false);
	const { signIn, signOut } = useSessionStore();

	useEffect(() => {
		async function prepare() {
			try {
				let token: string | null = null;
				let id: string | null = null;
				let identifier: string | null = null;

				if (Platform.OS === "ios" || Platform.OS === "android") {
					token = await SecureStore.getItemAsync("token");
					id = await SecureStore.getItemAsync("id");
					identifier = await SecureStore.getItemAsync("identifier");
				} else {
					token = localStorage.getItem("token");
					id = localStorage.getItem("id");
					identifier = localStorage.getItem("identifier");
				}

				if (token && id && identifier) {
					try {
						const response = await fetch(
							"https://http://10.0.2.2:8000/validate-token",
							{
								method: "POST",
								headers: {
									Authorization: `Bearer ${token}`
								}
							}
						);
						if (response.ok) {
							signIn({ token, id, identifier });
							console.log("✅ Utilisateur connecté");
						} else {
							console.log("❌ Token invalide, déconnexion");
							await signOut();
						}
					} catch (e) {
						console.warn(e);
						signIn(id, identifier, token);
					}
				} else {
					console.log("❌ Pas de token, utilisateur non connecté");
				}
				await new Promise((resolve) => setTimeout(resolve, 10000));
			} catch (e) {
				console.warn(e);
			} finally {
				setIsAppReady(true);
			}
		}

		prepare();
	}, []);

	if (!isAppReady) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#102A4C"
				}}>
				<StatusBar
					translucent={false}
					backgroundColor="#102A4C"
					barStyle="light-content"
				/>
				<Image
					source={require("@/src/assets/images/splash-icon.png")}
					style={{ width: 150, height: 150, marginBottom: 30 }}
					resizeMode="contain"
				/>
				<ActivityIndicator
					size="large"
					color="#FFFFFF"
					style={{ marginTop: 20 }}
				/>
			</View>
		);
	}
	return (
		<SafeAreaProvider>
			<StatusBar
				translucent={false}
				backgroundColor="#102A4C"
				barStyle="light-content"
			/>
			<SafeAreaView style={styles.layout}>
				<Slot />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
