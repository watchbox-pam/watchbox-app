import { ApiHelper } from "@/src/utils/axios";

type TimePeriods = "day" | "week";

/**
 * Service for fetching popular movies from the API
 */
export const fetchPopular = async (timePeriod: TimePeriods) => {
	try {
		// Fetch popular movies based on a time period (day or week), page 1 by default
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`movies/popular/${timePeriod}?page=1`
		);
		return data;
	} catch (error: any) {
		// Return error object in case of failure
		return {
			success: false,
			data: "Impossible de récupérer les films"
		};
	}
};

/**
 * Service for fetching movies by genre from the API
 */
export const fetchGenre = async (genre: string) => {
	try {
		// Fetch movies based on a specific genre
		const data: { success: boolean; data: any } = await ApiHelper.get(
			`movies/genres/${genre}`
		);
		return data;
	} catch (error: any) {
		// Return error object in case of failure
		return {
			success: false,
			data: "Impossible de récupérer les films"
		};
	}
};

/**
 * Service for fetching movies by genre from the API
 */
export const fetchAllMovieSections = async () => {
	try {
		const sections = [
			{ type: "popular", period: "day", title: "Populaires aujourd'hui" },
			{
				type: "popular",
				period: "week",
				title: "Populaires cette semaine"
			},
			{ type: "genre", param: "28", title: "Action" },
			//{ type: "genre", param: "12", title: "Aventure" },
			//{ type: "genre", param: "16", title: "Animation" },
			{ type: "genre", param: "35", title: "Comédie" },
			//{ type: "genre", param: "80", title: "Crime" },
			//{ type: "genre", param: "99", title: "Documentaire" },
			{ type: "genre", param: "18", title: "Drame" } //,
			// { type: "genre", param: "10751", title: "Familial" },
			// { type: "genre", param: "14", title: "Fantasy" },
			// { type: "genre", param: "36", title: "Histoire" },
			// { type: "genre", param: "27", title: "Horreur" },
			// { type: "genre", param: "10402", title: "Musique" },
			// { type: "genre", param: "9648", title: "Mystère" },
			// { type: "genre", param: "10749", title: "Romance" },
			// { type: "genre", param: "878", title: "Science-Fiction" },
			// { type: "genre", param: "10770", title: "Téléfilm" },
			// { type: "genre", param: "53", title: "Thriller" },
			// { type: "genre", param: "10752", title: "Guerre" },
			// { type: "genre", param: "37", title: "Western" }
		];
		const results = await Promise.all(
			sections.map(async (section) => {
				const response =
					section.type === "popular"
						? await fetchPopular(section.period as TimePeriods)
						: await fetchGenre(section.param as string);
				return {
					title: section.title,
					movies: response.success ? response.data["results"] : []
				};
			})
		);

		const validSections = results.filter((r) => r.movies.length > 0);

		if (validSections.length === 0) {
			return {
				success: false,
				data: []
			};
		}

		return {
			success: true,
			data: validSections
		};
	} catch (error: any) {
		console.error("Erreur fetchAllMovieSections:", error);
		return {
			success: false,
			data: []
		};
	}
};
