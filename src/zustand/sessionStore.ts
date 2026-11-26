import { create } from "zustand/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { signOutFromGoogle } from "@/src/services/GoogleAuthService";
import useFiltersStore from "@/src/zustand/filtersStore";

type SessionStore = {
	isLoggedIn: boolean;
	user: {
		id: string;
		identifier: string;
		token: string;
	};
	signIn: (id: string, identifier: string, token: string) => void;
	signOut: () => Promise<void>;
};

const useSessionStore = create<SessionStore>((set) => ({
	isLoggedIn: false,
	user: {
		id: "",
		identifier: "",
		token: ""
	},
	signIn: (id: string, identifier: string, token: string) =>
		set({ isLoggedIn: true, user: { id, identifier, token } }),
	signOut: async () => {
		if (Platform.OS === "ios" || Platform.OS === "android") {
			await SecureStore.deleteItemAsync("id");
			await SecureStore.deleteItemAsync("identifier");
			await SecureStore.deleteItemAsync("token");
		} else {
			localStorage.removeItem("id");
			localStorage.removeItem("identifier");
			localStorage.removeItem("token");
		}
		// Si l'utilisateur s'était connecté avec Google, on déconnecte aussi le compte Google
		// de l'appareil : la prochaine fois, il pourra choisir un autre compte
		await signOutFromGoogle();
		// Les plateformes du compte précédent ne doivent pas passer au suivant
		await useFiltersStore.getState().reset();
		set({ isLoggedIn: false, user: { id: "", identifier: "", token: "" } });
	}
}));

export default useSessionStore;
