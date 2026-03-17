import { ApiHelper } from "@/src/utils/axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function sendPasswordResetEmail(email: string): Promise<boolean> {
	try {
		const result = await ApiHelper.post(
			`/users/forgot-password?email=${email}`
		);
		return result.data;
	} catch (error: any) {
		console.error(error);
		return false;
	}
}
