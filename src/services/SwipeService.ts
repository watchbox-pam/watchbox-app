import { ApiHelper } from "@/src/utils/axios";

export type Movie = {
	id: string;
	title: string;
	posterUrl: string;
	// Ajoute d'autres propriétés selon ta base de données
};

type FetchMoviesResponse = {
	success: boolean;
	data: Movie[] | string;
};

export const fetchMovies = async (
	count: number = 200
): Promise<FetchMoviesResponse> => {
	try {
		const response = await ApiHelper.get(
			`/movies/popular-random?count=${count}`
		);
		return {
			success: true,
			data: response.data
		};
	} catch (error: any) {
		if (__DEV__) console.error("Erreur fetchMovies :", error);
		return {
			success: false,
			data: "Impossible de récupérer les films pour le swipe"
		};
	}
};
