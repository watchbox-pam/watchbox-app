import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Check if the user is logged in by retrieving stored credentials.
 * Supports both mobile (SecureStore) and web (localStorage) platforms.
 * @returns An object with user id, identifier, and token if logged in; otherwise null.
 */
export async function checkLogin() {
	try {
		let id: string | null;
		let identifier: string | null;
		let token: string | null;

		// Retrieve stored data depending on platform
		if (Platform.OS === "ios" || Platform.OS === "android") {
			id = await SecureStore.getItemAsync("id");
			identifier = await SecureStore.getItemAsync("identifier");
			token = await SecureStore.getItemAsync("token");
		} else {
			id = localStorage.getItem("id");
			identifier = localStorage.getItem("identifier");
			token = localStorage.getItem("token");
		}

		// Return user data only if token exists
		if (token !== null) {
			return {
				id,
				identifier,
				token
			};
		}

		// No token found, user is not logged in
		return null;
	} catch (error) {
		// In case of any error, return null (not logged in)
		return null;
	}
}
