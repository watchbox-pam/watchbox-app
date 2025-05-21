import { ApiHelper } from "../utils/axios";

/**
 * Fetches details for a specific person by ID
 * @param id Person's unique identifier
 * @returns API response or null if an error occurs
 */
export const fetchPerson = async (id: string) => {
	try {
		const response = await ApiHelper.get(`/person/${id}`);
		return response;
	} catch (e) {
		console.error(e);
		return null;
	}
};
