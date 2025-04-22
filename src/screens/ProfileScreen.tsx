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
import Playlist from "../models/Playlist";
import useSessionStore from "../zustand/sessionStore";
import { createPlaylist } from "@/src/services/PlaylistService";

export default function Index() {
	const [modalVisible, setModalVisible] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const providers = [
		"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
		"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
		"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
		"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
		"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"
	];

	const { id } = useLocalSearchParams();
	console.log("useLocalSearchParams id:", id);

	const handleCreateWatchlist = () => {
		setModalVisible(true);
	};

	const handleSavePlaylist = async () => {
		console.log("handleSavePlaylist triggered");
		// const userId = useSessionStore((state: any) => state.userId);
		console.log("userId:", userId);

		if (!userId) {
			alert("User is not logged in.");
			return;
		}

		const playlistToInsert: Playlist = {
			id: "",
			userId: userId,
			title: playlistTitle,
			is_private: isPrivate,
			created_at: new Date()
		};

		console.log("Calling createPlaylist with:", playlistToInsert);

		const result = await createPlaylist(playlistToInsert);
		console.log("createPlaylist result:", result);

		if (result.success) {
			alert(result.message || "Playlist created successfully!");
			setModalVisible(false);
			setPlaylistTitle("");
			setIsPrivate(false);
		} else {
			alert(
				result.message ||
					"An error occurred while creating the playlist."
			);
		}
	};

	useEffect(() => {
		console.log(id);

		fetch(`nothing`);
		/* .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMedia(data);
      }); */
	});

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			{/* <View style={styles.header}>
        <BackButton />
        <LogoButton />
      </View> */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Create Playlist</Text>
						<TextInput
							style={styles.input}
							placeholder="Playlist Title"
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
							<Text style={styles.checkboxLabel}>
								{isPrivate ? "Private" : "Public"}
							</Text>
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
					// Background Linear Gradient
					colors={["#0A1E38", "transparent"]}
					style={styles.shadowBottom}
				/>
				<Image
					source={require("../assets/images/banner-interstellar.png")}
					style={styles.imageBanner}
				/>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.imagePosterContainer}>
					<Image
						source={require("../assets/images/Interstellar-film1.png")}
						style={styles.ProfilPicture}
					/>
					<Text style={styles.title}>Julien-QTX</Text>
				</View>
				<DropDownButton />
			</View>

			<View>
				<StyledText style={styles.description}>
					Dans un futur proche, face à une Terre qui se meurt, un
					groupe d’explorateurs utilise un vaisseau interstellaire
					pour franchir un trou de ver permettant de parcourir des
					distances jusque‐là infranchissables. Leur but : trouver un
					nouveau foyer pour l’humanité.
				</StyledText>
			</View>

			<TraitGradiant />

			<View style={styles.WatchList}>
				<View style={styles.watchListHeader}>
					<Text style={styles.TitleWatchList}>WatchList Film</Text>
					<TouchableOpacity
						style={styles.createWatchlistButton}
						onPress={handleCreateWatchlist}>
						<Text style={styles.createWatchlistButtonText}>+</Text>
					</TouchableOpacity>
				</View>
				<CarouselWatchList providers={providers} />
			</View>

			<View style={styles.WatchList}>
				<Text style={styles.TitleWatchList}>Historique Film</Text>
				<CarouselWatchList providers={providers} />
			</View>

			<TraitGradiant />

			<View style={styles.WatchList}>
				<Text style={styles.TitleWatchList}>WatchList Séries</Text>
				<CarouselWatchList providers={providers} />
			</View>

			<View style={styles.WatchList}>
				<Text style={styles.TitleWatchList}>Historique Séries</Text>
				<CarouselWatchList providers={providers} />
			</View>

			<TraitGradiant />

			<Stats />
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
		fontSize: 40,
		color: "#ffffff",
		paddingTop: 10,
		paddingLeft: 10,
		marginTop: 15
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
		marginBottom: 10
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
		height: 30
	},
	createWatchlistButtonText: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 22
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 20,
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
		color: "#000"
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
		color: "#000"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});
