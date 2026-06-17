// import analytics from '@react-native-firebase/analytics';

type AnalyticsParams = Record<string, string | number | boolean | null>;

let currentScreenName: string | null = null;
let currentScreenStartTime: number | null = null;
let sessionStartTime: number | null = null;

export const startSessionTracking = async () => {
	sessionStartTime = Date.now();

	await trackEvent("session_started_custom");
};

export const endSessionTracking = async () => {
	if (!sessionStartTime) return;

	const durationSeconds = Math.round((Date.now() - sessionStartTime) / 1000);

	await trackEvent("session_ended_custom", {
		duration_seconds: durationSeconds
	});

	sessionStartTime = null;
};

export const startScreenTracking = async (screenName: string) => {
	currentScreenName = screenName;
	currentScreenStartTime = Date.now();

	try {
		// await analytics().logScreenView({
		//   screen_name: screenName,
		//   screen_class: screenName,
		// });

		await trackEvent("screen_view_custom", {
			screen_name: screenName
		});
	} catch (error) {
		console.error("Screen tracking error:", error);
	}
};

export const endScreenTracking = async () => {
	if (!currentScreenName || !currentScreenStartTime) return;

	const durationSeconds = Math.round(
		(Date.now() - currentScreenStartTime) / 1000
	);

	await trackEvent("screen_time_spent", {
		screen_name: currentScreenName,
		duration_seconds: durationSeconds
	});

	currentScreenName = null;
	currentScreenStartTime = null;
};

export const trackEvent = async (
	eventName: string,
	params?: AnalyticsParams
) => {
	try {
		// await analytics().logEvent(eventName, params);
	} catch (error) {
		console.error("Analytics event error:", error);
	}
};

export const trackMovieOpened = async (
	movieId: string | number,
	movieTitle?: string
) => {
	await trackEvent("movie_opened", {
		movie_id: movieId,
		movie_title: movieTitle ?? null
	});
};

export const trackSearchPerformed = async (query: string, filter: string) => {
	await trackEvent("search_performed", {
		query,
		filter
	});
};

export const trackMovieAddedToWatchlist = async (
	movieId: string | number,
	movieTitle?: string
) => {
	await trackEvent("movie_added_to_watchlist", {
		movie_id: movieId,
		movie_title: movieTitle ?? null
	});
};

export const trackMovieRated = async (
	movieId: string | number,
	rating: number
) => {
	await trackEvent("movie_rated", {
		movie_id: movieId,
		rating
	});
};
