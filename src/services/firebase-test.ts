// import analytics from '@react-native-firebase/analytics';

export async function testFirebaseAnalytics() {
	try {
		// await analytics().logEvent('watchbox_test_event', {
		//   source: 'home_screen',
		//   timestamp: Date.now(),
		// });

		console.log("Firebase Analytics OK");
	} catch (error) {
		console.error("Firebase Analytics KO", error);
	}
}
