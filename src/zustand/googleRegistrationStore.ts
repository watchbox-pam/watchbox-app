import { create } from "zustand/react";

/**
 * Inscription Google en attente : les infos renvoyées par le backend
 * entre l'écran d'accueil et l'écran "Finaliser l'inscription".
 * Gardées en mémoire uniquement (le jeton expire au bout de 15 minutes).
 */
export type PendingGoogleRegistration = {
	registrationToken: string;
	email: string;
	suggestedUsername: string;
};

type GoogleRegistrationStore = {
	pending: PendingGoogleRegistration | null;
	setPending: (pending: PendingGoogleRegistration) => void;
	clear: () => void;
};

const useGoogleRegistrationStore = create<GoogleRegistrationStore>((set) => ({
	pending: null,
	setPending: (pending) => set({ pending }),
	clear: () => set({ pending: null })
}));

export default useGoogleRegistrationStore;
