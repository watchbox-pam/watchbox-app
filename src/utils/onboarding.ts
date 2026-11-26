export const ONBOARDING_START_ROUTE = "/onboarding/providers";

/**
 * Où envoyer l'utilisateur juste après sa connexion.
 * - false : onboarding pas encore fait → parcours d'onboarding
 * - true, undefined ou null : accueil. undefined = backend sans onboarding (ancienne version),
 *   null = statut inconnu (réseau) : on ne bloque jamais l'accès à l'app.
 */
export function routeAfterLogin(onboardingCompleted?: boolean | null) {
	return onboardingCompleted === false ? ONBOARDING_START_ROUTE : "/";
}
