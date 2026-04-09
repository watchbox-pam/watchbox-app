import { ApiHelper } from "@/src/utils/axios";

/**
 * Fetch detailed information about a specific movie by its ID.
 * @param movieId The unique identifier of the movie.
 * @returns An object containing success status and movie data or an error message.
 */
export const fetchMovieDetails = async (movieId: number) => {
	try {
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`/movies/id/${movieId}`
		);
		const movie = data.data;

		const watchProvidersRes = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
		);
		const watchData = await watchProvidersRes.json();
		const frProviders = watchData.results?.FR;

		movie.providers_link = frProviders?.link ?? null;
		movie.providers = [
			...(frProviders?.flatrate ?? []),
			...(frProviders?.rent ?? []),
			...(frProviders?.buy ?? [])
		];

		return data;
	} catch (error: any) {
		return {
			success: false,
			data: "Impossible de récupérer le film"
		};
	}
};
