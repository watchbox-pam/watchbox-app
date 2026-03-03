import { Slot } from "expo-router";
import { StatusBar, View, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "@/src/styles/LayoutStyle";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import useSessionStore from "@/src/zustand/sessionStore";
import useMoviesStore from "@/src/zustand/moviesStore";
import { fetchAllMovieSections } from "../services/HomePageService";
import WatchboxLogoAnimation from "@/src/components/WatchboxLogoAnimation";

export default function Root() {
	const [isAppReady, setIsAppReady] = useState(false);
	const { signIn, signOut } = useSessionStore() as any;
	const setSections = useMoviesStore((state) => state.setSections);

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

				await Promise.all([
					(async () => {
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
									signIn(id, identifier, token);
								} else {
									await signOut();
								}
							} catch {
								signIn(id, identifier, token);
							}
						}
					})(),

					(async () => {
						const result = await fetchAllMovieSections();
						if (result.success) {
							setSections(result.data);
						} else {
							setSections([]);
						}
					})()
				]);
				await new Promise((resolve) => setTimeout(resolve, 500));
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
				<WatchboxLogoAnimation />
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
