import { ApiHelper } from "@/src/utils/axios";

export type Movie = {
	id: number; // ou string, selon ta base
	title: string;
	poster_path: string | null; // doit correspondre à ce que ton API renvoie
	// Ajoute d'autres propriétés si besoin
};

export const fetchMovies = async (count: number = 50): Promise<Movie[]> => {
	try {
		const response = await ApiHelper.get(`/movies/random?count=${count}`);
		console.log("Réponse brute de l'API :", response.data);

		if (!Array.isArray(response.data)) {
			throw new Error("Données de films invalides");
		}

		return response.data as Movie[];
	} catch (error: any) {
		if (__DEV__) console.error("Erreur fetchMovies :", error);
		return []; // retourne un tableau vide en cas d'erreur
	}
};
