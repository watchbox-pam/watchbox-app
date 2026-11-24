import { ApiHelper } from "@/src/utils/axios";
import Provider from "@/src/models/Provider";

/**
 * Provider service for fetching streaming providers from the API
 */
export const providerService = {
	/**
	 * Get all available streaming providers
	 * @returns List of streaming providers
	 */
	getProviders: async (): Promise<{ success: boolean; data: Provider[] }> => {
		try {
			const response = await ApiHelper.get(`/providers`);
			return response;
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	},

	/**
	 * Get providers for a specific movie
	 * @param movieId The movie ID
	 * @returns List of providers for the movie
	 */
	getMovieProviders: async (
		movieId: number
	): Promise<{ success: boolean; data: Provider[] }> => {
		try {
			const response = await ApiHelper.get(`/providers/movie/${movieId}`);
			return response;
		} catch (error) {
			return {
				success: false,
				data: []
			};
		}
	}
};

/**
 * Fetchs available import options for a specific service
 * @returns list of import options
 */
export const fetchMovieImportOptions = async () => {
	try {
		const data: { success: boolean; data: any } =
			await ApiHelper.get(`/providers/imports`);
		return data;
	} catch (error: any) {
		return {
			success: false,
			data: "Impossible de récupérer les options d'importation"
		};
	}
};
