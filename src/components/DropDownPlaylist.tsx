import React, { useState, useRef } from "react";
import {
	View,
	Modal,
	Button,
	Text,
	TouchableOpacity,
	FlatList,
	Alert,
	Share,
	ActivityIndicator
} from "react-native";
import { Menu, IconButton } from "react-native-paper";
import {
	addMediaToPlaylist,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import useSessionStore from "@/src/zustand/sessionStore";
import styles from "@/src/styles/DropDownPlaylistStyle";

const DropDownPlaylist = ({
	movieId,
	movieTitle
}: {
	movieId: number;
	movieTitle?: string;
}) => {
	const [visible, setVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<
		{ id: string; title: string }[]
	>([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
		null
	); // Currently selected playlist ID

	const [isFetchingPlaylists, setIsFetchingPlaylists] = useState(false); // État permettant de suivre si des listes de lecture sont récupérées
	const [isAdding, setIsAdding] = useState(false); // État permettant de suivre si un film est en cours d'ajout à une liste de lecture

	const buttonRef = useRef<View>(null); // Référence pour le bouton du menu
	const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 }); // État pour stocker les coordonnées d'ancrage du menu

	const currentUser = useSessionStore((state: any) => state.user);

	const isMenuOpen = useRef(false);

	const onButtonLayout = () => {
		buttonRef.current?.measureInWindow((x, y, width, height) => {
			setMenuAnchor({ x: x + width, y: y + height });
		});
	};

	const openMenu = () => {
		if (isMenuOpen.current) return;
		isMenuOpen.current = true;
		setVisible(true);
	};

	const closeMenu = () => {
		isMenuOpen.current = false;
		setVisible(false);
	};

	// Fetch user playlists from API
	const fetchUserPlaylists = async (userId: string) => {
		setIsFetchingPlaylists(true);
		try {
			const response = await getUserPlaylists(userId);
			if (response.success) {
				setUserPlaylists(response.data || []);
			} else {
				console.error(
					"Error fetching user playlists:",
					response.message
				);
				setUserPlaylists([]);
			}
		} finally {
			setIsFetchingPlaylists(false);
		}
	};

	const onShare = async () => {
		try {
			const shareMessage = movieTitle
				? `Je te recommande de regarder "${movieTitle}" sur WatchBox!`
				: "Découvre ce film sur WatchBox!";
			const result = await Share.share({
				message: shareMessage
				//  + `\n\nRegarde-le ici: https://watchbox.com/movies/${movieId}`
			});
			if (result.action === Share.sharedAction) {
				// Partage réussi
			} else if (result.action === Share.dismissedAction) {
				// Partage annulé
			}
		} catch (error: any) {
			Alert.alert("Erreur", error.message);
		}
	};

	// Open modal and load playlists for the current user
	const openModal = async () => {
		const userId = currentUser?.id;
		setModalVisible(true);
		if (userId) {
			await fetchUserPlaylists(userId);
		}
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedPlaylistId(null); // Reset selected playlist when modal closes
	};

	// Add the movie to the selected playlist via API
	const handleAddToPlaylist = async () => {
		if (!selectedPlaylistId) {
			Alert.alert(
				"Sélection requise",
				"Veuillez sélectionner une playlist avant d'ajouter le film."
			);
			return;
		}

		if (!movieId) {
			Alert.alert(
				"Erreur",
				"Identifiant du film invalide. Veuillez réessayer."
			);
			return;
		}
		setIsAdding(true);
		try {
			const response = await addMediaToPlaylist(
				String(selectedPlaylistId),
				movieId
			);
			if (response.success) {
				Alert.alert("Succès", "Film ajouté à la playlist !");
				closeModal();
			} else {
				Alert.alert(
					response.message ||
						"Impossible d'ajouter le film à la playlist."
				);
			}
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<View style={styles.container}>
			<View ref={buttonRef} onLayout={onButtonLayout}>
				<TouchableOpacity style={styles.button}>
					<IconButton
						icon="dots-vertical"
						size={24}
						onPress={openMenu}
						iconColor="#FFFFFF"
					/>
				</TouchableOpacity>
			</View>

			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={menuAnchor}
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
				<Menu.Item
					onPress={() => {
						closeMenu();
						onShare();
					}}
					title="Partager"
					leadingIcon="share-variant"
					style={styles.menuItem}
					titleStyle={styles.menuItemTitle}
					contentStyle={styles.menuItemContent}
				/>
			</Menu>

			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={closeModal}>
				<TouchableOpacity
					style={styles.modalContainer}
					activeOpacity={1}
					onPress={closeModal}>
					<TouchableOpacity
						style={styles.modalContent}
						activeOpacity={1}
						onPress={(e) => e.stopPropagation()}>
						<Text style={styles.modalTitle}>
							Choisis une playlist
						</Text>
						{isFetchingPlaylists ? (
							<ActivityIndicator
								size="large"
								color="#FFFFFF"
								style={{ marginVertical: 20 }}
							/>
						) : (
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
						)}
						<View style={styles.modalButtons}>
							<Button
								title="Annuler"
								onPress={closeModal}
								disabled={isAdding}
							/>
							{isAdding ? (
								<ActivityIndicator
									size="small"
									color="#FFFFFF"
								/>
							) : (
								<Button
									title="Ajouter"
									onPress={handleAddToPlaylist}
								/>
							)}
						</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

export default DropDownPlaylist;
