import { create } from "zustand/react";

const useSessionStore = create((set) => ({
	isLoggedIn: false,
	user: {
		id: "",
		identifier: "",
		token: ""
	},
	signIn: (id: string, identifier: string, token: string) =>
		set({ isLoggedIn: true, user: { id, identifier, token } }),
	signOut: () =>
		set({ isLoggedIn: false, user: { id: "", identifier: "", token: "" } })
}));

export default useSessionStore;
