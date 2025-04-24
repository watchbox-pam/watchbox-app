import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	View,
	TouchableOpacity,
	Modal,
	Button,
	Text,
	FlatList
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
	const { id } = useLocalSearchParams();

	const [media, setMedia] = useState<undefined | MovieProps>();

	const currentUser = useSessionStore((state) => state.user);

	const [menuVisible, setMenuVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<
		{ id: string; title: string }[]
	>([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

	const [error, setError] = useState(null);

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
		if (selectedPlaylistId && id) {
			const response = await addMediaToPlaylist(
				String(selectedPlaylistId),
				Number(id)
			);
			if (response.success) {
				alert("Movie added to playlist successfully!");
				closeModal();
			} else {
				alert("Failed to add movie to playlist.");
			}
		}
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetchMovieDetails(+id);
			if (response.success) {
				setMedia(response.data);
			}
			setLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const userId = currentUser && currentUser.id;

		if (userId && typeof userId === "string") {
			setLoading(true);
			fetchData();
			fetchUserPlaylists(userId);
		} else {
			setError("ID utilisateur invalide");
			setLoading(false);
		}
	}, [id, currentUser]);

	const convertMinutesToHours = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}min`;
	};

	if (loading) {
		return (
			<View style={styles.loading}>
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
							source={{
								uri:
									"https://image.tmdb.org/t/p/original" +
									media?.poster_path
							}}
							style={styles.imagePoster}
						/>
					</View>
					<View style={styles.infoDiv}>
						{media?.age_restriction && (
							<Tag style={styles.tagContainer}>
								<StyledText style={styles.textTag}>
									{media?.age_restriction}
								</StyledText>
							</Tag>
						)}

						<StyledText style={styles.title}>
							{media?.title}
						</StyledText>

						<StyledText style={styles.text}>
							<StyledText>{media?.release_date}</StyledText> •{" "}
							<StyledText>
								{convertMinutesToHours(
									Number(media?.runtime) ?? 0
								)}
							</StyledText>
						</StyledText>
						<StyledText style={styles.text}>
							{media?.release_date ? (
								<>
									<StyledText>
										{media.release_date}
									</StyledText>{" "}
									•{" "}
								</>
							) : null}
							<StyledText>
								{media?.runtime
									? convertMinutesToHours(
											Number(media?.runtime)
										)
									: "duration inconnue"}
							</StyledText>
						</StyledText>
						{media?.director?.name && (
							<StyledText style={styles.text}>
								par{" "}
								{media?.director?.name && (
									<StyledText style={styles.textBold}>
										{media?.director.name}
									</StyledText>
								)}
							</StyledText>
						)}

						<TagList tags={media?.genres || []} />
					</View>
				</View>

				{!media?.providers || media?.providers.length <= 0 ? null : (
					<View style={styles.providersContainer}>
						<StyledText>ou regarder ?</StyledText>
						<CarouselProviders providers={media?.providers} />
					</View>
				)}

				<View>
					<StyledText style={styles.description}>
						{media?.overview}
					</StyledText>
				</View>

				<View style={styles.videoContainer}>
					<StyledText style={styles.textCasting}>
						Bande annonce
					</StyledText>
					<YoutubePlayer
						height={275}
						play={false}
						videoId={media?.video_key}
					/>
				</View>

				<View style={styles.castingContainer}>
					<StyledText style={styles.textCasting}>Casting</StyledText>
					<CarouselCasting cast={media?.casting} />

					<View style={styles.directorContainer}>
						{media?.director && (
							<View>
								<StyledText style={styles.textCasting}>
									Réalisateur
								</StyledText>
								<CarouselCasting cast={[media?.director]} />
							</View>
						)}

						{media?.composer && (
							<View>
								<StyledText style={styles.textCasting}>
									Compositeur
								</StyledText>
								<CarouselCasting cast={[media?.composer]} />
							</View>
						)}
					</View>
				</View>
				<CommentaryScreen />
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
								{userPlaylists.map((playlist) => (
									<Picker.Item
										key={playlist.id}
										label={playlist.title}
										value={playlist.id}
									/>
								))}
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
