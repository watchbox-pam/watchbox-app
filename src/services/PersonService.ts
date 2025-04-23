import { ApiHelper } from "../utils/axios";

export const fetchPerson = async (id: string) => {
	try {
		const response = await ApiHelper.get(`/person/${id}`);
		return response;
	} catch (e) {
		console.error(e);
		return null;
	}
};
