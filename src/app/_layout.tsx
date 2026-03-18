import { Slot } from "expo-router";
import { AppState, Platform, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import styles from "@/src/styles/LayoutStyle";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";

const STATUS_BAR_BG = "#0A1E38"; // barre du haut

async function applyImmersiveAndroid() {
	if (Platform.OS !== "android") return;

	await NavigationBar.setBehaviorAsync("overlay-swipe");

	await NavigationBar.setVisibilityAsync("hidden");

	await NavigationBar.setButtonStyleAsync("light");
}

export default function Root() {
	useEffect(() => {
		applyImmersiveAndroid();
	}, []);

	useFocusEffect(
		useCallback(() => {
			applyImmersiveAndroid();
		}, [])
	);

	useEffect(() => {
		if (Platform.OS !== "android") return;

		const sub = AppState.addEventListener("change", (state) => {
			if (state === "active") {
				applyImmersiveAndroid();
			}
		});

		return () => sub.remove();
	}, []);

	return (
		<SafeAreaProvider>
			<PaperProvider>
				<StatusBar
					translucent={false}
					backgroundColor={STATUS_BAR_BG}
					barStyle="light-content"
				/>
				<SafeAreaView style={[styles.layout]} edges={["top"]}>
					<Slot />
				</SafeAreaView>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
