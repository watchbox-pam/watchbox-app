import { ApiHelper } from "@/src/utils/axios";

/**
 * Fetch the profile data of a user by their ID
 * @param userId The unique ID of the user
 * @returns User profile data or an error message
 */
export async function getUserProfile(userId) {
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
