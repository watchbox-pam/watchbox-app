import { ApiHelper } from "@/src/utils/axios";
import Movie from "@/src/models/Movie";

export async function searchInfos(searchTerm: string) {
	try {
		const results: Movie[] = await ApiHelper.get(
			`/movies/search/${searchTerm}`
		);
		return results;
	} catch (error) {
		return [];
	}
}
