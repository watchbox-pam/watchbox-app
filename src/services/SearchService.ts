import { ApiHelper } from "@/src/utils/axios";

/**
 * Search service for fetching search results from the API
 */
export const searchService = {
	/**
	 * Search all media types (movies, actors, etc)
	 * @param searchTerm The term to search for
	 * @returns Search results object
	 */
	searchAll: async (searchTerm: string) => {
		try {
			const validSearchTerm = searchTerm.trim();
			const response = await ApiHelper.get(`/search/${validSearchTerm}`);
			return response;
		} catch (error) {
			return {
				success: false,
				data: {}
			};
		}
	},

	/**
	 * Search only movies
	 * @param searchTerm The term to search for
	 * @returns Movies search results
	 */
	searchMovies: async (searchTerm: string) => {
		try {
			const validSearchTerm = searchTerm.trim();
			const response = await ApiHelper.get(
				`/search/movie/${validSearchTerm}`
			);
			return response;
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	},

	/**
	 * Search only actors/people
	 * @param searchTerm The term to search for
	 * @returns Actors search results
	 */
	searchActors: async (searchTerm: string) => {
		try {
			const validSearchTerm = searchTerm.trim();
			const response = await ApiHelper.get(
				`/search/person/${validSearchTerm}`
			);
			return response;
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	},

	/**
	 * Search movies by release year
	 * @param year The year to search for
	 * @returns Movies from the specified year
	 */
	searchByYear: async (year: number) => {
		try {
			const response = await ApiHelper.get(`/search/year/${year}`);
			return response;
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	}
};
