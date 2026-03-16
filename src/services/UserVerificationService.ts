import { ApiHelper } from "@/src/utils/axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function sendUserVerificationCode(code: string): Promise<boolean> {
	let token: string | null;

	if (Platform.OS === "ios" || Platform.OS === "android") {
		token = await SecureStore.getItemAsync("verification_code_token");
	} else {
		token = localStorage.getItem("verification_code_token");
	}

	try {
		const result = await ApiHelper.post("/users/verification", {
			code: code,
			token: token
		});
		if (result.data) {
			if (Platform.OS === "ios" || Platform.OS === "android") {
				await SecureStore.deleteItemAsync("verification_code_token");
			} else {
				localStorage.removeItem("verification_code_token");
			}
		}

		return result.data;
	} catch (error: any) {
		console.error(error);
		return false;
	}
}
