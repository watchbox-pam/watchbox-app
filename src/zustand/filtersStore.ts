import { create } from "zustand/react";
import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "selectedProviders";

type FiltersStore = {
	selectedProviders: number[];
	isLoaded: boolean;
	loadProviders: () => Promise<void>;
	toggleProvider: (id: number) => Promise<void>;
	clearProviders: () => Promise<void>;
};

const useFiltersStore = create<FiltersStore>((set, get) => ({
	selectedProviders: [],
	isLoaded: false,

	loadProviders: async () => {
		try {
			const saved = await SecureStore.getItemAsync(STORAGE_KEY);
			set({
				selectedProviders: saved ? JSON.parse(saved) : [],
				isLoaded: true
			});
		} catch {
			set({ isLoaded: true });
		}
	},

	toggleProvider: async (id: number) => {
		const current = get().selectedProviders;
		const next = current.includes(id)
			? current.filter((p) => p !== id)
			: [...current, id];
		set({ selectedProviders: next });
		try {
			await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(next));
		} catch {}
	},

	clearProviders: async () => {
		set({ selectedProviders: [] });
		try {
			await SecureStore.deleteItemAsync(STORAGE_KEY);
		} catch {}
	}
}));

export default useFiltersStore;
