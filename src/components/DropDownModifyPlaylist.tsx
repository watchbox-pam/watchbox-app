import React, { useEffect, useState } from "react";
import {
	View,
	Modal,
	Button,
	Text,
	TouchableOpacity,
	TextInput
} from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import { deletePlaylist, updatePlaylist } from "@/src/services/PlaylistService";
import useSessionStore from "@/src/zustand/sessionStore";
import { useRouter } from "expo-router";
import Playlist from "../models/Playlist";
import styles from "@/src/styles/DropDownModifyPlaylistStyle";

interface DropDownModifyPlaylistProps {
	playlistId: string;
	initialTitle: string;
	initialIsPrivate: boolean;
	onUpdate?: (updated: { title: string; is_private: boolean }) => void;
}

// Component for dropdown menu to modify or delete a playlist
const DropDownModifyPlaylist = ({
	playlistId,
	initialTitle,
	initialIsPrivate,
	onUpdate
}: DropDownModifyPlaylistProps) => {
	const [visible, setVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [editedTitle, setEditedTitle] = useState(initialTitle);
	const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
	const currentUser = useSessionStore((state: any) => state.user);
	const router = useRouter();

	// Update state if props change
	useEffect(() => {
		setEditedTitle(initialTitle);
	}, [initialTitle]);
	useEffect(() => {
		setIsPrivate(initialIsPrivate);
	}, [initialIsPrivate]);
	useEffect(() => {
		if (editModalVisible) {
			setEditedTitle(initialTitle);
			setIsPrivate(initialIsPrivate);
		}
	}, [editModalVisible, initialTitle, initialIsPrivate]);
	console.log("initialIsPrivate", initialIsPrivate);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	// Handle playlist update API call
	const handleUpdatePlaylist = async () => {
		const userId = currentUser && currentUser.id;
		const playlist: Playlist = {
			id: playlistId,
			user_id: userId,
			title: editedTitle,
			is_private: isPrivate,
			created_at: new Date()
		};

		const result = await updatePlaylist(playlist);

		if (result.success) {
			setEditModalVisible(false);
			if (onUpdate)
				onUpdate({ title: editedTitle, is_private: isPrivate });
			alert("Playlist mise à jour avec succès");
		} else {
			alert(
				result.message ||
					"Erreur lors de la mise à jour de la playlist."
			);
		}
	};

	// Handle playlist deletion API call
	const handleDeletePlaylist = async () => {
		const result = await deletePlaylist(playlistId);

		if (result.success) {
			router.push("/");
			alert("Playlist supprimée avec succès");
		} else {
			alert(
				result.message ||
					"Erreur lors de la suppression de la playlist."
			);
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
								setEditModalVisible(true);
							}}
							title="Modifier la playlist"
							style={styles.menuItem}
							titleStyle={styles.menuItemTitle}
							contentStyle={styles.menuItemContent}
						/>
						<Menu.Item
							onPress={() => {
								closeMenu();
								setDeleteModalVisible(true);
							}}
							title="Supprimer la playlist"
							style={styles.menuItem}
							titleStyle={styles.menuItemTitle}
							contentStyle={styles.menuItemContent}
						/>
					</Menu>
				</Portal>

				<Modal
					visible={editModalVisible}
					transparent={true}
					animationType="slide"
					onRequestClose={() => setEditModalVisible(false)}>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>
								Modifier la playlist
							</Text>
							<TextInput
								style={styles.input}
								placeholder="Titre de la playlist"
								placeholderTextColor="#888"
								value={editedTitle}
								onChangeText={setEditedTitle}
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
									onPress={() => setEditModalVisible(false)}
								/>
								<Button
									title="Sauvegarder"
									onPress={handleUpdatePlaylist}
								/>
							</View>
						</View>
					</View>
				</Modal>
				<Modal
					visible={deleteModalVisible}
					transparent={true}
					animationType="slide"
					onRequestClose={() => setDeleteModalVisible(false)}>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>
								Voulez vous supprimer la playlist {editedTitle}{" "}
								?
							</Text>
							<View style={styles.modalButtons}>
								<Button
									title="Annuler"
									onPress={() => setDeleteModalVisible(false)}
								/>
								<Button
									title="Supprimer"
									onPress={handleDeletePlaylist}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</Provider>
	);
};

export default DropDownModifyPlaylist;
