import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function checkLogin() {
	try {
		let currentUser: string | null;
		/*if (Platform.OS === "ios" || Platform.OS === "android") {
			currentUser = await SecureStore.getItemAsync("currentUser");
		} else {
			currentUser = localStorage.getItem("currentUser");
		}
		if (currentUser !== null) {
			return JSON.parse(currentUser);
		}*/
		return null;
	} catch (error) {
		return null;
	}
}
