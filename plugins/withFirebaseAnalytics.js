const { withAndroidManifest, withPodfile } = require("@expo/config-plugins");

module.exports = function withFirebaseAnalytics(config) {
	// ============================================================
	// ANDROID
	// ============================================================
	config = withAndroidManifest(config, (config) => {
		const manifest = config.modResults.manifest;
		const application = manifest.application?.[0];

		if (!application) {
			return config;
		}

		// Ensure the Android "tools" namespace exists.
		manifest.$ = manifest.$ || {};
		manifest.$["xmlns:tools"] =
			manifest.$["xmlns:tools"] || "http://schemas.android.com/tools";

		// Disable Firebase Analytics Advertising ID collection.
		application["meta-data"] = application["meta-data"] || [];

		const metaDataName = "google_analytics_adid_collection_enabled";

		const existing = application["meta-data"].find(
			(item) => item.$?.["android:name"] === metaDataName
		);

		if (existing) {
			existing.$["android:value"] = "false";
			existing.$["tools:replace"] = "android:value";
		} else {
			application["meta-data"].push({
				$: {
					"android:name": metaDataName,
					"android:value": "false",
					"tools:replace": "android:value"
				}
			});
		}

		// Remove Advertising ID permissions added by dependencies.
		manifest["uses-permission"] = manifest["uses-permission"] || [];

		const permissionsToRemove = [
			"com.google.android.gms.permission.AD_ID",
			"android.permission.ACCESS_ADSERVICES_AD_ID"
		];

		for (const permissionName of permissionsToRemove) {
			manifest["uses-permission"].push({
				$: {
					"android:name": permissionName,
					"tools:node": "remove"
				}
			});
		}

		return config;
	});

	// ============================================================
	// iOS
	// ============================================================
	config = withPodfile(config, (config) => {
		let podfile = config.modResults.contents;

		// FirebaseCoreInternal / GoogleUtilities require modular headers
		// when Firebase is integrated as static libraries.
		if (!podfile.includes("use_modular_headers!")) {
			podfile = podfile.replace(
				/(^|\n)(platform :ios.*\n)/,
				"$1$2\nuse_modular_headers!\n"
			);
		}

		config.modResults.contents = podfile;

		return config;
	});

	return config;
};
