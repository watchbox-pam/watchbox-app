import { ApiHelper } from "@/src/utils/axios";

export async function searchInfos(searchTerm: string) {
	try {
		const validsearchTerm = searchTerm.trim();
		const results = await ApiHelper.get(
			`/movies/search/${validsearchTerm}`
		);
		return results;
	} catch (error) {
		return {
			success: false,
			data: []
		};
	}
}
