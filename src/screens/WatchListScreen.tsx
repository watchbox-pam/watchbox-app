import BackButton from "../components/BackButton";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
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

const styles = StyleSheet.create({
	headers: {
		position: "absolute",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		marginTop: 10,
		zIndex: 100,
		alignItems: "center",
		paddingVertical: 10
	},
	editButton: {
		top: -10
	},
	editButton: {
		top: -10
	},
	container: {
		width: "100%",
		backgroundColor: "#0A1E38",
		margin: 0
	},
	contentContainer: {
		alignItems: "center",
		paddingVertical: 90
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25
	},
	viewResult: {
		height: 175
	},
	resultatInfo: {
		flexDirection: "row",
		paddingHorizontal: 10,
		width: "100%"
	},
	image: {
		width: 90,
		height: 130,
		borderRadius: 10,
		backgroundColor: "#313131"
	},
	resultInfo: {
		width: "60%",
		marginLeft: 10
	},
	resultTitle: {
		color: "#EBDDFF",
		fontWeight: "bold",
		fontSize: 20,
		marginTop: 10
	},
	resultYear: {
		color: "#fff",
		fontSize: 14
	},
	separator: {
		width: "95%",
		height: 1,
		backgroundColor: "#EBDDFF",
		position: "absolute",
		bottom: 20
	},
	NoResult: {
		margin: "auto",
		height: "100%",
		fontSize: 30
	},
	playlistName: {
		color: "#FFFFFF",
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 30,
		marginLeft: 10
		marginBottom: 30,
		marginLeft: 10
	},
	deleteIconContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10
	},
	deleteIcon: {
		marginLeft: 10,
		alignSelf: "center"
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
	},

	modalContent: {
		backgroundColor: "#0A1E38",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center"
	},

	modalTitle: {
		fontSize: 18,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 15
	},

	input: {
		backgroundColor: "#1E2D4F",
		color: "#FFFFFF",
		width: "100%",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5
	},

	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20
	},

	switchLabel: {
		color: "#FFFFFF",
		fontSize: 16
	},

	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
	},

	modalContent: {
		backgroundColor: "#0A1E38",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center"
	},

	modalTitle: {
		fontSize: 18,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 15
	},

	input: {
		backgroundColor: "#1E2D4F",
		color: "#FFFFFF",
		width: "100%",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5
	},

	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20
	},

	switchLabel: {
		color: "#FFFFFF",
		fontSize: 16
	},

	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});
