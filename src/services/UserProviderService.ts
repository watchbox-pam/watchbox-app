import { ApiHelper } from "@/src/utils/axios";
import Provider from "@/src/models/Provider";

type ProvidersResult = { success: boolean; data: Provider[] };

function toResult(result: { success: boolean; data: any }): ProvidersResult {
	if (result.success && Array.isArray(result.data)) {
		return { success: true, data: result.data };
	}
	return { success: false, data: [] };
}

/**
 * Plateformes de streaming enregistrées pour l'utilisateur connecté.
 */
export async function getMyProviders(): Promise<ProvidersResult> {
	return toResult(await ApiHelper.get("/users/me/providers"));
}

/**
 * Remplace toute la sélection de l'utilisateur (liste vide = aucune plateforme).
 */
export async function updateMyProviders(
	providerIds: number[]
): Promise<ProvidersResult> {
	return toResult(
		await ApiHelper.put("/users/me/providers", {
			provider_ids: providerIds
		})
	);
}
