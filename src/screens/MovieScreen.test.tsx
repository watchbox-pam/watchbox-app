import { render, waitFor } from "@testing-library/react-native";
import MovieScreen from "./MovieScreen";
import { fetchMovieDetails } from "../services/MovieDetailService";

jest.mock("@/src/services/MovieDetailService", () => ({
	fetchMovieDetails: jest.fn()
}));

jest.mock("react-native-youtube-iframe", () => "YoutubePlayer");

jest.mock("expo-font", () => ({
	isLoaded: jest.fn(() => true),
	loadAsync: jest.fn()
}));

jest.mock("@/src/components/StyledText", () => {
	return ({ children }: any) => children;
});

const data = {
	adult: false,
	age_restriction: "16+",
	backdrop_path: "/9KSGUPHZpqhqkRXE2eebu701ONU.jpg",
	budget: 0,
	casting: [
		{
			adult: false,
			gender: 0,
			id: 0,
			known_for_department: "Acting",
			name: "Unknown",
			original_name: "Unknown",
			popularity: 0,
			profile_path: null,
			cast_id: 0,
			character: "Unknown",
			credit_id: "0",
			order: 0
		}
	],
	composer: {
		adult: false,
		credit_id: "61f1c0c26d4c97004316988a",
		department: "Directing",
		gender: 2,
		id: 1056739,
		job: "Director",
		known_for_department: "Sound",
		name: "Flying Lotus",
		original_name: "Flying Lotus",
		popularity: 0.6565,
		profile_path: "/8onENZej2ahbQimPaIXybuopXdP.jpg"
	},
	director: {
		adult: false,
		credit_id: "630cec6718864b008329cff2",
		department: "Production",
		gender: 2,
		id: 82194,
		job: "Executive Producer",
		known_for_department: "Directing",
		name: "Neill Blomkamp",
		original_name: "Neill Blomkamp",
		popularity: 0.5309,
		profile_path: "/yj40QEEfjbRFnlwY0XunocNKdAe.jpg"
	},
	genres: ["Science-Fiction", "Thriller", "Horreur"],
	id: 931349,
	infos_complete: true,
	original_language: "en",
	original_title: "Ash",
	overview:
		"Une femme se réveille sur une planète lointaine et découvre que l'équipage de sa station spatiale a été sauvagement tué. Elle doit alors décider si elle peut faire confiance à l'homme envoyé à sa rescousse.",
	poster_path: "/5Oz39iyRuztiA8XqCNVDBuy2Ut3.jpg",
	providers: [
		{
			display_priority: 0,
			logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
			provider_id: 8,
			provider_name: "Netflix"
		}
	],
	release_date: "2025-03-20",
	revenue: 0,
	runtime: 95,
	status: "Released",
	title: "Ash",
	video: false,
	video_key: "uvp2EYCXYwU"
};

describe("<MovieScreen />", () => {
	test("renders correctly with movie data", async () => {
		(fetchMovieDetails as jest.Mock).mockResolvedValueOnce({
			success: true,
			data: data
		});
		const { getByTestId } = render(<MovieScreen />);
		expect(getByTestId("loading")).toBeTruthy();

		await waitFor(() => {
			expect(getByTestId("movie-banner")).toBeTruthy();
			expect(getByTestId("movie-poster")).toBeTruthy();
			expect(getByTestId("movie-info")).toHaveTextContent(
				"16+Ash2025-03-20 • 1h 35minpar Neill Blomkamp"
			);
			expect(getByTestId("movie-tags")).toBeTruthy();
			expect(getByTestId("carousel-providers")).toBeTruthy();
			expect(getByTestId("movie-overview")).toHaveTextContent(
				"Une femme se réveille sur une planète lointaine et découvre que l'équipage de sa station spatiale a été sauvagement tué. Elle doit alors décider si elle peut faire confiance à l'homme envoyé à sa rescousse."
			);
			expect(getByTestId("movie-video")).toBeTruthy();
			expect(getByTestId("carousel-casting")).toHaveTextContent(
				"UnknownUnknown"
			);
			expect(getByTestId("movie-director")).toHaveTextContent(
				"RéalisateurNeill Blomkamp"
			);
			expect(getByTestId("movie-composer")).toHaveTextContent(
				"CompositeurFlying Lotus"
			);
		});
	});

	test("renders correctly with error", async () => {
		(fetchMovieDetails as jest.Mock).mockResolvedValueOnce({
			success: false,
			data: undefined
		});
		const { getByTestId } = render(<MovieScreen />);
		expect(getByTestId("loading")).toBeTruthy();

		await waitFor(() => {
			expect(getByTestId("error")).toBeTruthy();
			expect(getByTestId("error")).toHaveTextContent(
				"Erreur lors du chargement des données."
			);
		});
	});
});
