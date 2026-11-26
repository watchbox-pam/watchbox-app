import * as SecureStore from "expo-secure-store";
import useFiltersStore from "./filtersStore";
import {
	getMyProviders,
	updateMyProviders
} from "@/src/services/UserProviderService";

jest.mock("expo-secure-store", () => {
	const store: Record<string, string> = {};
	return {
		__store: store,
		getItemAsync: jest.fn(async (k: string) => store[k] ?? null),
		setItemAsync: jest.fn(async (k: string, v: string) => {
			store[k] = v;
		}),
		deleteItemAsync: jest.fn(async (k: string) => {
			delete store[k];
		})
	};
});
jest.mock("@/src/services/UserProviderService", () => ({
	getMyProviders: jest.fn(),
	updateMyProviders: jest.fn()
}));

const mockedGet = getMyProviders as jest.Mock;
const mockedUpdate = updateMyProviders as jest.Mock;
const secureStore = (SecureStore as any).__store as Record<string, string>;
const providers = (ids: number[]) =>
	ids.map((id) => ({ id, name: `P${id}`, logo_path: "" }));

describe("filtersStore", () => {
	beforeEach(async () => {
		jest.clearAllMocks();
		Object.keys(secureStore).forEach((k) => delete secureStore[k]);
		await useFiltersStore.getState().reset();
		mockedUpdate.mockImplementation(async (ids: number[]) => ({
			success: true,
			data: providers(ids)
		}));
	});

	it("charge la sélection du serveur et la garde en local", async () => {
		mockedGet.mockResolvedValue({
			success: true,
			data: providers([8, 337])
		});

		await useFiltersStore.getState().loadProviders();

		expect(useFiltersStore.getState().selectedProviders).toEqual([8, 337]);
		expect(JSON.parse(secureStore.selectedProviders)).toEqual([8, 337]);
	});

	it("envoie une seule fois l'ancienne sélection locale au serveur", async () => {
		secureStore.selectedProviders = JSON.stringify([119]);
		mockedGet.mockResolvedValue({ success: true, data: [] });

		await useFiltersStore.getState().loadProviders();
		expect(mockedUpdate).toHaveBeenCalledWith([119]);
		expect(useFiltersStore.getState().selectedProviders).toEqual([119]);

		// Ensuite, le serveur fait foi (ex. sélection vidée depuis un autre appareil)
		mockedUpdate.mockClear();
		await useFiltersStore.getState().loadProviders();
		expect(mockedUpdate).not.toHaveBeenCalled();
		expect(useFiltersStore.getState().selectedProviders).toEqual([]);
	});

	it("garde la copie locale si le serveur ne répond pas", async () => {
		secureStore.selectedProviders = JSON.stringify([8]);
		mockedGet.mockResolvedValue({ success: false, data: [] });

		await useFiltersStore.getState().loadProviders();

		expect(useFiltersStore.getState().selectedProviders).toEqual([8]);
	});

	it("remet la sélection précédente si l'enregistrement échoue", async () => {
		await useFiltersStore.getState().saveProviders([8]);
		mockedUpdate.mockResolvedValueOnce({ success: false, data: [] });

		const saved = await useFiltersStore.getState().toggleProvider(337);

		expect(saved).toBe(false);
		expect(useFiltersStore.getState().selectedProviders).toEqual([8]);
	});

	it("le filtre de recherche ne modifie pas les plateformes enregistrées", async () => {
		await useFiltersStore.getState().saveProviders([8, 337]);
		mockedUpdate.mockClear();

		useFiltersStore.getState().toggleSearchFilter(8);
		expect(useFiltersStore.getState().searchFilter).toEqual([337]);
		useFiltersStore.getState().clearSearchFilter();
		expect(useFiltersStore.getState().searchFilter).toEqual([]);

		expect(useFiltersStore.getState().selectedProviders).toEqual([8, 337]);
		expect(mockedUpdate).not.toHaveBeenCalled();
	});

	it("reset vide tout à la déconnexion", async () => {
		await useFiltersStore.getState().saveProviders([8]);

		await useFiltersStore.getState().reset();

		expect(useFiltersStore.getState().selectedProviders).toEqual([]);
		expect(secureStore.selectedProviders).toBeUndefined();
		expect(secureStore.selectedProvidersSynced).toBeUndefined();
	});
});
