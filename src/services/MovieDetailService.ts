import { ApiHelper } from "@/src/utils/axios";

/**
 * Fetch detailed information about a specific movie by its ID.
 * @param movieId The unique identifier of the movie.
 * @returns An object containing success status and movie data or an error message.
 */
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
