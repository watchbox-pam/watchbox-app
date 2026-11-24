import { ApiHelper } from "@/src/utils/axios";

/**
 * Fetch the profile data of a user by their ID
 * @param userIdToFollow The unique ID of the user
 * @returns User profile data or an error message
 */
export async function followUser(userIdToFollow: string) {
	// Validate user ID before making the request
	if (!userIdToFollow || typeof userIdToFollow !== "string") {
		return {
			success: false,
			message: "ID utilisateur invalide"
		};
	}

	try {
		// Send GET request to retrieve the user's profile
		const result = await ApiHelper.post(`/users/follow`, {
			userId: userIdToFollow
		});

		if (result.success) {
			return {
				success: true,
				data: result.data
			};
		} else {
			return {
				success: false,
				message: result.data || "Erreur lors du follow"
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
