import BackButton from "../components/BackButton";
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Image,
	Text,
	FlatList,
	TouchableOpacity,
	RefreshControl
} from "react-native";
import StyledText from "../components/StyledText";
import {
	deleteMediaFromPlaylist,
	getMediaInPlaylist,
	getPlaylistById
} from "../services/PlaylistService";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownModifyPlaylist from "../components/DropDownModifyPlaylist";
import { ActivityIndicator } from "react-native-paper";
import styles from "@/src/styles/WatchListScreenStyle";
import { ErrorMessage } from "../components/ErrorMessage";

type MovieItem = { id: number; image: string | null; title: string | null; release_date: string | null };

export default function Index() {
	const { id }: { id: string } = useLocalSearchParams();
	const stringifiedId = id ? String(id) : "";

	const [movieList, setMovieList] = useState<MovieItem[]>([]);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState(false);

	const restrictedNames = ["Watchlist", "Historique", "Favoris"];
	const shouldShowEditButton = !restrictedNames.includes(playlistTitle);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	useEffect(() => {
		if (error && !refreshing) return;

		setLoading(true);

		const fetchData = async () => {
			try {
				const [playlistResult, mediaResult] = await Promise.all([
					getPlaylistById(stringifiedId),
					getMediaInPlaylist(stringifiedId),
				]);

				if (playlistResult.success) {
					setPlaylistTitle(playlistResult.data.title);
				} else {
					setError(true);
					return;
				}

				if (mediaResult.success) {
					setMovieList(mediaResult.data as MovieItem[]);
				} else {
					setError(true);
				}
			} catch {
				setError(true);
			} finally {
				setLoading(false);
				if (refreshing) setRefreshing(false);
			}
		};

		fetchData();
	}, [stringifiedId, refreshing, error]);

	const handleDeleteMedia = async (movieId: number) => {
		try {
			const result = await deleteMediaFromPlaylist(stringifiedId, movieId);
			if (result.success) {
				setMovieList((prev) => prev.filter((m) => m.id !== movieId));
			}
		} catch {
			setError(true);
		}
	};

	const handleRetry = () => {
		setError(false);
		setTimeout(() => setRefreshing(true), 500);
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
		<View style={{ flex: 1 }}>
			<FlatList
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				overScrollMode="never"
				data={movieList}
				keyExtractor={(item) => String(item.id)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListEmptyComponent={
					<StyledText style={styles.NoResult}>Aucun résultat</StyledText>
				}
				renderItem={({ item: movie }) => (
					<View style={styles.viewResult}>
						<TouchableOpacity
							onPress={() => router.push(`/(app)/(tabs)/movie/${movie.id}`)}
							style={styles.resultatInfo}>
							{movie.image != null ? (
								<Image
									source={{ uri: `https://image.tmdb.org/t/p/w500${movie.image}` }}
									style={styles.image}
									resizeMode="cover"
								/>
							) : (
								<View style={styles.image} />
							)}
							<View style={styles.resultInfo}>
								<Text style={styles.resultTitle} numberOfLines={3}>
									{movie.title}
								</Text>
								<Text style={styles.resultYear}>
									{movie.release_date ? movie.release_date.toString().split("-")[0] : ""}
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
						<View style={styles.separator} />
					</View>
				)}
			/>
			<View style={styles.headers}>
				<BackButton />
				<Text style={styles.playlistName}>{playlistTitle}</Text>
				{shouldShowEditButton && (
					<DropDownModifyPlaylist
						playlistId={stringifiedId}
						initialTitle={playlistTitle}
						initialIsPrivate={isPrivate}
						onUpdate={({ title, is_private }) => {
							setPlaylistTitle(title);
							setIsPrivate(is_private);
						}}
					/>
				)}
			</View>
		</View>
	);
}
