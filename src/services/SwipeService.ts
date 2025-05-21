import { ApiHelper } from "@/src/utils/axios";

/**
 * Service to fetch details for a single movie
 * @param movieId The ID of the movie to fetch
 * @returns Movie data object or error response
 */
export const fetchMovies = async (movieId: number) => {
	try {
		// Fetch movie details by ID
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`/movies/${movieId}`
		);
		return data;
	} catch (error: any) {
		// Return error object if fetching fails
		return {
			success: false,
			data: "Impossible de récupérer le film"
		};
	}
};
