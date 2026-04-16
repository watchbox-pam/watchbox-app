import React, { useCallback, useEffect, useState } from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	Modal,
	TextInput,
	Button,
	RefreshControl,
	TouchableOpacity
} from "react-native";
import styles from "../styles/ProfileScreenStyle";
import { LinearGradient } from "expo-linear-gradient";
import DropDownButton from "../components/DropDownButton";
import TraitGradiant from "../components/TraitGradiant";
import Stats from "../components/Stats";
import CarouselWatchList from "../components/CarouselWatchList";
import { getUserProfile } from "../services/ProfileService";
import useSessionStore from "../zustand/sessionStore";
import Playlist from "../models/Playlist";
import {
	createPlaylist,
	getMovieRuntime,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import { ActivityIndicator } from "react-native-paper";
import { ErrorMessage } from "../components/ErrorMessage";

interface UserProfile {
	username: string;
	[key: string]: any;
}

export default function Index() {
	const [modalVisible, setModalVisible] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [totalMovies, setTotalMovies] = useState(0);
	const [totalRuntime, setTotalRuntime] = useState(0);

	const [profileData, setProfileData] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const currentUser = useSessionStore((state: any) => state.user);
	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	const handleCreateWatchlist = () => {
		setModalVisible(true);
	};

	const handleSavePlaylist = async () => {
		const userId = currentUser && currentUser.id;
		if (!userId) {
			alert("User is not logged in.");
			return;
		}

		const playlistToInsert: Playlist = {
			id: "",
			user_id: userId,
			title: playlistTitle,
			is_private: isPrivate,
			created_at: new Date()
		};

		const result = await createPlaylist(playlistToInsert);

		if (result.success) {
			alert(result.message || "Playlist created successfully!");
			setModalVisible(false);
			setPlaylistTitle("");
			setIsPrivate(false);
			await fetchData(userId);
		} else {
			alert(
				result.message ||
					"An error occurred while creating the playlist."
			);
		}
	};

	useEffect(() => {
		setLoading(true);

		const userId = currentUser && currentUser.id;
		if (userId && typeof userId === "string") {
			fetchData(userId);
		} else {
			setError(true);
			setLoading(false);
		}
		if (refreshing) {
			setRefreshing(false);
		}
	}, [currentUser, refreshing]);

	useEffect(() => {
		const userId = currentUser && currentUser.id;
		if (
			userId &&
			typeof userId === "string" &&
			Array.isArray(userPlaylists) &&
			userPlaylists.length > 0
		) {
			try {
				const historique = userPlaylists.find(
					(p) => p.title === "Historique"
				);
				if (historique) {
					console.log("historique id", historique.id);
					getMovieRuntime(historique.id)
						.then((result) => {
							if (result.success && result.data) {
								setTotalMovies(result.data.movie_count);
								setTotalRuntime(result.data.total_runtime);
							}
						})
						.catch((error) => {
							console.error(
								"Erreur lors de la récupération du runtime:",
								error
							);
						});
				}
			} catch (error) {
				console.error(
					"Erreur lors du traitement des playlists:",
					error
				);
			}
		}
	}, [userPlaylists, currentUser]);

	const fetchData = async (userId: string) => {
		try {
			// Récupération du profil utilisateur
			try {
				const response = await getUserProfile(userId);
				if (response.success) {
					setProfileData(response.data);
				} else {
					console.error(
						"Erreur lors de la récupération du profil:",
						response.message
					);
				}
			} catch (profileError) {
				console.error(
					"Erreur lors de la récupération du profil:",
					profileError
				);
				// Ne pas définir error=true ici pour permettre l'affichage partiel
			}

			// Récupération des playlists utilisateur
			try {
				const response2 = await getUserPlaylists(userId);
				if (response2.success && response2.data) {
					setUserPlaylists(response2.data);
				} else {
					console.error(
						"Erreur lors de la récupération des playlists:",
						response2?.message
					);
					// S'assurer que userPlaylists est toujours un tableau vide en cas d'échec
					setUserPlaylists([]);
				}
			} catch (playlistError) {
				console.error(
					"Erreur lors de la récupération des playlists:",
					playlistError
				);
				// S'assurer que userPlaylists est toujours un tableau vide en cas d'erreur réseau
				setUserPlaylists([]);
			}
		} catch (error) {
			console.error("Erreur générale:", error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	if (error) {
		return <ErrorMessage />;
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
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Créer un playlist</Text>
						<TextInput
							style={styles.input}
							placeholder="Titre de la playlist"
							placeholderTextColor="#ccc"
							value={playlistTitle}
							onChangeText={setPlaylistTitle}
						/>
						<View style={styles.checkboxContainer}>
							<TouchableOpacity
								style={[
									styles.checkbox,
									isPrivate && styles.checkboxChecked
								]}
								onPress={() => setIsPrivate(!isPrivate)}
							/>
							<Text style={styles.checkboxLabel}>Privée</Text>
						</View>
						<View style={styles.modalButtons}>
							<Button
								title="Annuler"
								onPress={() => setModalVisible(false)}
							/>
							<Button
								title="Ajouter"
								onPress={handleSavePlaylist}
							/>
						</View>
					</View>
				</View>
			</Modal>

			<View style={styles.imageBannerContainer}>
				<LinearGradient
					colors={["#0A1E38", "transparent"]}
					style={styles.shadowBottom}
				/>
				<Image
					source={require("../assets/images/banniere default.png")}
					style={styles.imageBanner}
				/>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.imagePosterContainer}>
					<Image
						source={require("../assets/images/default-user.png")}
						style={styles.ProfilPicture}
					/>
					<Text style={styles.title}>{profileData?.username}</Text>
				</View>
				<DropDownButton />
			</View>

			<TraitGradiant />

			<View style={styles.WatchList}>
				<View style={styles.watchListHeader}>
					<Text style={styles.TitleWatchList}>Mes Playlists</Text>
					<TouchableOpacity
						style={styles.createWatchlistButton}
						onPress={handleCreateWatchlist}>
						<Text style={styles.createWatchlistButtonText}>+</Text>
					</TouchableOpacity>
				</View>
				{Array.isArray(userPlaylists) && userPlaylists.length > 0 ? (
					userPlaylists.map((playlist) => (
						<View key={playlist.id} style={styles.WatchList}>
							<View style={styles.watchListHeader}>
								<Text style={styles.TitleWatchList}>
									{playlist.title}
								</Text>
							</View>
							<CarouselWatchList providers={playlist} />
						</View>
					))
				) : (
					<Text style={styles.noPlaylistsText}>
						Aucune playlist disponible
					</Text>
				)}
			</View>

			<Stats totalMovies={totalMovies} total_runtime={totalRuntime} />
		</ScrollView>
	);
}
