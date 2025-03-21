import { ApiHelper } from "@/src/utils/axios";
import Movie from "@/src/models/Movie";

export async function searchInfos(searchTerm: string) {
	try {
		const validsearchTerm = searchTerm.trim();
		const results: Movie[] = await ApiHelper.get(
			`/movies/search/${validsearchTerm}`
		);
		return results;
	} catch (error) {
		return [];
	}
}
