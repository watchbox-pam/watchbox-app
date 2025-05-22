import BackButton from "../components/BackButton";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import styles from "../styles/WatchListScreenStyle";
import {
	View,
	StyleSheet,
	Image,
	Text,
	ScrollView,
	TouchableOpacity
} from "react-native";
import { fetchMovieDetails } from "../services/MovieDetailService";
import StyledText from "../components/StyledText";
import {
	deleteMediaFromPlaylist,
	getPlaylistById
} from "../services/PlaylistService";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownModifyPlaylist from "../components/DropDownModifyPlaylist";
import styles from "@/src/styles/WatchListScreenStyle";

export default function Index() {
	const { id, movies } = useLocalSearchParams();
	const stringifiedId = id ? String(id) : "";
	const parsedMovies = React.useMemo<{ id: number; [key: string]: any }[]>(
		() => (movies ? JSON.parse(movies) : []),
		[movies]
	);
	const [movieList, setMovieList] =
		useState<{ id: number; [key: string]: any }[]>(parsedMovies);
	const [playlistTitle, setPlaylistTitle] = useState(id);
	const [editedTitle, setEditedTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);

	const restrictedNames = ["Watchlist", "Historique", "Favoris"];
	const normalizedPlaylistTitle = Array.isArray(playlistTitle)
		? playlistTitle[0]
		: playlistTitle;
	const shouldShowEditButton = !restrictedNames.includes(
		normalizedPlaylistTitle
	);

	useEffect(() => {
		if (playlistTitle)
			setEditedTitle(
				Array.isArray(playlistTitle) ? playlistTitle[0] : playlistTitle
			);
	}, [playlistTitle]);

	useEffect(() => {
		const fetchMovies = async () => {
			if (parsedMovies.length > 0) {
				const detailedMovies = await Promise.all(
					parsedMovies.map(async (movie) => {
						const details = await fetchMovieDetails(movie.id);
						return details.data;
					})
				);
				setMovieList(detailedMovies);
			}
		};
		fetchMovies();
	}, [parsedMovies]);

	useEffect(() => {
		const fetchPlaylistTitle = async () => {
			if (id) {
				const result = await getPlaylistById(stringifiedId);
				if (result.success) {
					setPlaylistTitle(result.data.title);
				} else {
					console.error(
						"Failed to fetch playlist title:",
						result.message
					);
				}
			}
		};
		fetchPlaylistTitle();
	}, [id]);

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
			console.error("Error deleting media from playlist:", error);
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			overScrollMode="never">
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
									router.push(`/movie/${movie.id}`)
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
