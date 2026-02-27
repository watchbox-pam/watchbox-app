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

const getStoredAuth = async () => {
	if (Platform.OS === "ios" || Platform.OS === "android") {
		return {
			token: await SecureStore.getItemAsync("token"),
			id: await SecureStore.getItemAsync("id"),
			identifier: await SecureStore.getItemAsync("identifier")
		};
	}
	return {
		token: localStorage.getItem("token"),
		id: localStorage.getItem("id"),
		identifier: localStorage.getItem("identifier")
	};
};

const validateSession = async (
	token: string,
	id: string,
	identifier: string,
	signIn: Function,
	signOut: Function
) => {
	try {
		const res = await fetch("http://10.0.2.2:8000/validate-token", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` }
		});
		if (res.ok) {
			signIn(id, identifier, token);
		} else {
			await signOut();
		}
	} catch {
		signIn(id, identifier, token);
	}
};

export default function Root() {
	const [isAppReady, setIsAppReady] = useState(false);
	const { signIn, signOut } = useSessionStore() as any;
	const setSections = useMoviesStore((state) => state.setSections);

	useEffect(() => {
		(async () => {
			try {
				const { token, id, identifier } = await getStoredAuth();

				await Promise.all([
					token && id && identifier
						? validateSession(
								token,
								id,
								identifier,
								signIn,
								signOut
							)
						: Promise.resolve(),
					fetchAllMovieSections().then(({ success, data }) =>
						setSections(success ? data : [])
					)
				]);

				await new Promise((r) => setTimeout(r, 500));
			} catch (e) {
				console.warn(e);
			} finally {
				setIsAppReady(true);
			}
		})();
	}, []);

	if (!isAppReady)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#102A4C"
				}}>
				<StatusBar
					translucent={true}
					backgroundColor="#102A4C"
					barStyle="light-content"
				/>
				<WatchboxLogoAnimation />
			</View>
		);

	return (
		<SafeAreaProvider>
			<StatusBar
				translucent={true}
				backgroundColor="#102A4C"
				barStyle="light-content"
			/>
			<SafeAreaView style={styles.layout}>
				<Slot />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
