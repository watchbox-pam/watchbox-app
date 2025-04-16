import { ApiHelper } from "@/src/utils/axios";

export const fetchMovieDetails = async (movieId: number) => {
	try {
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`/movies/${movieId}`
		);
		return data;
	} catch (error: any) {
		return {
			success: false,
			data: "Impossible de récupérer le film"
		};
	}
};
