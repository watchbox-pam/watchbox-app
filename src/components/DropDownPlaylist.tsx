import React, { useRef, useState } from "react";
import {
	View,
	Modal,
	Button,
	Text,
	TouchableOpacity,
	FlatList,
	Share,
	ActivityIndicator
} from "react-native";
import { IconButton } from "react-native-paper";
import {
	addMediaToPlaylist,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import useSessionStore from "@/src/zustand/sessionStore";
import styles from "@/src/styles/DropDownPlaylistStyle";
import Toast from "react-native-toast-message";

const DropDownPlaylist = ({ movieId }: { movieId: number }) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<
		{ id: string; title: string }[]
	>([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
		null
	);
	const [isFetchingPlaylists, setIsFetchingPlaylists] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [menuTop, setMenuTop] = useState(0);
	const [menuLeft, setMenuLeft] = useState(0);

	const buttonRef = useRef<View>(null);
	const currentUser = useSessionStore((state: any) => state.user);

	const openMenu = () => {
		buttonRef.current?.measureInWindow((x, y, width, height) => {
			setMenuTop(y + height - 20);
			setMenuLeft(x + width);
			setMenuVisible(true);
		});
	};

	const closeMenu = () => setMenuVisible(false);

	const fetchUserPlaylists = async (userId: string) => {
		setIsFetchingPlaylists(true);
		try {
			const response = await getUserPlaylists(userId);
			if (response.success) {
				setUserPlaylists(response.data || []);
			} else {
				setUserPlaylists([]);
			}
		} finally {
			setIsFetchingPlaylists(false);
		}
	};

	const onShare = async () => {
		try {
			await Share.share({
				message: `Je te recommande de regarder ce film sur WatchBox!\n\nhttps://watchbox.com/movies/${movieId}`
			});
		} catch (error: any) {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: error.message
			});
		}
	};

	const openModal = async () => {
		const userId = currentUser?.id;
		setModalVisible(true);
		if (userId) await fetchUserPlaylists(userId);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedPlaylistId(null);
	};

	const handleAddToPlaylist = async () => {
		if (!selectedPlaylistId) {
			Toast.show({
				type: "error",
				text1: "Sélection requise",
				text2: "Veuillez sélectionner une playlist."
			});
			return;
		}
		setIsAdding(true);
		try {
			const response = await addMediaToPlaylist(
				String(selectedPlaylistId),
				movieId
			);
			if (response.success) {
				Toast.show({
					type: "success",
					text1: "Succès",
					text2: "Film ajouté à la playlist !"
				});
				closeModal();
			} else if (response.message?.includes("déjà")) {
				Toast.show({
					type: "info",
					text1: "Déjà ajouté",
					text2: "Ce film est déjà dans cette playlist."
				});
				closeModal();
			} else {
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: response.message || "Impossible d'ajouter le film."
				});
			}
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<View style={styles.container}>
			<View ref={buttonRef}>
				<TouchableOpacity style={styles.button} onPress={openMenu}>
					<IconButton
						icon="dots-vertical"
						size={24}
						iconColor="#FFFFFF"
					/>
				</TouchableOpacity>
			</View>

			<Modal
				visible={menuVisible}
				transparent
				animationType="none"
				onRequestClose={closeMenu}>
				<TouchableOpacity
					style={{ flex: 1 }}
					activeOpacity={1}
					onPress={closeMenu}>
					<View
						style={{
							position: "absolute",
							top: menuTop,
							left: menuLeft,
							transform: [{ translateX: -260 }],
							backgroundColor: "#0A1E38",
							borderRadius: 12,
							borderWidth: 1,
							borderColor: "#1a3a5c",
							minWidth: 220,
							overflow: "hidden",
							elevation: 5,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.3,
							shadowRadius: 4
						}}>
						<TouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 14,
								paddingHorizontal: 16,
								gap: 10
							}}
							onPress={() => {
								closeMenu();
								openModal();
							}}>
							<IconButton
								icon="playlist-plus"
								size={20}
								iconColor="#FFFFFF"
								style={{ margin: 0 }}
							/>
							<Text
								style={{
									color: "#FFFFFF",
									fontWeight: "bold",
									fontSize: 14
								}}>
								Ajouter à une playlist
							</Text>
						</TouchableOpacity>

						<View
							style={{ height: 1, backgroundColor: "#1a3a5c" }}
						/>

						<TouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 14,
								paddingHorizontal: 16,
								gap: 10
							}}
							onPress={() => {
								closeMenu();
								onShare();
							}}>
							<IconButton
								icon="share-variant"
								size={20}
								iconColor="#FFFFFF"
								style={{ margin: 0 }}
							/>
							<Text
								style={{
									color: "#FFFFFF",
									fontWeight: "bold",
									fontSize: 14
								}}>
								Partager
							</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>

			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
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
