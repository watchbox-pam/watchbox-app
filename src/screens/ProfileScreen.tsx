import React, { useEffect, useState } from "react";
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Image,
	Modal,
	TextInput,
	Button
} from "react-native";
import StyledText from "../components/StyledText";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import DropDownButton from "../components/DropDownButton";
import TraitGradiant from "../components/TraitGradiant";
import Stats from "../components/Stats";
import { TouchableOpacity } from "react-native";
import CarouselWatchList from "../components/CarouselWatchList";
import { getUserProfile } from "../services/ProfileService";
import useSessionStore from "../zustand/sessionStore";
import Playlist from "../models/Playlist";
import {
	createPlaylist,
	getMovieRuntime,
	getUserPlaylists
} from "@/src/services/PlaylistService";

export default function Index() {
	const [modalVisible, setModalVisible] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [totalMovies, setTotalMovies] = useState(0);
	const [totalRuntime, setTotalRuntime] = useState(0);

	const { id } = useLocalSearchParams();
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const currentUser = useSessionStore((state) => state.user);
	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

	const handleCreateWatchlist = () => {
		setModalVisible(true);
	};

	const handleSavePlaylist = async () => {
		const userId = id || (currentUser && currentUser.id);
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
			await fetchUserPlaylists(userId);
		} else {
			alert(
				result.message ||
					"An error occurred while creating the playlist."
			);
		}
	};

	useEffect(() => {
		const userId = id || (currentUser && currentUser.id);
		if (userId && typeof userId === "string") {
			fetchProfileData(userId);
			fetchUserPlaylists(userId);
		} else {
			setError("ID utilisateur invalide" as any);
			setLoading(false);
		}
	}, [id, currentUser]);

	useEffect(() => {
		const userId = id || (currentUser && currentUser.id);
		if (userId && typeof userId === "string" && userPlaylists.length > 0) {
			const historique = userPlaylists.find(
				(p) => p.title === "Historique"
			);
			if (historique) {
				getMovieRuntime(userId, historique.title).then((result) => {
					if (result.success && result.data) {
						setTotalMovies(result.data.movie_count);
						setTotalRuntime(result.data.total_runtime);
					}
				});
			}
		}
	}, [userPlaylists, id, currentUser]);

	const fetchProfileData = async (userId: string) => {
		setLoading(true);
		setError(null);

		try {
			const response = await getUserProfile(userId);
			if (response.success) {
				setProfileData(response.data);
			} else {
				setError(
					response.message ||
						"Erreur lors de la récupération du profil"
				);
				console.error(
					"Erreur lors de la récupération du profil:",
					response.message
				);
			}
		} catch (error) {
			setError(error.message || "Une erreur est survenue");
		} finally {
			setLoading(false);
		}
	};

	const fetchUserPlaylists = async (userId: string) => {
		const response = await getUserPlaylists(userId);
		if (response.success) {
			setUserPlaylists(response.data);
		} else {
			console.error("Error fetching user playlists:", response.message);
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
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
					<Text style={styles.title}>
						{loading
							? "Chargement..."
							: profileData?.username || "Utilisateur inconnu"}
					</Text>
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
				{userPlaylists.length > 0 ? (
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 0
	},
	contentContainer: {
		alignItems: "center",
		paddingVertical: 20
	},
	errorContainer: {
		padding: 15,
		backgroundColor: "rgba(255, 0, 0, 0.1)",
		borderRadius: 8,
		marginVertical: 10,
		width: "90%",
		alignItems: "center"
	},
	errorText: {
		color: "#ffffff",
		fontWeight: "bold",
		textAlign: "center"
	},
	imageBannerContainer: {
		width: "100%",
		aspectRatio: 16 / 9
	},
	imageBanner: {
		width: "100%",
		height: "100%"
	},
	imagePosterContainer: {
		flexDirection: "row",
		width: "70%",
		marginRight: 20
	},
	ProfilPicture: {
		width: 100,
		height: 100,
		borderRadius: 100,
		borderWidth: 3,
		borderColor: "#ffffff",
		zIndex: 1
	},
	title: {
		fontSize: 30,
		color: "#ffffff",
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		width: "90%"
	},
	text: {
		fontSize: 15
	},
	textBold: {
		fontWeight: "bold"
	},
	description: {
		fontSize: 20,
		paddingRight: 20,
		paddingLeft: 20,
		marginBottom: 20,
		zIndex: -1
	},
	Trait: {
		marginTop: 20,
		marginBottom: 20
	},
	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingRight: 20,
		paddingLeft: 20,
		top: -20
	},
	infoDiv: {
		flexDirection: "column",
		alignSelf: "flex-end"
	},
	tagContainer: {
		marginBottom: -10
	},
	textTag: {
		fontSize: 10
	},
	WatchList: {
		width: 350,
		marginBottom: 10,
		zIndex: -10
	},
	TitleWatchList: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		marginLeft: 10
	},
	shadowBottom: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "60%",
		transform: [{ rotate: "180deg" }],
		zIndex: 1
	},
	watchListHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10
	},
	createWatchlistButton: {
		backgroundColor: "#1E90FF",
		padding: 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		width: 30,
		height: 30,
		zIndex: -1
	},
	createWatchlistButtonText: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 22,
		zIndex: -1
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#0A1E38",
		borderRadius: 10,
		padding: 20,
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 20,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 20
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		color: "#fff"
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 10
	},
	checkboxChecked: {
		backgroundColor: "#1E90FF"
	},
	checkboxLabel: {
		fontSize: 16,
		color: "#fff"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	playlistItem: {
		backgroundColor: "#1E90FF",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10
	},
	playlistTitle: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold"
	},
	playlistPrivacy: {
		color: "#ffffff",
		fontSize: 14
	},
	noPlaylistsText: {
		color: "#ffffff",
		fontSize: 16,
		textAlign: "center"
	}
});
