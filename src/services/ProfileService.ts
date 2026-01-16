import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { ApiHelper } from "@/src/utils/axios";

const API_URL = process.env.EXPO_PUBLIC_BASE_API_URL?.replace(/\/$/, "") || "";

/**
 * Fetch the profile data of a user by their ID
 * @param userId The unique ID of the user
 * @returns User profile data or an error message
 */
export async function getUserProfile(userId: string) {
	// Validate user ID before making the request
	if (!userId || typeof userId !== "string") {
		return {
			success: false,
			message: "ID utilisateur invalide"
		};
	}

	try {
		// Send GET request to retrieve the user's profile
		const result = await ApiHelper.get(`/users/${userId}`);
		return {
			success: true,
			data: result.data
		};
	} catch (error) {
		// Return error message if the request fails
		return {
			success: false,
			message: error.message || "Erreur lors de la récupération du profil"
		};
	}
}

/**
 * Delete the user account
 * @returns Success status and message
 */
export async function deleteAccount(): Promise<{
	success: boolean;
	message: string;
}> {
	try {
		// Get user credentials
		const userId =
			Platform.OS === "ios" || Platform.OS === "android"
				? await SecureStore.getItemAsync("id")
				: localStorage.getItem("id");

		const token =
			Platform.OS === "ios" || Platform.OS === "android"
				? await SecureStore.getItemAsync("token")
				: localStorage.getItem("token");

		if (!userId || !token) {
			return { success: false, message: "Session invalide" };
		}

		// Call API to delete account
		const response = await fetch(`${API_URL}/users/${userId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token.replace(/^"(.*)"$/, "$1")}`
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			return {
				success: false,
				message: errorData.detail || "Erreur lors de la suppression"
			};
		}

		return { success: true, message: "Compte supprimé avec succès" };
	} catch (error) {
		console.error("Erreur deleteAccount:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "Erreur inconnue"
		};
	}
}
