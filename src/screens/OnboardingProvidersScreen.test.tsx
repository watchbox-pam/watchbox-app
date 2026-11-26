import {
	fireEvent,
	render,
	screen,
	waitFor
} from "@testing-library/react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import OnboardingProvidersScreen from "./OnboardingProvidersScreen";
import useSessionStore from "@/src/zustand/sessionStore";
import useFiltersStore from "@/src/zustand/filtersStore";
import { providerService } from "@/src/services/ProviderService";

jest.mock("expo-router", () => ({
	router: { replace: jest.fn() },
	Redirect: () => null
}));
jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));
jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(async () => null),
	setItemAsync: jest.fn(),
	deleteItemAsync: jest.fn()
}));
jest.mock("@expo/vector-icons", () => ({ Ionicons: () => null }));
jest.mock("@/src/services/GoogleAuthService", () => ({
	signOutFromGoogle: jest.fn()
}));
jest.mock("@/src/services/UserProviderService", () => ({
	getMyProviders: jest.fn(),
	updateMyProviders: jest.fn()
}));
jest.mock("@/src/services/ProviderService", () => ({
	providerService: { getProviders: jest.fn() }
}));

const mockedGetProviders = providerService.getProviders as jest.Mock;
const saveProviders = jest.fn();

describe("OnboardingProvidersScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useSessionStore.setState({ isLoggedIn: true });
		useFiltersStore.setState({
			selectedProviders: [337],
			isLoaded: true,
			loadProviders: jest.fn(),
			saveProviders
		});
		mockedGetProviders.mockResolvedValue({
			success: true,
			data: [
				{ id: 8, name: "Netflix", logo_path: "/n.jpg" },
				{ id: 337, name: "Disney Plus", logo_path: "/d.jpg" },
				{ id: 119, name: "Amazon Prime Video", logo_path: "/a.jpg" }
			]
		});
	});

	it("pré-coche la sélection existante et enregistre le choix", async () => {
		saveProviders.mockResolvedValue(true);
		render(<OnboardingProvidersScreen />);

		await screen.findByText("Netflix");
		expect(screen.getByText("1 plateforme sélectionnée")).toBeTruthy();

		fireEvent.press(screen.getByTestId("provider-8"));
		expect(screen.getByText("2 plateformes sélectionnées")).toBeTruthy();

		fireEvent.press(screen.getByTestId("onboarding-providers-continue"));

		await waitFor(() => expect(router.replace).toHaveBeenCalledWith("/"));
		expect(saveProviders).toHaveBeenCalledWith([337, 8]);
	});

	it("permet de continuer sans plateforme", async () => {
		saveProviders.mockResolvedValue(true);
		render(<OnboardingProvidersScreen />);
		await screen.findByText("Netflix");

		fireEvent.press(screen.getByTestId("provider-337"));
		expect(screen.getByText("Continuer sans plateforme")).toBeTruthy();
		fireEvent.press(screen.getByTestId("onboarding-providers-continue"));

		await waitFor(() => expect(saveProviders).toHaveBeenCalledWith([]));
	});

	it("reste sur l'écran si l'enregistrement échoue", async () => {
		saveProviders.mockResolvedValue(false);
		render(<OnboardingProvidersScreen />);
		await screen.findByText("Netflix");

		fireEvent.press(screen.getByTestId("onboarding-providers-continue"));

		await waitFor(() => expect(Toast.show).toHaveBeenCalled());
		expect(router.replace).not.toHaveBeenCalled();
	});

	it("propose de réessayer si la liste ne charge pas", async () => {
		mockedGetProviders.mockResolvedValueOnce({ success: false, data: [] });
		render(<OnboardingProvidersScreen />);

		fireEvent.press(await screen.findByText("Réessayer"));

		expect(await screen.findByText("Netflix")).toBeTruthy();
	});
});
