import { create } from "zustand/react";

const useSessionStore = create((set) => ({
	isLoggedIn: false,
	user: {
		id: "",
		username: ""
	},
	signIn: (id: string, username: string) =>
		set({ isLoggedIn: true, user: { id: id, username: username } }),
	signOut: () => set({ isLoggedIn: false, userId: "", username: "" })
}));

export default useSessionStore;
