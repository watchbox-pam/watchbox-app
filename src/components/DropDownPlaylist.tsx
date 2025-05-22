import React, { useState } from "react";
import styles from "@/src/styles/DropDownPlaylistStyle";
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

export default DropDownPlaylist;
