import { ApiHelper } from "@/src/utils/axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

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

		if (result.success) {
			return {
				success: true,
				data: result.data
			};
		} else {
			return {
				success: false,
				message:
					result.data || "Erreur lors de la récupération du profil"
			};
		}
	} catch (error) {
		// Return error message if the request fails
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Erreur lors de la récupération du profil"
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
		// Get user ID
		const userId =
			Platform.OS === "ios" || Platform.OS === "android"
				? await SecureStore.getItemAsync("id")
				: localStorage.getItem("id");

		if (!userId) {
			return { success: false, message: "Session invalide" };
		}

		// Call API to delete account using ApiHelper
		const result = await ApiHelper.delete(`/users/${userId}`);

		if (result.success) {
			return { success: true, message: "Compte supprimé avec succès" };
		} else {
			return {
				success: false,
				message: result.data || "Erreur lors de la suppression"
			};
		}
	} catch (error) {
		console.error("Erreur deleteAccount:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "Erreur inconnue"
		};
	}
}

export default async function getPasswordResetToken(userId: string) {
	try {
		const result = await ApiHelper.get(
			`/users/${userId}/password_reset_token`
		);
		if (result.success) {
			return { success: true, data: result.data };
		} else {
			return {
				success: false,
				message: result.data || "Erreur lors de la récupération"
			};
		}
	} catch (error) {
		console.error("Error fetching password reset token", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "Erreur inconnue"
		};
	}
}
