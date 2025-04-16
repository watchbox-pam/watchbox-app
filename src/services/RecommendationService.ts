import { ApiHelper } from "@/src/utils/axios";

export const fetchRecommendations = async (emotion: string) => {
	try {
		const response = await ApiHelper.get(
			`/recommendations/emotion/${emotion}?limit=10`
		);
		return response;
	} catch (err) {
		return {
			success: false,
			data: "Impossible de charger les recommandations."
		};
	}
};
