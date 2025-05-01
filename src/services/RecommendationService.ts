import { ApiHelper } from "@/src/utils/axios";

export const fetchRecommendations = async (emotion: string) => {
	try {
		const response = await ApiHelper.get(
			`/recommendations/recommended/${emotion}`
		);
		return response;
	} catch (err) {
		return {
			success: false,
			data: "Impossible de charger les recommandations."
		};
	}
};
