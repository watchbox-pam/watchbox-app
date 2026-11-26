import { routeAfterLogin } from "./onboarding";

describe("routeAfterLogin", () => {
	it("envoie vers l'onboarding s'il n'est pas fait", () => {
		expect(routeAfterLogin(false)).toBe("/onboarding/providers");
	});

	it("envoie vers l'accueil s'il est fait ou si le statut est inconnu", () => {
		expect(routeAfterLogin(true)).toBe("/");
		expect(routeAfterLogin(undefined)).toBe("/");
		expect(routeAfterLogin(null)).toBe("/");
	});
});
