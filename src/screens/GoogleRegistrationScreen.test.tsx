import {
	fireEvent,
	render,
	screen,
	waitFor
} from "@testing-library/react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import GoogleRegistrationScreen from "./GoogleRegistrationScreen";
import useGoogleRegistrationStore from "@/src/zustand/googleRegistrationStore";
import useSessionStore from "@/src/zustand/sessionStore";
import { completeGoogleRegistration } from "@/src/services/GoogleAuthService";

jest.mock("expo-router", () => ({
	router: { replace: jest.fn(), back: jest.fn(), push: jest.fn() }
}));
jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));
jest.mock("expo-secure-store", () => ({
	setItemAsync: jest.fn(),
	deleteItemAsync: jest.fn()
}));
jest.mock("@/src/components/BackButton", () => () => null);
jest.mock("@/src/components/Logo", () => () => null);
jest.mock("@/src/components/StyledText", () => {
	const { Text } = jest.requireActual("react-native");
	const MockStyledText = (props: any) => <Text {...props} />;
	return MockStyledText;
});
jest.mock("@react-native-community/datetimepicker", () => {
	const { Text } = jest.requireActual("react-native");
	// Sélecteur de date simulé : un appui choisit le 20/05/1995
	const MockDatePicker = (props: any) => (
		<Text
			testID="dateTimePicker"
			onPress={() =>
				props.onChange({ type: "set" }, new Date(1995, 4, 20))
			}>
			picker
		</Text>
	);
	return MockDatePicker;
});
jest.mock("@/src/services/UserProviderService", () => ({
	getMyProviders: jest.fn(),
	updateMyProviders: jest.fn()
}));
jest.mock("@/src/services/GoogleAuthService", () => ({
	completeGoogleRegistration: jest.fn(),
	signOutFromGoogle: jest.fn()
}));

const mockedComplete = completeGoogleRegistration as jest.Mock;
const pending = {
	registrationToken: "reg",
	email: "arno@gmail.com",
	suggestedUsername: "Arnaud"
};

describe("GoogleRegistrationScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useGoogleRegistrationStore.setState({ pending });
		useSessionStore.setState({ isLoggedIn: false });
	});

	it("pré-remplit le pseudo suggéré et affiche l'email Google", () => {
		render(<GoogleRegistrationScreen />);
		expect(screen.getByDisplayValue("Arnaud")).toBeTruthy();
		expect(screen.getByText(/arno@gmail\.com/)).toBeTruthy();
	});

	it("refuse d'envoyer sans date de naissance", () => {
		render(<GoogleRegistrationScreen />);
		fireEvent.press(screen.getByText("Créer mon compte"));
		expect(mockedComplete).not.toHaveBeenCalled();
		expect(Toast.show).toHaveBeenCalledWith(
			expect.objectContaining({
				text2: "La date de naissance est requise"
			})
		);
	});

	it("crée le compte, connecte l'utilisateur et ouvre l'accueil", async () => {
		mockedComplete.mockResolvedValue({
			status: "logged_in",
			session: { id: "u1", username: "Arno", token: "jwt" }
		});
		render(<GoogleRegistrationScreen />);

		fireEvent.changeText(screen.getByDisplayValue("Arnaud"), "Arno");
		fireEvent.press(screen.getByText("Date de naissance"));
		fireEvent.press(screen.getByTestId("dateTimePicker"));
		fireEvent.press(screen.getByText("Créer mon compte"));

		await waitFor(() => expect(router.replace).toHaveBeenCalledWith("/"));
		expect(mockedComplete).toHaveBeenCalledWith({
			registrationToken: "reg",
			username: "Arno",
			birthdate: new Date(1995, 4, 20),
			country: "FR"
		});
		expect(useSessionStore.getState().isLoggedIn).toBe(true);
		expect(useGoogleRegistrationStore.getState().pending).toBeNull();
	});

	it("ouvre l'onboarding quand le backend l'indique", async () => {
		mockedComplete.mockResolvedValue({
			status: "logged_in",
			session: { id: "u1", username: "Arno", token: "jwt" },
			onboardingCompleted: false
		});
		render(<GoogleRegistrationScreen />);

		fireEvent.press(screen.getByText("Date de naissance"));
		fireEvent.press(screen.getByTestId("dateTimePicker"));
		fireEvent.press(screen.getByText("Créer mon compte"));

		await waitFor(() =>
			expect(router.replace).toHaveBeenCalledWith("/onboarding/providers")
		);
	});

	it("affiche l'erreur du backend (pseudo pris) sans quitter l'écran", async () => {
		mockedComplete.mockResolvedValue({
			status: "error",
			message: "Ce pseudo est déjà utilisé"
		});
		render(<GoogleRegistrationScreen />);
		fireEvent.press(screen.getByText("Date de naissance"));
		fireEvent.press(screen.getByTestId("dateTimePicker"));
		fireEvent.press(screen.getByText("Créer mon compte"));

		await waitFor(() =>
			expect(Toast.show).toHaveBeenCalledWith(
				expect.objectContaining({ text2: "Ce pseudo est déjà utilisé" })
			)
		);
		expect(router.replace).not.toHaveBeenCalled();
		expect(useGoogleRegistrationStore.getState().pending).toEqual(pending);
	});

	it("revient à l'accueil si aucune inscription n'est en cours", () => {
		useGoogleRegistrationStore.setState({ pending: null });
		render(<GoogleRegistrationScreen />);
		expect(router.replace).toHaveBeenCalledWith("/base");
	});
});
