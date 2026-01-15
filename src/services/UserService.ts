import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "";

class UserService {
	private async getToken(): Promise<string | null> {
		if (Platform.OS === "ios" || Platform.OS === "android") {
			return await SecureStore.getItemAsync("token");
		}
		return localStorage.getItem("token");
	}

	private async getUserId(): Promise<string | null> {
		if (Platform.OS === "ios" || Platform.OS === "android") {
			return await SecureStore.getItemAsync("id");
		}
		return localStorage.getItem("id");
	}

	async deleteAccount(): Promise<{ success: boolean; message: string }> {
		try {
			const userId = await this.getUserId();
			const token = await this.getToken();

			if (!userId || !token) {
				return { success: false, message: "Session invalide" };
			}

			const response = await fetch(`${API_URL}/users/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token.replace(/^"(.*)"$/, "$1")}`
				}
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.log("Error data:", errorData);
				return {
					success: false,
					message: errorData.detail || "Erreur lors de la suppression"
				};
			}

			if (Platform.OS === "ios" || Platform.OS === "android") {
				await SecureStore.deleteItemAsync("id");
				await SecureStore.deleteItemAsync("identifier");
				await SecureStore.deleteItemAsync("token");
			} else {
				localStorage.removeItem("id");
				localStorage.removeItem("identifier");
				localStorage.removeItem("token");
			}

			return { success: true, message: "Compte supprimé avec succès" };
		} catch (error) {
			console.error("Erreur deleteAccount:", error);
			return {
				success: false,
				message:
					error instanceof Error ? error.message : "Erreur inconnue"
			};
		}
	}
}

export const userService = new UserService();
