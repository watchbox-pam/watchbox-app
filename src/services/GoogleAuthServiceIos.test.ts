import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ApiHelper } from "@/src/utils/axios";

// Mêmes scénarios que GoogleAuthService.test.ts, mais sur iPhone
jest.mock("react-native", () => ({ Platform: { OS: "ios" } }));
jest.mock("@react-native-google-signin/google-signin", () => ({
	GoogleSignin: {
		configure: jest.fn(),
		hasPlayServices: jest.fn().mockResolvedValue(true),
		signIn: jest.fn(),
		signOut: jest.fn().mockResolvedValue(null),
		hasPreviousSignIn: jest.fn().mockReturnValue(true)
	},
	isSuccessResponse: (response: any) => response?.type === "success",
	isErrorWithCode: (error: any) => error && typeof error.code === "string",
	statusCodes: {
		SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
		IN_PROGRESS: "IN_PROGRESS",
		PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE"
	}
}));
jest.mock("expo-secure-store", () => ({ setItemAsync: jest.fn() }));
jest.mock("@/src/utils/axios", () => ({ ApiHelper: { post: jest.fn() } }));

const loadService = (iosClientId: string | undefined) => {
	process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = "web-client-id";
	if (iosClientId) {
		process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = iosClientId;
	} else {
		delete process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
	}
	let service: any;
	jest.isolateModules(() => {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		service = require("./GoogleAuthService");
	});
	return service;
};

describe("GoogleAuthService sur iOS", () => {
	beforeEach(() => jest.clearAllMocks());

	it("est disponible sur iPhone et utilise le client iOS, sans Google Play Services", async () => {
		const service = loadService("ios-client-id");
		(GoogleSignin.signIn as jest.Mock).mockResolvedValue({
			type: "success",
			data: { idToken: "google-token" }
		});
		(ApiHelper.post as jest.Mock).mockResolvedValue({
			success: true,
			data: {
				status: "logged_in",
				user_id: "u1",
				username: "Arno",
				token: "jwt"
			}
		});

		const result = await service.signInWithGoogle();

		expect(service.isGoogleSignInAvailable).toBe(true);
		expect(GoogleSignin.configure).toHaveBeenCalledWith({
			webClientId: "web-client-id",
			iosClientId: "ios-client-id"
		});
		expect(GoogleSignin.hasPlayServices).not.toHaveBeenCalled();
		expect(result.status).toBe("logged_in");
	});

	it("refuse proprement si le client iOS n'est pas configuré", async () => {
		const service = loadService(undefined);
		jest.spyOn(console, "error").mockImplementation(() => {});

		const result = await service.signInWithGoogle();

		expect(result).toEqual({
			status: "error",
			message: "La connexion avec Google n'est pas configurée"
		});
		expect(GoogleSignin.signIn).not.toHaveBeenCalled();
	});
});
