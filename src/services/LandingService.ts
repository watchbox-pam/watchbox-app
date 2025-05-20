import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function checkLogin() {
	try {
		let id: string | null;
		let identifier: string | null;
		let token: string | null;
		if (Platform.OS === "ios" || Platform.OS === "android") {
			id = await SecureStore.getItemAsync("id");
			identifier = await SecureStore.getItemAsync("identifier");
			token = await SecureStore.getItemAsync("token");
		} else {
			id = localStorage.getItem("id");
			identifier = localStorage.getItem("identifier");
			token = localStorage.getItem("token");
		}
		if (token !== null) {
			return {
				id,
				identifier,
				token
			};
		}
		return null;
	} catch (error) {
		return null;
	}
}
