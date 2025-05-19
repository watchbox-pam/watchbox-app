import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Modal,
	Button,
	Text,
	TouchableOpacity,
	FlatList
} from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import {
	addMediaToPlaylist,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import useSessionStore from "@/src/zustand/sessionStore";

const DropDownPlaylist = ({ movieId }: { movieId: number }) => {
	const [visible, setVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<
		{ id: string; title: string }[]
	>([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
		null
	);

	const currentUser = useSessionStore((state: any) => state.user);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const fetchUserPlaylists = async (userId: string) => {
		const response = await getUserPlaylists(userId);
		if (response.success) {
			setUserPlaylists(response.data || []);
		} else {
			console.error("Error fetching user playlists:", response.message);
			setUserPlaylists([]);
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

		if (movieId) {
			const response = await addMediaToPlaylist(
				String(selectedPlaylistId),
				movieId
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

	return (
		<Provider>
			<View style={styles.container}>
				<TouchableOpacity style={styles.button}>
					<IconButton
						icon="dots-vertical"
						size={24}
						onPress={openMenu}
						iconColor="#FFFFFF"
					/>
				</TouchableOpacity>

				<Portal>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={{ x: 50, y: 50 }}
						contentStyle={styles.menuContent}>
						<Menu.Item
							onPress={() => {
								closeMenu();
								openModal();
							}}
							title="Ajouter à une playlist"
							leadingIcon="playlist-plus"
							style={styles.menuItem}
							titleStyle={styles.menuItemTitle}
							contentStyle={styles.menuItemContent}
						/>
					</Menu>
				</Portal>

				<Modal
					visible={modalVisible}
					transparent={true}
					animationType="slide"
					onRequestClose={closeModal}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>
								Choisis une playlist
							</Text>
							<FlatList
								data={userPlaylists}
								keyExtractor={(item) => item.id}
								style={styles.selectContainer}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={[
											styles.playlistItem,
											selectedPlaylistId === item.id &&
												styles.selectedItem
										]}
										onPress={() =>
											setSelectedPlaylistId(item.id)
										}>
										<Text
											style={[
												styles.playlistText,
												selectedPlaylistId ===
													item.id &&
													styles.selectedText
											]}>
											{item.title}
										</Text>
									</TouchableOpacity>
								)}
								ListEmptyComponent={
									<Text style={{ color: "#FFFFFF" }}>
										Aucune playlist trouvée.
									</Text>
								}
							/>
							<View style={styles.modalButtons}>
								<Button title="Annuler" onPress={closeModal} />
								<Button
									title="Ajouter"
									onPress={handleAddToPlaylist}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 2,
		alignSelf: "flex-end"
	},
	button: {
		alignItems: "center",
		backgroundColor: "#13396A",
		padding: 10,
		borderRadius: 50,
		width: 45,
		height: 45,
		justifyContent: "center"
	},
	menuContent: {
		backgroundColor: "#0A1E38",
		top: -30,
		left: -20,
		zIndex: 5,
		borderRadius: 30,
		paddingVertical: 0,
		paddingHorizontal: 0,
		minWidth: 160
	},
	menuItem: {
		backgroundColor: "#0A1E38",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 30
	},
	menuItemTitle: {
		color: "#FFFFFF",
		fontWeight: "bold"
	},
	menuItemContent: {
		backgroundColor: "#0A1E38"
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
		fontSize: 18,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 10
	},
	selectContainer: {
		width: "100%",
		maxHeight: 200,
		marginBottom: 20
	},
	playlistItem: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		backgroundColor: "#13396A",
		borderRadius: 8,
		marginBottom: 8
	},
	playlistText: {
		color: "#FFFFFF",
		fontSize: 16
	},
	selectedItem: {
		backgroundColor: "#1F4E89"
	},
	selectedText: {
		fontWeight: "bold"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});

export default DropDownPlaylist;
