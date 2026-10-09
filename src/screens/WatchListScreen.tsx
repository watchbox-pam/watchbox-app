import BackButton from "../components/BackButton";
import { useLocalSearchParams, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Image,
	Text,
	FlatList,
	TouchableOpacity,
	RefreshControl
} from "react-native";
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
import useSessionStore from "@/src/zustand/sessionStore";
import { endScreenTracking, startScreenTracking } from "../services/analytics";

type MovieItem = {
	id: number;
	image: string | null;
	title: string | null;
	release_date: string | null;
};

export default function Index() {
	const { id }: { id: string } = useLocalSearchParams();
	const stringifiedId = id ? String(id) : "";

	const [movieList, setMovieList] = useState<MovieItem[]>([]);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState(false);
	const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

	const restrictedNames = ["A Regarder", "Historique", "Favoris"];
	const shouldShowEditButton = !restrictedNames.includes(playlistTitle);
	const currentUser = useSessionStore((state: any) => state.user);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	useEffect(() => {
		startScreenTracking("WatchList");

		return () => {
			endScreenTracking();
		};
	}, []);

	const fetchData = useCallback(async () => {
		if (error && !refreshing) return;
		try {
			const [playlistResult, mediaResult] = await Promise.all([
				getPlaylistById(stringifiedId),
				getMediaInPlaylist(stringifiedId)
			]);

			if (playlistResult.success) {
				setPlaylistTitle(playlistResult.data.title);
				if (playlistResult.data.user_id == currentUser.id) {
					setIsCurrentUser(true);
				}
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
	}, [stringifiedId, refreshing, error, currentUser]);

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, [fetchData])
	);

	const handleDeleteMedia = async (movieId: number) => {
		try {
			const result = await deleteMediaFromPlaylist(
				stringifiedId,
				movieId
			);
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

	const renderMovie = ({ item }: { item: MovieItem }) => (
		<View style={styles.viewResult}>
			<TouchableOpacity
				onPress={() => router.push(`/(app)/(tabs)/movie/${item.id}`)}
				style={styles.resultatInfo}
				activeOpacity={0.7}>
				{item.image != null ? (
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500${item.image}`
						}}
						style={styles.image}
						resizeMode="cover"
					/>
				) : (
					<View style={styles.image} />
				)}
				<View style={styles.resultInfo}>
					<Text style={styles.resultTitle} numberOfLines={3}>
						{item.title}
					</Text>
					<Text style={styles.resultYear}>
						{item.release_date?.toString().split("-")[0] ??
							"Date inconnue"}
					</Text>
				</View>
				{isCurrentUser && (
					<TouchableOpacity
						onPress={() => handleDeleteMedia(item.id)}
						style={styles.deleteIconContainer}>
						<MaterialIcons
							name="delete"
							size={20}
							color="#e05a5a"
						/>
					</TouchableOpacity>
				)}
			</TouchableOpacity>
		</View>
	);

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
		<View style={styles.container}>
			<FlatList
				data={movieList}
				keyExtractor={(item) => String(item.id)}
				renderItem={renderMovie}
				contentContainerStyle={styles.contentContainer}
				overScrollMode="never"
				initialNumToRender={8}
				maxToRenderPerBatch={10}
				windowSize={7}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#1E90FF"
					/>
				}
				ListEmptyComponent={
					<Text style={styles.NoResult}>
						Aucun film dans cette playlist
					</Text>
				}
			/>

			{/* Header en overlay absolu (hors FlatList) */}
			<View style={styles.headers}>
				<BackButton />
				<Text style={styles.playlistName} numberOfLines={1}>
					{playlistTitle}
				</Text>
				{shouldShowEditButton && isCurrentUser ? (
					<DropDownModifyPlaylist
						playlistId={stringifiedId}
						initialTitle={playlistTitle}
						initialIsPrivate={isPrivate}
						onUpdate={({ title, is_private }) => {
							setPlaylistTitle(title);
							setIsPrivate(is_private);
						}}
					/>
				) : (
					<View style={{ width: 44 }} /> // spacer pour centrer le titre
				)}
			</View>
		</View>
	);
}
