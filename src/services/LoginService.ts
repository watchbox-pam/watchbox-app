import { ApiHelper } from "@/src/utils/axios";
import { Encryption } from "@/src/utils/encryption";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function loginUser({
	identifier,
	password
}: {
	identifier: string;
	password: string;
}) {
	try {
		if (!identifier) {
			return {
				success: false,
				message: "L'identifiant est requis",
				element: "identifier"
			};
		}
		if (!password) {
			return {
				success: false,
				message: "Le mot de passe est requis",
				element: "password"
			};
		}

		const hashedPassword = await Encryption.encryptPassword(password);
		const result = await ApiHelper.post("/users/login", {
			identifier: identifier,
			password: hashedPassword
		});
		if (result.success) {
			// Store all necessary credentials persistently
			if (Platform.OS === "ios" || Platform.OS === "android") {
				await SecureStore.setItemAsync("id", result.data.user_id);
				await SecureStore.setItemAsync("identifier", identifier);
				await SecureStore.setItemAsync(
					"token",
					JSON.stringify(result.data.token)
				);
			} else {
				localStorage.setItem("id", result.data.user_id);
				localStorage.setItem("identifier", identifier);
				localStorage.setItem(
					"token",
					JSON.stringify(result.data.token)
				);
			}
			return {
				success: true,
				message: {
					id: result.data.user_id,
					token: result.data.token
				}
			};
		} else {
			return {
				success: false,
				message: result.data
			};
		}
	} catch (error) {
		return {
			success: false,
			// @ts-ignore
			message: error.message
		};
	}
}
