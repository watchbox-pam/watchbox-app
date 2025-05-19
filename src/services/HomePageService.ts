import { ApiHelper } from "@/src/utils/axios";

type TimePeriods = "day" | "week";

export const fetchPopular = async (timePeriod: TimePeriods) => {
	try {
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`movies/popular/${timePeriod}?page=1`
		);
		return data;
	} catch (error: any) {
		return {
			success: false,
			data: "Impossible de récupérer les films"
		};
	}
};

export const fetchGenre = async (genre: string) => {
	try {
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`movies/genres/${genre}`
		);
		return data;
	} catch (error: any) {
		return {
			success: false,
			data: "Impossible de récupérer les films"
		};
	}
};
