import { ApiHelper } from "@/src/utils/axios";

/**
 * Search service for fetching search results from the API
 */
export const searchService = {
	/**
	 * Search all media types (movies, actors, etc)
	 * @param searchTerm The term to search for
	 * @param providers Optional list of provider IDs to filter by
	 * @returns Search results object
	 */
	searchAll: async (searchTerm: string, providers?: number[]) => {
		try {
			const validSearchTerm = searchTerm.trim();
			let url = `/search/${validSearchTerm}`;

			// Add provider query params if they exist
			if (providers && providers.length > 0) {
				const providerParams = providers
					.map((id) => `providers=${id}`)
					.join("&");
				url += `?${providerParams}`;
			}

			const response = await ApiHelper.get(url);
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
	 * @param providers Optional list of provider IDs to filter by
	 * @returns Movies search results
	 */
	searchMovies: async (searchTerm: string, providers?: number[]) => {
		try {
			const validSearchTerm = searchTerm.trim();
			let url = `/search/movie/${validSearchTerm}`;

			// Add provider query params if they exist
			if (providers && providers.length > 0) {
				const providerParams = providers
					.map((id) => `providers=${id}`)
					.join("&");
				url += `?${providerParams}`;
			}

			const response = await ApiHelper.get(url);
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
	 * Search only users
	 * @param searchTerm The term to search for
	 * @returns Users search results
	 */
	searchUsers: async (searchTerm: string) => {
		try {
			const validSearchTerm = searchTerm.trim();
			const response = await ApiHelper.get(
				`/search/users/${validSearchTerm}`
			);
			console.log(response);
			return response;
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	},

	getSuggestions: async (searchTerm: string, providers?: number[]) => {
		try {
			const params = new URLSearchParams({ query: searchTerm });
			if (providers?.length) {
				providers.forEach((id) =>
					params.append("providers", String(id))
				);
			}
			return await ApiHelper.get(
				`/search/suggestions?${params.toString()}`
			);
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	}
};
