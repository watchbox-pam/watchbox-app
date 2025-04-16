import { ApiHelper } from "@/src/utils/axios";
import { Encryption } from "@/src/utils/encryption";
import * as SecureStore from "expo-secure-store";

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
			await SecureStore.setItemAsync(
				"currentUser",
				JSON.stringify(result.data.token)
			);
			return {
				success: true,
				message: result.data
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
