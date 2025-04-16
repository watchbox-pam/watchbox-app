import * as SecureStore from "expo-secure-store";

export async function checkLogin() {
	try {
		const currentUser = await SecureStore.getItemAsync("currentUser");
		if (currentUser !== null) {
			return JSON.parse(currentUser);
		}
		return null;
	} catch (error) {
		return null;
	}
}
