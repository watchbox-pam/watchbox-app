import BackButton from "../components/BackButton";
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	TouchableOpacity,
	RefreshControl
} from "react-native";
import { fetchMovieDetails } from "../services/MovieDetailService";
import StyledText from "../components/StyledText";
import {
	deleteMediaFromPlaylist,
	getPlaylistById
} from "../services/PlaylistService";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownModifyPlaylist from "../components/DropDownModifyPlaylist";
import { ActivityIndicator } from "react-native-paper";
import styles from "@/src/styles/WatchListScreenStyle";
import { ErrorMessage } from "../components/ErrorMessage";

export default function Index() {
	const { id, movies }: { id: string; movies: any } = useLocalSearchParams();
	const stringifiedId = id ? String(id) : "";
	const parsedMovies = React.useMemo<{ id: number; [key: string]: any }[]>(
		() => (movies ? JSON.parse(movies) : []),
		[movies]
	);
	const [movieList, setMovieList] =
		useState<{ id: number; [key: string]: any }[]>(parsedMovies);
	const [playlistTitle, setPlaylistTitle] = useState(id);
	//const [editedTitle, setEditedTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);

	const restrictedNames = ["Watchlist", "Historique", "Favoris"];
	const normalizedPlaylistTitle = Array.isArray(playlistTitle)
		? playlistTitle[0]
		: playlistTitle;
	const shouldShowEditButton = !restrictedNames.includes(
		normalizedPlaylistTitle
	);
	const [loading, setLoading] = useState(false);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);
	const [error, setError] = useState(false);

	useEffect(() => {
		// Reset error state when refreshing or component remounts
		if (error && !refreshing) {
			// Don't reset error if we're refreshing - let the refresh handle that
			return;
		}

		setLoading(true);

		const fetchData = async () => {
			try {
				if (id) {
					const result = await getPlaylistById(stringifiedId);
					if (result.success) {
						setPlaylistTitle(result.data.title);
					} else {
						console.error(
							"Failed to fetch playlist title:",
							result.message
						);
						setError(true);
						return;
					}
				}
				if (parsedMovies.length > 0) {
					try {
						const detailedMovies = await Promise.all(
							parsedMovies.map(async (movie) => {
								try {
									const details = await fetchMovieDetails(
										movie.id
									);
									if (!details.success) {
										throw new Error(
											details.data ||
												"Failed to fetch movie details"
										);
									}
									return details.data;
								} catch (err) {
									console.error(
										`Error fetching details for movie ID ${movie.id}:`,
										err
									);
									// Show the error screen for any fetch failure
									setError(true);
									throw new Error(
										"Failed to fetch movie details"
									);
								}
							})
						);
						setMovieList(detailedMovies);
					} catch (mapError) {
						console.error("Error mapping movie details:", mapError);
						setError(true);
					}
				}
			} catch (error) {
				setError(true);
				console.error("Error fetching playlist data:", error);
			} finally {
				setLoading(false);
				// Always reset refreshing when data fetch completes
				if (refreshing) {
					setRefreshing(false);
				}
			}
		};

		fetchData();
	}, [parsedMovies, id, refreshing, stringifiedId, error]);

	const handleDeleteMedia = async (movieId: number) => {
		try {
			const result = await deleteMediaFromPlaylist(
				stringifiedId,
				movieId
			);
			if (result.success) {
				setMovieList((prevList) =>
					prevList.filter((movie) => movie.id !== movieId)
				);
			} else {
				console.error(
					"Failed to delete media from playlist:",
					result.message
				);
			}
		} catch (error) {
			setError(true);
			console.error("Error deleting media from playlist:", error);
		}
	};

	const handleRetry = () => {
		// Force the useEffect to run again by toggling error and refreshing
		console.log(
			"Retry button pressed, resetting error and triggering refresh"
		);
		setError(false);
		// Forcing a re-fetch by adding a timestamp to the URL
		// This is a workaround for network errors that might be cached
		setTimeout(() => {
			console.log("Setting refreshing state to true");
			setRefreshing(true);
		}, 500);
	};

	if (error) {
		return (
			<ErrorMessage
				message="Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer."
				onRetry={handleRetry}
			/>
		);
	}

	if (loading) {
		return (
			<View style={styles.loading} testID="loading">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			overScrollMode="never"
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<View style={styles.headers}>
				<BackButton />
				<Text style={styles.playlistName}>{playlistTitle}</Text>
				{shouldShowEditButton && (
					<DropDownModifyPlaylist
						playlistId={stringifiedId}
						initialTitle={normalizedPlaylistTitle}
						initialIsPrivate={isPrivate}
						onUpdate={({ title, is_private }) => {
							setPlaylistTitle(title);
							setIsPrivate(is_private);
						}}
					/>
				)}
			</View>

			{movieList !== null && movieList?.length > 0 ? (
				movieList.map((movie) => {
					return (
						<View key={movie.id} style={styles.viewResult}>
							<TouchableOpacity
								onPress={() =>
									router.push(
										`/(app)/(tabs)/movie/${movie.id}`
									)
								}
								style={styles.resultatInfo}>
								<Image
									source={{
										uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
									}}
									style={styles.image}
									resizeMode="cover"
								/>
								<View style={styles.resultInfo}>
									<Text
										style={styles.resultTitle}
										numberOfLines={3}>
										{movie.title}
									</Text>
									<Text style={styles.resultYear}>
										{movie.release_date
											? movie.release_date
													.toString()
													.split("-")[0]
											: "Date inconnue"}
									</Text>
								</View>
								<TouchableOpacity
									onPress={() => handleDeleteMedia(movie.id)}
									style={styles.deleteIconContainer}>
									<MaterialIcons
										name="delete"
										size={24}
										color="red"
										style={styles.deleteIcon}
									/>
								</TouchableOpacity>
							</TouchableOpacity>
							<View style={styles.separator}></View>
						</View>
					);
				})
			) : (
				<StyledText style={styles.NoResult}>Aucun résultat</StyledText>
			)}
		</ScrollView>
	);
}
