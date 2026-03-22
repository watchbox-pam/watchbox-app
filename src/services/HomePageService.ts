import { ApiHelper } from "@/src/utils/axios";

type TimePeriods = "day" | "week";

/**
 * Service for fetching popular movies from the API
 */
export const fetchPopular = async (timePeriod: TimePeriods) => {
	try {
		// Fetch popular movies based on a time period (day or week), page 1 by default
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`movies/popular/${timePeriod}?page=1`
		);
		return data;
	} catch (error: any) {
		// Return error object in case of failure
		return {
			success: false,
			data: "Impossible de récupérer les films"
		};
	}
};

/**
 * Service for fetching movies by genre from the API
 */
export const fetchGenre = async (genre: string) => {
	try {
		// Fetch movies based on a specific genre
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`movies/genres/${genre}`
		);
		return data;
	} catch (error: any) {
		// Return error object in case of failure
		return {
			success: false,
			data: "Impossible de récupérer les films"
		};
	}
};
