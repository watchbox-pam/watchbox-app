import { ApiHelper } from "@/src/utils/axios";

export const fetchRecommendations = async (
	emotion: string,
	options?: { limit?: number; excludeIds?: number[] }
) => {
	try {
		const params = new URLSearchParams();

		if (options?.limit !== undefined) {
			params.set("limit", String(options.limit));
		}
		if (options?.excludeIds?.length) {
			params.set("exclude_ids", options.excludeIds.join(","));
		}

		const suffix = params.toString() ? `?${params.toString()}` : "";
		const response = await ApiHelper.get(
			`/recommendations/recommended/${emotion}${suffix}`
		);
		return response;
	} catch (error) {
		return {
			success: false,
			data: "Impossible de charger les recommandations."
		};
	}
};
