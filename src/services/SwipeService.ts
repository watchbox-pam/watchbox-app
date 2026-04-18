import { ApiHelper } from "@/src/utils/axios";

export const checkBackendHealth = async (): Promise<{ ok: boolean; error?: string }> => {
	try {
		const res = await ApiHelper.get("/health");
		return { ok: res.success };
	} catch (e: any) {
		return { ok: false, error: e?.message ?? "unreachable" };
	}
};

export type Movie = {
	id: number; // ou string, selon ta base
	title: string;
	poster_path: string | null; // doit correspondre à ce que ton API renvoie
	// Ajoute d'autres propriétés si besoin
};

export type ApiSwipeDirection = "like" | "dislike" | "skip";

export const postSwipe = async (
	movieId: number,
	direction: ApiSwipeDirection
): Promise<void> => {
	try {
		await ApiHelper.post("/swipes", { movie_id: movieId, direction });
	} catch (error: any) {
		if (__DEV__) console.error("Erreur postSwipe :", error);
	}
};

export const fetchMovies = async (count: number = 50): Promise<Movie[]> => {
	try {
		const response = await ApiHelper.get(`/movies/random?count=${count}`);

		if (!response.success) {
			if (__DEV__) console.warn("fetchMovies: réponse backend KO →", response.data);
			return [];
		}

		if (!Array.isArray(response.data)) {
			if (__DEV__) console.warn("fetchMovies: format inattendu →", response.data);
			return [];
		}

		const valid = (response.data as any[]).filter(
			(m) => typeof m.id === "number" && typeof m.title === "string"
		);

		if (__DEV__ && valid.length !== response.data.length) {
			console.warn(`fetchMovies: ${response.data.length - valid.length} film(s) ignorés (données manquantes)`);
		}

		return valid as Movie[];
	} catch (error: any) {
		if (__DEV__) console.error("Erreur fetchMovies :", error);
		return [];
	}
};
