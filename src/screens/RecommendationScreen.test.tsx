import { fireEvent, render, waitFor } from "@testing-library/react-native";
import RecommendationScreen from "./RecommendationScreen";
import { fetchRecommendations } from "@/src/services/RecommendationService";

jest.mock("@/src/services/RecommendationService", () => ({
	fetchRecommendations: jest.fn()
}));

describe("<RecommendationScreen />", () => {
	test("renders correctly the list of emotions", () => {
		const { getByText } = render(<RecommendationScreen />);

		expect(getByText("ROMANTISME")).toBeTruthy();
		expect(getByText("ÉMERVEILLEMENT")).toBeTruthy();
		expect(getByText("EXCITATION")).toBeTruthy();
		expect(getByText("FRISSON")).toBeTruthy();
		expect(getByText("NOSTALGIE")).toBeTruthy();
		expect(getByText("RÉFLEXION")).toBeTruthy();
		expect(getByText("MÉLANCOLIE")).toBeTruthy();
		expect(getByText("RIRE")).toBeTruthy();
	});

	test("can click on an emotion card and shows list of media", async () => {
		(fetchRecommendations as jest.Mock).mockResolvedValueOnce({
			success: true,
			data: [
				{ id: "1", title: "Movie 1", poster_path: "something.jpg" },
				{ id: "2", title: "Movie 2", poster_path: "something.jpg" },
				{ id: "3", title: "Movie 3", poster_path: "something.jpg" },
				{ id: "4", title: "Movie 4", poster_path: "something.jpg" },
				{ id: "5", title: "Movie 5", poster_path: "something.jpg" },
				{ id: "6", title: "Movie 6", poster_path: "something.jpg" },
				{ id: "7", title: "Movie 7", poster_path: "something.jpg" },
				{ id: "8", title: "Movie 8", poster_path: "something.jpg" },
				{ id: "9", title: "Movie 9", poster_path: "something.jpg" },
				{ id: "10", title: "Movie 10", poster_path: "something.jpg" }
			]
		});

		const { getByText, getAllByTestId } = render(<RecommendationScreen />);

		const emotionCard = getByText("ROMANTISME");
		expect(emotionCard).toBeTruthy();
		fireEvent.press(emotionCard);

		await waitFor(() => {
			expect(getAllByTestId("movie-title")).toHaveLength(10);
		});
	});

	test("can click on an emotion card but should show error when there is no data", async () => {
		(fetchRecommendations as jest.Mock).mockResolvedValueOnce({
			success: false,
			data: []
		});

		const { getByText } = render(<RecommendationScreen />);

		const emotionCard = getByText("ROMANTISME");
		expect(emotionCard).toBeTruthy();
		fireEvent.press(emotionCard);

		await waitFor(() => {
			expect(
				getByText("Impossible de charger les recommandations.")
			).toBeTruthy();
		});
	});
});
