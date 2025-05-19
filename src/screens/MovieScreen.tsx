import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	View,
	TouchableOpacity,
	Modal,
	Button,
	Text
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import { Menu, Provider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import BackButton from "@/src/components/BackButton";
import Tag from "@/src/components/Tag";
import StyledText from "@/src/components/StyledText";
import TagList from "@/src/components/TagList";
import CarouselProviders from "@/src/components/CarouselProviders";
import CarouselCasting from "@/src/components/CarouselCasting";

import styles from "@/src/styles/MovieDetailStyle";
import { ActivityIndicator } from "react-native-paper";
import CommentaryScreen from "@/src/screens/CommentaryScreen";
import { fetchMovieDetails } from "@/src/services/MovieDetailService";
import {
	addMediaToPlaylist,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import useSessionStore from "../zustand/sessionStore";

export default function MovieScreen() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id }: { id: string } = useLocalSearchParams();

	const [media, setMedia] = useState<undefined | MovieProps>();

	const currentUser = useSessionStore((state: any) => state.user);

	const [menuVisible, setMenuVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<
		{ id: string; title: string }[]
	>([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	const fetchUserPlaylists = async (userId: string) => {
		const response = await getUserPlaylists(userId);
		if (response.success) {
			setUserPlaylists(response.data || []); // Ensure userPlaylists is always an array
		} else {
			console.error("Error fetching user playlists:", response.message);
			setUserPlaylists([]); // Fallback to an empty array in case of error
		}
	};

	const openModal = async () => {
		const userId = currentUser && currentUser.id;
		setModalVisible(true);
		if (userId) {
			await fetchUserPlaylists(userId);
		}
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const handleAddToPlaylist = async () => {
		if (!selectedPlaylistId) {
			alert("Please select a playlist before adding the movie.");
			return;
		}

		if (id) {
			const response = await addMediaToPlaylist(
				String(selectedPlaylistId),
				Number(id)
			);
			if (response.success) {
				alert("Movie added to playlist successfully!");
				closeModal();
			} else {
				alert(response.message || "Failed to add movie to playlist.");
			}
		} else {
			alert("Invalid movie ID. Please try again.");
		}
	};

	const fetchData = async () => {
		try {
			const response = await fetchMovieDetails(+id);
			if (response.success && response.data) {
				setMedia(response.data);
			} else {
				setError(true);
			}
		} catch (e) {
			console.error(e);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const userId = currentUser && currentUser.id;

		if (userId && typeof userId === "string") {
			fetchData();
			fetchUserPlaylists(userId);
		} else {
			setError(true);
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, currentUser]);

	const convertMinutesToHours = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}min`;
	};

	if (error) {
		return (
			<View style={styles.errorContainer} testID="error">
				<StyledText style={styles.errorText}>
					Erreur lors du chargement des données.
				</StyledText>
			</View>
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
		<Provider>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				overScrollMode="never">
				<View style={styles.headers}>
					<BackButton />
					<Menu
						visible={menuVisible}
						onDismiss={closeMenu}
						anchor={
							<TouchableOpacity onPress={openMenu}>
								<Text style={styles.menuButton}>⋮</Text>
							</TouchableOpacity>
						}>
						<Menu.Item
							onPress={() => {
								closeMenu();
								openModal();
							}}
							title="Add to Playlist"
						/>
					</Menu>
				</View>

				<View style={styles.imageBannerContainer}>
					<LinearGradient
						// Background Linear Gradient
						colors={["#0A1E38", "transparent"]}
						style={styles.shadowBottom}
					/>
					<Image
						testID="movie-banner"
						source={{
							uri:
								"https://image.tmdb.org/t/p/original" +
								media?.backdrop_path
						}}
						style={styles.imageBanner}
					/>
				</View>

				<View style={styles.infoContainer}>
					<View style={styles.imagePosterContainer}>
						<Image
							testID="movie-poster"
							source={{
								uri:
									"https://image.tmdb.org/t/p/original" +
									media?.poster_path
							}}
							style={styles.imagePoster}
						/>
					</View>
					<View style={styles.infoDiv} testID="movie-info">
						{media?.age_restriction && (
							<Tag style={styles.tagContainer}>
								<StyledText style={styles.textTag}>
									{media?.age_restriction}
								</StyledText>
							</Tag>
						)}

						<StyledText
							style={styles.title}
							numberOfLines={2}
							ellipsizeMode="tail"
							adjustsFontSizeToFit>
							{media?.title}
						</StyledText>

						<StyledText style={styles.text}>
							{media?.release_date
								? `${media.release_date} • `
								: ""}
							{media?.runtime
								? convertMinutesToHours(Number(media?.runtime))
								: "duration inconnue"}
						</StyledText>

						{media?.director?.name && (
							<StyledText style={styles.text}>
								par {media?.director.name}
							</StyledText>
						)}

						<TagList
							testID="movie-tags"
							tags={
								media?.genres
									? media.genres.map(
											(genre: any) => genre.name
										)
									: []
							}
						/>
					</View>
				</View>

				{!media?.providers || media?.providers.length <= 0 ? null : (
					<View style={styles.providersContainer}>
						<StyledText>ou regarder ?</StyledText>
						<CarouselProviders
							providers={media?.providers}
							testID="carousel-providers"
						/>
					</View>
				)}

				<View testID="movie-overview">
					<StyledText
						style={styles.description}
						numberOfLines={4}
						ellipsizeMode="tail">
						{media?.overview
							? media.overview
							: "Aucune description disponible pour ce film."}
					</StyledText>
				</View>

				{media?.video_key ? (
					<View style={styles.videoContainer} testID="movie-video">
						<StyledText style={styles.textCasting}>
							Bande annonce
						</StyledText>
						<YoutubePlayer
							height={275}
							play={false}
							videoId={media?.video_key}
						/>
					</View>
				) : null}

				<View style={styles.castingContainer}>
					<StyledText style={styles.textCasting}>Casting</StyledText>
					<CarouselCasting
						cast={media?.casting}
						testID="carousel-casting"
					/>

					<View style={styles.directorContainer}>
						{media?.director && (
							<View testID="movie-director">
								<StyledText style={styles.textCasting}>
									Réalisateur
								</StyledText>
								<CarouselCasting cast={[media?.director]} />
							</View>
						)}

						{media?.composer && (
							<View testID="movie-composer">
								<StyledText style={styles.textCasting}>
									Compositeur
								</StyledText>
								<CarouselCasting cast={[media?.composer]} />
							</View>
						)}
					</View>
				</View>
				<CommentaryScreen mediaId={id} />
			</ScrollView>

			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={closeModal}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Select a Playlist</Text>
						<View style={styles.selectContainer}>
							<Picker
								selectedValue={selectedPlaylistId}
								onValueChange={(itemValue) =>
									setSelectedPlaylistId(itemValue)
								}>
								<Picker.Item
									label="--Please choose a playlist--"
									value=""
								/>
								{userPlaylists.length > 0 ? (
									userPlaylists.map((playlist) => (
										<Picker.Item
											key={playlist.id}
											label={playlist.title}
											value={playlist.id}
										/>
									))
								) : (
									<Picker.Item
										label="Error loading playlists. Please try again later."
										value=""
									/>
								)}
							</Picker>
						</View>
						<View style={styles.modalButtons}>
							<Button title="Cancel" onPress={closeModal} />
							<Button title="Add" onPress={handleAddToPlaylist} />
						</View>
					</View>
				</View>
			</Modal>
		</Provider>
	);
}

export type MovieProps = {
	backdrop_path: string;
	poster_path: string;
	title: string;
	age_restriction: string;
	runtime: string;
	release_date: number;
	genres: string[];
	providers: string[];
	overview: string;
	casting: {
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
		cast_id: number;
		character: string;
		credit_id: string;
		order: number;
	}[];
	director: {
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
		credit_id: string;
		department: number;
		job: string;
	};
	composer: {
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
		credit_id: string;
		department: number;
		job: string;
	};
	video: string;
	video_key: string;
};
