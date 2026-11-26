import {
	fireEvent,
	render,
	screen,
	waitFor
} from "@testing-library/react-native";
import { router } from "expo-router";
import OnboardingSwipeScreen from "./OnboardingSwipeScreen";
import useSessionStore from "@/src/zustand/sessionStore";
import {
	completeOnboarding,
	fetchOnboardingMovies
} from "@/src/services/OnboardingService";

jest.mock("expo-router", () => ({
	router: { replace: jest.fn() },
	Redirect: () => null
}));
jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(async () => null),
	setItemAsync: jest.fn(),
	deleteItemAsync: jest.fn()
}));
jest.mock("@/src/services/GoogleAuthService", () => ({
	signOutFromGoogle: jest.fn()
}));
jest.mock("@/src/services/UserProviderService", () => ({
	getMyProviders: jest.fn(),
	updateMyProviders: jest.fn()
}));
jest.mock("@/src/services/OnboardingService", () => ({
	fetchOnboardingMovies: jest.fn(),
	completeOnboarding: jest.fn()
}));

// Le moteur de swipe est remplacé : on vérifie seulement ce que l'onboarding lui passe
const mockSwipeProps: { current: any } = { current: null };
jest.mock("@/src/screens/SwipeScreen", () => {
	const { View } = jest.requireActual("react-native");
	const MockSwipeScreen = (props: any) => {
		mockSwipeProps.current = props;
		return (
			<View>
				{props.renderHeader({ current: 3, total: 15 })}
				{props.endAction}
			</View>
		);
	};
	return MockSwipeScreen;
});

const mockedComplete = completeOnboarding as jest.Mock;

describe("OnboardingSwipeScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useSessionStore.setState({ isLoggedIn: true });
	});

	it("configure le swipe pour l'onboarding et affiche la progression", () => {
		render(<OnboardingSwipeScreen />);

		expect(screen.getByText("3/15")).toBeTruthy();
		expect(mockSwipeProps.current.loadMovies).toBe(fetchOnboardingMovies);
		expect(mockSwipeProps.current.loadMore).toBe(false);
		expect(mockSwipeProps.current.openDetailsOnTap).toBe(false);
	});

	it("« Passer » termine l'onboarding et ouvre l'accueil", async () => {
		mockedComplete.mockResolvedValue(true);
		render(<OnboardingSwipeScreen />);

		fireEvent.press(screen.getByTestId("onboarding-swipe-skip"));

		await waitFor(() => expect(router.replace).toHaveBeenCalledWith("/"));
		expect(mockedComplete).toHaveBeenCalledTimes(1);
	});

	it("le bouton de fin ouvre l'accueil même si l'enregistrement échoue", async () => {
		mockedComplete.mockResolvedValue(false);
		render(<OnboardingSwipeScreen />);

		fireEvent.press(screen.getByText("Découvrir Watchbox"));

		await waitFor(() => expect(router.replace).toHaveBeenCalledWith("/"));
	});
});
