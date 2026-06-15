import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, View, Text, Image, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native-paper";

import styles from "../styles/ProfileScreenStyle";
import CarouselWatchList from "../components/CarouselWatchList";
import { ErrorMessage } from "../components/ErrorMessage";
import { getUserProfile } from "../services/ProfileService";
import {
	getMovieRuntime,
	getUserPlaylists
} from "@/src/services/PlaylistService";

import Playlist from "../models/Playlist";
import { useLocalSearchParams } from "expo-router";

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

export default function UserScreen() {
	const [totalMovies, setTotalMovies] = useState(0);
	const [totalRuntime, setTotalRuntime] = useState(0);
	const [profileData, setProfileData] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const { id }: { id: string } = useLocalSearchParams();

	useEffect(() => {
		setLoading(true);
		if (id && typeof id === "string") fetchData(id);
		else {
			setError(true);
			setLoading(false);
		}
		if (refreshing) setRefreshing(false);
	}, [id, refreshing]);

	const fetchStats = useCallback(() => {
		const userId = id;
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
					setTotalRuntime(r.data.total_runtime);
				}
			});
		});
	}, [id]);

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
						<Text style={styles.sectionTitle}>Playlists</Text>
					</View>

					{historyPlaylist && historyPlaylist?.is_private && (
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
							</View>
							<CarouselWatchList
								providers={historyPlaylist}
								showDivider={false}
							/>
						</View>
					)}

					{/* Autres playlists */}
					{otherPlaylists.length > 0 ? (
						otherPlaylists.map(
							(p, i) =>
								!p.is_private && (
									<View key={p.id}>
										<View style={styles.playlistCard}>
											<View style={styles.playlistInfo}>
												<Text
													style={styles.playlistName}>
													{p.title}
												</Text>
											</View>
										</View>
										<CarouselWatchList
											providers={p}
											showDivider={false}
										/>
									</View>
								)
						)
					) : (
						<Text style={styles.emptyPlaylists}>
							Aucune playlist créée
						</Text>
					)}
				</View>
			</ScrollView>
		</>
	);
}
