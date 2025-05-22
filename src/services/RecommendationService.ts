import { ApiHelper } from "@/src/utils/axios";

/**
 * Fetch personalized movie recommendations based on user's emotion
 * @param emotion A string representing the user's current emotion (e.g., "happy", "sad")
 * @returns Recommendations data or error message
 */
export const fetchRecommendations = async (emotion: string) => {
	try {
		// Send GET request to fetch recommendations based on the emotion
		const response = await ApiHelper.get(
			`/recommendations/recommended/${emotion}`
		);
		return response;
	} catch (error) {
		// Return error response if the request fails
		return {
			success: false,
			data: "Impossible de charger les recommandations."
		};
	}
};
