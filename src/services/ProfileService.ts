import { ApiHelper } from "@/src/utils/axios";

export async function getUserProfile(userId) {
	if (!userId || typeof userId !== "string") {
		return {
			success: false,
			message: "ID utilisateur invalide"
		};
	}

	try {
		const result = await ApiHelper.get(`/users/${userId}`);
		return {
			success: true,
			data: result.data
		};
	} catch (error) {
		return {
			success: false,
			message: error.message || "Erreur lors de la récupération du profil"
		};
	}
}
