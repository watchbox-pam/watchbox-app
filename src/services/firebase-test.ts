import { trackEvent } from "@/src/services/analytics";

export async function testFirebaseAnalytics() {
	try {
		await trackEvent("watchbox_test_event", {
			source: "home_screen",
			timestamp: Date.now()
		});

		console.log("Firebase Analytics OK");
	} catch (error) {
		console.error("Firebase Analytics KO", error);
	}
}
