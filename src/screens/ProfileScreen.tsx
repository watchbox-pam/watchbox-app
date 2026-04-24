import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
	ScrollView,
	View,
	Text,
	Image,
	Modal,
	TextInput,
	RefreshControl,
	TouchableOpacity,
	Pressable,
	Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

import styles from "../styles/ProfileScreenStyle";
import CarouselWatchList from "../components/CarouselWatchList";
import DropDownButton from "../components/DropDownButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { getUserProfile } from "../services/ProfileService";
import {
	createPlaylist,
	getMovieRuntime,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import useSessionStore from "../zustand/sessionStore";
import Playlist from "../models/Playlist";

// Adapté depuis l'ancien composant Stats
function formatRuntime(totalMinutes: number): string {
	if (!totalMinutes) return "0min";
	const h = Math.floor(totalMinutes / 60);
	const months = Math.floor(h / 720);
	const days = Math.floor((h % 720) / 24);
	const hours = h % 24;
	const mins = totalMinutes % 60;
	const parts: string[] = [];
	if (months > 0) parts.push(`${months}m`);
	if (days > 0) parts.push(`${days}j`);
	if (hours > 0) parts.push(`${hours}h`);
	if (mins > 0) parts.push(`${mins}min`);
	return parts.join(" ") || "0min";
}

interface UserProfile {
	username: string;
	[key: string]: any;
}

function useSlideIn(visible: boolean) {
	const translateY = useRef(new Animated.Value(500)).current;
	useEffect(() => {
		Animated.spring(translateY, {
			toValue: visible ? 0 : 500,
			useNativeDriver: true,
			bounciness: 0,
			speed: 20
		}).start();
	}, [visible]);
	return translateY;
}

export default function ProfileScreen() {
	const [modalVisible, setModalVisible] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [totalMovies, setTotalMovies] = useState(0);
	//const [totalShows, setTotalShows] = useState(0);
	const [totalRuntime, setTotalRuntime] = useState(0);
	const [profileData, setProfileData] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [newUsername, setNewUsername] = useState("");
	const playlistSlide = useSlideIn(modalVisible);
	const editSlide = useSlideIn(editModalVisible);

	const currentUser = useSessionStore((state: any) => state.user);

	useEffect(() => {
		setLoading(true);
		const userId = currentUser?.id;
		if (userId && typeof userId === "string") fetchData(userId);
		else {
			setError(true);
			setLoading(false);
		}
		if (refreshing) setRefreshing(false);
	}, [currentUser, refreshing]);

	const fetchStats = useCallback(() => {
		const userId = currentUser?.id;
		if (!userId) return;
		getUserPlaylists(userId).then((res) => {
			if (!res.success || !Array.isArray(res.data)) return;
			const hist = res.data.find(
				(p: Playlist) => p.title === "Historique"
			);
			if (!hist) return;
			getMovieRuntime(hist.id).then((r) => {
				if (r.success && r.data) {
					setTotalMovies(r.data.movie_count);
					//setTotalShows(r.data.show_count);
					setTotalRuntime(r.data.total_runtime);
				}
			});
		});
	}, [currentUser]);

	useFocusEffect(fetchStats);

	const fetchData = async (userId: string) => {
		try {
			const [profileRes, playlistRes] = await Promise.allSettled([
				getUserProfile(userId),
				getUserPlaylists(userId)
			]);
			if (profileRes.status === "fulfilled" && profileRes.value.success)
				setProfileData(profileRes.value.data);
			if (playlistRes.status === "fulfilled" && playlistRes.value.success)
				setUserPlaylists(playlistRes.value.data ?? []);
			else setUserPlaylists([]);
		} catch {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const handleSavePlaylist = async () => {
		const userId = currentUser?.id;
		if (!userId) return;
		const result = await createPlaylist({
			id: "",
			user_id: userId,
			title: playlistTitle,
			is_private: isPrivate,
			created_at: new Date()
		});
		if (result.success) {
			Toast.show({ type: "success", text1: "Playlist créée !" });
			setModalVisible(false);
			setPlaylistTitle("");
			setIsPrivate(false);
			fetchData(userId);
		} else {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: result.message
			});
		}
	};

	const historyPlaylist = userPlaylists.find((p) => p.title === "Historique");
	const otherPlaylists = userPlaylists.filter(
		(p) => p.title !== "Historique"
	);

	if (error) return <ErrorMessage />;
	if (loading)
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#1E90FF" />
			</View>
		);

	return (
		<>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => setRefreshing(true)}
						tintColor="#1E90FF"
					/>
				}>
				{/* Banner */}
				<View style={styles.bannerContainer}>
					<Image
						source={require("../assets/images/banniere default.png")}
						style={styles.bannerImage}
					/>
					<LinearGradient
						colors={["rgba(7,25,46,0.55)", "transparent"]}
						style={styles.bannerGradientTop}
					/>
					<LinearGradient
						colors={["transparent", "#07192e"]}
						style={styles.bannerGradient}
					/>
				</View>

				{/* Profile header */}
				<View style={styles.profileSection}>
					<View style={styles.avatarRow}>
						<Image
							source={require("../assets/images/default-user.png")}
							style={styles.avatar}
						/>
						<View style={styles.avatarActions}>
							<TouchableOpacity
								style={styles.btnEdit}
								onPress={() => {
									setNewUsername(profileData?.username ?? "");
									setEditModalVisible(true);
								}}>
								<Text style={styles.btnEditText}>Modifier</Text>
							</TouchableOpacity>
							<DropDownButton />
						</View>
					</View>

					<Text style={styles.username}>
						{profileData?.username ?? "—"}
					</Text>
					<Text style={styles.handle}>
						@{profileData?.username?.toLowerCase() ?? "—"}
					</Text>
					<Text style={styles.handle}>
						{"Membre depuis " +
							new Date(
								profileData?.created_at ?? ""
							).getFullYear()}{" "}
					</Text>
				</View>

				{/* Stats */}
				<View style={styles.statsRow}>
					{/* <TouchableOpacity style={styles.statItem}>
						<Text style={styles.statNum}>{follower}142</Text>
						<Text style={styles.statLabel}>Abonnés</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.statItem}>
						<Text style={styles.statNum}>{follow}89</Text>
						<Text style={styles.statLabel}>Abonnements</Text>
					</TouchableOpacity> */}
					<View style={styles.statItem}>
						<Text style={styles.statNum}>{totalMovies}</Text>
						<Text style={styles.statLabel}>Films</Text>
					</View>
					{/* <View style={styles.statItem}>
						<Text style={styles.statNum}>{totalShows}</Text>
						<Text style={styles.statLabel}>Séries</Text>
					</View> */}
					<View style={[styles.statItem, { borderRightWidth: 0 }]}>
						<Text
							style={styles.statNum}
							numberOfLines={1}
							adjustsFontSizeToFit>
							{formatRuntime(totalRuntime)}
						</Text>
						<Text style={styles.statLabel}>Visionnés</Text>
					</View>
				</View>

				{/* Playlists */}
				<View style={styles.section}>
					{/* Historique */}

					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Mes Playlists</Text>
						<TouchableOpacity
							style={styles.btnAdd}
							onPress={() => setModalVisible(true)}>
							<Text style={styles.btnAddText}>+</Text>
						</TouchableOpacity>
					</View>

					{historyPlaylist && (
						<View>
							<View style={styles.playlistCard}>
								<View style={styles.playlistInfo}>
									<Text style={styles.playlistName}>
										Historique
									</Text>
									<Text style={styles.playlistMeta}>
										{totalMovies} film
										{totalMovies !== 1 ? "s" : ""} ·{" "}
										{formatRuntime(totalRuntime)}
									</Text>
								</View>
								<View style={styles.badge}>
									<Text style={styles.badgeText}>
										Publique
									</Text>
								</View>
							</View>
							<CarouselWatchList
								providers={historyPlaylist}
								showDivider={false}
							/>
						</View>
					)}

					{/* Autres playlists */}
					{otherPlaylists.length > 0 ? (
						otherPlaylists.map((p, i) => (
							<View key={p.id}>
								<View style={styles.playlistCard}>
									<View style={styles.playlistInfo}>
										<Text style={styles.playlistName}>
											{p.title}
										</Text>
									</View>
									{p.is_private ? (
										<View style={styles.badgePrivate}>
											<Text
												style={styles.badgePrivateText}>
												Privée
											</Text>
										</View>
									) : (
										<View style={styles.badge}>
											<Text style={styles.badgeText}>
												Publique
											</Text>
										</View>
									)}
								</View>
								<CarouselWatchList
									providers={p}
									showDivider={false}
								/>
							</View>
						))
					) : (
						<Text style={styles.emptyPlaylists}>
							Aucune playlist créée
						</Text>
					)}
				</View>
			</ScrollView>

			{/* Modal bottom sheet */}
			<Modal
				animationType="fade"
				transparent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setModalVisible(false)}>
					<Animated.View
						style={{ transform: [{ translateY: playlistSlide }] }}>
						<Pressable
							onPress={(e) => e.stopPropagation()}
							style={styles.modalSheet}>
							<View style={styles.modalHandle} />
							<Text style={styles.modalTitle}>
								Nouvelle playlist
							</Text>
							<TextInput
								style={styles.input}
								placeholder="Titre de la playlist"
								placeholderTextColor="rgba(255,255,255,0.25)"
								value={playlistTitle}
								onChangeText={setPlaylistTitle}
								autoFocus
							/>
							<Pressable
								style={styles.checkboxRow}
								onPress={() => setIsPrivate(!isPrivate)}>
								<View
									style={[
										styles.checkbox,
										isPrivate && styles.checkboxChecked
									]}
								/>
								<Text style={styles.checkboxLabel}>
									Rendre cette playlist privée
								</Text>
							</Pressable>
							<View style={styles.modalButtons}>
								<Pressable
									style={styles.btnCancel}
									onPress={() => setModalVisible(false)}>
									<Text style={styles.btnCancelText}>
										Annuler
									</Text>
								</Pressable>
								<Pressable
									style={styles.btnConfirm}
									onPress={handleSavePlaylist}>
									<Text style={styles.btnConfirmText}>
										Créer
									</Text>
								</Pressable>
							</View>
						</Pressable>
					</Animated.View>
				</Pressable>
			</Modal>
			<Modal
				animationType="fade"
				transparent
				visible={editModalVisible}
				onRequestClose={() => setEditModalVisible(false)}>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setEditModalVisible(false)}>
					<Animated.View
						style={{ transform: [{ translateY: editSlide }] }}>
						<Pressable
							onPress={(e) => e.stopPropagation()}
							style={styles.modalSheet}>
							<View style={styles.modalHandle} />
							<Text style={styles.modalTitle}>
								Modifier le profil
							</Text>

							{/* Bannière */}
							<Text style={styles.editSectionLabel}>
								Bannière
							</Text>
							<Pressable style={styles.editMediaButton}>
								<Text style={styles.editMediaText}>
									Changer la bannière
								</Text>
								<Text style={styles.editMediaArrow}>›</Text>
							</Pressable>

							{/* Photo de profil */}
							<Text style={styles.editSectionLabel}>
								Photo de profil
							</Text>
							<Pressable style={styles.editMediaButton}>
								<Text style={styles.editMediaText}>
									Changer la photo
								</Text>
								<Text style={styles.editMediaArrow}>›</Text>
							</Pressable>

							{/* Pseudo */}
							<Text style={styles.editSectionLabel}>Pseudo</Text>
							<TextInput
								style={styles.input}
								placeholder="Nouveau pseudo"
								placeholderTextColor="rgba(255,255,255,0.25)"
								value={newUsername}
								onChangeText={setNewUsername}
							/>

							<View style={styles.modalButtons}>
								<Pressable
									style={styles.btnCancel}
									onPress={() => setEditModalVisible(false)}>
									<Text style={styles.btnCancelText}>
										Annuler
									</Text>
								</Pressable>
								<Pressable
									style={styles.btnConfirm}
									onPress={() => {
										// TODO: appel service update profil
										setEditModalVisible(false);
									}}>
									<Text style={styles.btnConfirmText}>
										Enregistrer
									</Text>
								</Pressable>
							</View>
						</Pressable>
					</Animated.View>
				</Pressable>
			</Modal>
		</>
	);
}
