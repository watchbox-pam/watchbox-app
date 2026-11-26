import { create } from "zustand/react";
import * as SecureStore from "expo-secure-store";
import {
	getMyProviders,
	updateMyProviders
} from "@/src/services/UserProviderService";

// Copie locale de la sélection (affichage immédiat, hors ligne). La référence est le serveur.
const STORAGE_KEY = "selectedProviders";
// Présent une fois la sélection synchronisée avec le serveur au moins une fois
const SYNCED_KEY = "selectedProvidersSynced";

type FiltersStore = {
	/** Plateformes de l'utilisateur (Paramètres, onboarding) */
	selectedProviders: number[];
	isLoaded: boolean;
	/** Filtre de la recherche. null = on suit les plateformes de l'utilisateur */
	searchFilter: number[] | null;

	loadProviders: () => Promise<void>;
	saveProviders: (ids: number[]) => Promise<boolean>;
	toggleProvider: (id: number) => Promise<boolean>;

	toggleSearchFilter: (id: number) => void;
	clearSearchFilter: () => void;

	reset: () => Promise<void>;
};

async function readLocal(): Promise<number[]> {
	try {
		const saved = await SecureStore.getItemAsync(STORAGE_KEY);
		const parsed = saved ? JSON.parse(saved) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

async function writeLocal(ids: number[]) {
	try {
		await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(ids));
		await SecureStore.setItemAsync(SYNCED_KEY, "1");
	} catch {}
}

// Évite qu'une réponse lente écrase une sélection plus récente (clics rapides)
let lastRequestId = 0;

const useFiltersStore = create<FiltersStore>((set, get) => ({
	selectedProviders: [],
	isLoaded: false,
	searchFilter: null,

	loadProviders: async () => {
		// 1. Copie locale tout de suite
		const local = await readLocal();
		set({ selectedProviders: local, isLoaded: true });

		// 2. Puis la version du serveur
		const remote = await getMyProviders();
		if (!remote.success) return; // hors ligne : on garde la copie locale

		const remoteIds = remote.data.map((p) => p.id);
		let synced: string | null = null;
		try {
			synced = await SecureStore.getItemAsync(SYNCED_KEY);
		} catch {}

		// Sélection faite avant l'enregistrement côté serveur : on l'envoie une seule fois
		if (remoteIds.length === 0 && local.length > 0 && !synced) {
			await get().saveProviders(local);
			return;
		}

		set({ selectedProviders: remoteIds });
		await writeLocal(remoteIds);
	},

	saveProviders: async (ids: number[]) => {
		const previous = get().selectedProviders;
		const requestId = ++lastRequestId;
		set({ selectedProviders: ids });

		const result = await updateMyProviders(ids);
		if (requestId !== lastRequestId) return result.success;

		if (!result.success) {
			set({ selectedProviders: previous });
			return false;
		}

		const savedIds = result.data.map((p) => p.id);
		set({ selectedProviders: savedIds });
		await writeLocal(savedIds);
		return true;
	},

	toggleProvider: async (id: number) => {
		const current = get().selectedProviders;
		const next = current.includes(id)
			? current.filter((p) => p !== id)
			: [...current, id];
		return get().saveProviders(next);
	},

	toggleSearchFilter: (id: number) => {
		const current = get().searchFilter ?? get().selectedProviders;
		set({
			searchFilter: current.includes(id)
				? current.filter((p) => p !== id)
				: [...current, id]
		});
	},

	clearSearchFilter: () => set({ searchFilter: [] }),

	// Déconnexion : rien ne doit passer au compte suivant
	reset: async () => {
		lastRequestId++;
		set({ selectedProviders: [], isLoaded: false, searchFilter: null });
		try {
			await SecureStore.deleteItemAsync(STORAGE_KEY);
			await SecureStore.deleteItemAsync(SYNCED_KEY);
		} catch {}
	}
}));

export default useFiltersStore;
