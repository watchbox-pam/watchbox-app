import { ApiHelper } from "@/src/utils/axios";
import { Movie } from "@/src/services/SwipeService";

export const ONBOARDING_MOVIE_COUNT = 15;

/**
 * Films à swiper pendant l'onboarding (populaires, variés,
 * en priorité disponibles sur les plateformes de l'utilisateur).
 */
export async function fetchOnboardingMovies(
	count: number = ONBOARDING_MOVIE_COUNT
): Promise<Movie[]> {
	const response = await ApiHelper.get(
		`/users/me/onboarding/movies?count=${count}`
	);
	if (!response.success || !Array.isArray(response.data)) return [];
	return response.data.filter(
		(m: any) => typeof m.id === "number" && typeof m.title === "string"
	);
}

/**
 * Marque l'onboarding comme terminé (fini ou passé).
 */
export async function completeOnboarding(): Promise<boolean> {
	const response = await ApiHelper.post("/users/me/onboarding/complete", {});
	return response.success;
}
