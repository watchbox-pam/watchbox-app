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

export const trackMovieShared = async (
	movieId: string | number,
	platform: string
) => {
	await trackEvent("movie_shared", {
		movie_id: movieId,
		platform
	});
};

export const trackMovieTrailerWatched = async (
	movieId: string | number,
	trailerId: string | number
) => {
	await trackEvent("movie_trailer_watched", {
		movie_id: movieId,
		trailer_id: trailerId
	});
};

export const trackMovieCommented = async (
	movieId: string | number,
	commentId: string | number
) => {
	await trackEvent("movie_commented", {
		movie_id: movieId,
		comment_id: commentId
	});
};

export const trackMovieRatedWithComment = async (
	movieId: string | number,
	rating: number,
	commentId: string | number
) => {
	await trackEvent("movie_rated_with_comment", {
		movie_id: movieId,
		rating,
		comment_id: commentId
	});
};

export const trackMovieAddedToPlaylist = async (
	movieId: string | number,
	playlistId: string | number
) => {
	await trackEvent("movie_added_to_playlist", {
		movie_id: movieId,
		playlist_id: playlistId
	});
};

export const trackMovieRemovedFromPlaylist = async (
	movieId: string | number,
	playlistId: string | number
) => {
	await trackEvent("movie_removed_from_playlist", {
		movie_id: movieId,
		playlist_id: playlistId
	});
};

export const trackPlaylistCreated = async (playlistId: string | number) => {
	await trackEvent("playlist_created", {
		playlist_id: playlistId
	});
};

export const trackPlaylistDeleted = async (playlistId: string | number) => {
	await trackEvent("playlist_deleted", {
		playlist_id: playlistId
	});
};

export const trackPlaylistRenamed = async (
	playlistId: string | number,
	newName: string
) => {
	await trackEvent("playlist_renamed", {
		playlist_id: playlistId,
		new_name: newName
	});
};

export const trackPlaylistViewed = async (playlistId: string | number) => {
	await trackEvent("playlist_viewed", {
		playlist_id: playlistId
	});
};

export const trackPlaylistShared = async (
	playlistId: string | number,
	platform: string
) => {
	await trackEvent("playlist_shared", {
		playlist_id: playlistId,
		platform
	});
};

export const trackPlaylistMovieRemoved = async (
	playlistId: string | number,
	movieId: string | number
) => {
	await trackEvent("playlist_movie_removed", {
		playlist_id: playlistId,
		movie_id: movieId
	});
};

export const trackPlaylistMovieAdded = async (
	playlistId: string | number,
	movieId: string | number
) => {
	await trackEvent("playlist_movie_added", {
		playlist_id: playlistId,
		movie_id: movieId
	});
};

export const trackPlaylistMovieWatched = async (
	playlistId: string | number,
	movieId: string | number
) => {
	await trackEvent("playlist_movie_watched", {
		playlist_id: playlistId,
		movie_id: movieId
	});
};

export const trackPlaylistMovieRated = async (
	playlistId: string | number,
	movieId: string | number,
	rating: number
) => {
	await trackEvent("playlist_movie_rated", {
		playlist_id: playlistId,
		movie_id: movieId,
		rating
	});
};

export const trackPlaylistMovieCommented = async (
	playlistId: string | number,
	movieId: string | number,
	commentId: string | number
) => {
	await trackEvent("playlist_movie_commented", {
		playlist_id: playlistId,
		movie_id: movieId,
		comment_id: commentId
	});
};

export const trackPlaylistMovieRatedWithComment = async (
	playlistId: string | number,
	movieId: string | number,
	rating: number,
	commentId: string | number
) => {
	await trackEvent("playlist_movie_rated_with_comment", {
		playlist_id: playlistId,
		movie_id: movieId,
		rating,
		comment_id: commentId
	});
};

export const trackPlaylistMovieShared = async (
	playlistId: string | number,
	movieId: string | number,
	platform: string
) => {
	await trackEvent("playlist_movie_shared", {
		playlist_id: playlistId,
		movie_id: movieId,
		platform
	});
};
