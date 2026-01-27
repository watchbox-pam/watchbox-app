import { create } from "zustand/react";

interface MoviesSection {
	title: string;
	movies: any[];
}

interface MoviesStore {
	sections: MoviesSection[];
	isLoaded: boolean;
	setSections: (sections: MoviesSection[]) => void;
}

const useMoviesStore = create<MoviesStore>((set) => ({
	sections: [],
	isLoaded: false,
	setSections: (sections) => set({ sections, isLoaded: true })
}));

export default useMoviesStore;
