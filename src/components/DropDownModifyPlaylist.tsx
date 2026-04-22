import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Modal,
	Text,
	TouchableOpacity,
	TextInput,
	Animated,
	Pressable
} from "react-native";
import { Menu } from "react-native-paper";
import { deletePlaylist, updatePlaylist } from "@/src/services/PlaylistService";
import useSessionStore from "@/src/zustand/sessionStore";
import { useRouter } from "expo-router";
import Playlist from "../models/Playlist";
import styles from "@/src/styles/DropDownModifyPlaylistStyle";
import wlStyles from "@/src/styles/WatchListScreenStyle";

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

interface Props {
	playlistId: string;
	initialTitle: string;
	initialIsPrivate: boolean;
	onUpdate?: (updated: { title: string; is_private: boolean }) => void;
}

const DropDownModifyPlaylist = ({
	playlistId,
	initialTitle,
	initialIsPrivate,
	onUpdate
}: Props) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);
	const [deleteVisible, setDeleteVisible] = useState(false);
	const [editedTitle, setEditedTitle] = useState(initialTitle);
	const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
	const currentUser = useSessionStore((state: any) => state.user);
	const router = useRouter();

	const editSlide = useSlideIn(editVisible);
	const deleteSlide = useSlideIn(deleteVisible);

	useEffect(() => {
		setEditedTitle(initialTitle);
	}, [initialTitle]);
	useEffect(() => {
		setIsPrivate(initialIsPrivate);
	}, [initialIsPrivate]);
	useEffect(() => {
		if (editVisible) {
			setEditedTitle(initialTitle);
			setIsPrivate(initialIsPrivate);
		}
	}, [editVisible]);

	const handleUpdate = async () => {
		const result = await updatePlaylist({
			id: playlistId,
			user_id: currentUser?.id,
			title: editedTitle,
			is_private: isPrivate,
			created_at: new Date()
		} as Playlist);
		if (result.success) {
			setEditVisible(false);
			onUpdate?.({ title: editedTitle, is_private: isPrivate });
		}
	};

	const handleDelete = async () => {
		const result = await deletePlaylist(playlistId);
		if (result.success) {
			router.push("/");
		}
	};

	return (
		<>
			<Menu
				visible={menuVisible}
				onDismiss={() => setMenuVisible(false)}
				style={styles.menu}
				anchor={
					<View style={{ marginRight: 16 }}>
						<TouchableOpacity
							style={styles.trigger}
							onPress={() => setMenuVisible(true)}>
							<Text style={styles.triggerText}>•••</Text>
						</TouchableOpacity>
					</View>
				}>
				<Menu.Item
					title="Modifier"
					leadingIcon="pencil"
					titleStyle={styles.menuItem}
					onPress={() => {
						setMenuVisible(false);
						setEditVisible(true);
					}}
				/>
				<Menu.Item
					title="Supprimer"
					leadingIcon="delete"
					titleStyle={styles.menuItemDelete}
					onPress={() => {
						setMenuVisible(false);
						setDeleteVisible(true);
					}}
				/>
			</Menu>

			{/* Modal modifier */}
			<Modal
				animationType="fade"
				transparent
				visible={editVisible}
				onRequestClose={() => setEditVisible(false)}>
				<Pressable
					style={wlStyles.modalOverlay}
					onPress={() => setEditVisible(false)}>
					<Animated.View
						style={{ transform: [{ translateY: editSlide }] }}>
						<Pressable
							style={wlStyles.modalSheet}
							onPress={(e) => e.stopPropagation()}>
							<View style={wlStyles.modalHandle} />
							<Text style={wlStyles.modalTitle}>
								Modifier la playlist
							</Text>
							<TextInput
								style={wlStyles.input}
								placeholder="Titre de la playlist"
								placeholderTextColor="rgba(255,255,255,0.25)"
								value={editedTitle}
								onChangeText={setEditedTitle}
								autoFocus
							/>
							<Pressable
								style={wlStyles.checkboxRow}
								onPress={() => setIsPrivate(!isPrivate)}>
								<View
									style={[
										wlStyles.checkbox,
										isPrivate && wlStyles.checkboxChecked
									]}
								/>
								<Text style={wlStyles.checkboxLabel}>
									Rendre cette playlist privée
								</Text>
							</Pressable>
							<View style={wlStyles.modalButtons}>
								<Pressable
									style={wlStyles.btnCancel}
									onPress={() => setEditVisible(false)}>
									<Text style={wlStyles.btnCancelText}>
										Annuler
									</Text>
								</Pressable>
								<Pressable
									style={wlStyles.btnConfirm}
									onPress={handleUpdate}>
									<Text style={wlStyles.btnConfirmText}>
										Enregistrer
									</Text>
								</Pressable>
							</View>
						</Pressable>
					</Animated.View>
				</Pressable>
			</Modal>

			{/* Modal supprimer */}
			<Modal
				animationType="fade"
				transparent
				visible={deleteVisible}
				onRequestClose={() => setDeleteVisible(false)}>
				<Pressable
					style={wlStyles.modalOverlay}
					onPress={() => setDeleteVisible(false)}>
					<Animated.View
						style={{ transform: [{ translateY: deleteSlide }] }}>
						<Pressable
							style={wlStyles.modalSheet}
							onPress={(e) => e.stopPropagation()}>
							<View style={wlStyles.modalHandle} />
							<Text style={wlStyles.modalTitle}>
								Supprimer la playlist
							</Text>
							<Text
								style={{
									color: "#8ba4c0",
									fontSize: 14,
									marginBottom: 24
								}}>
								Voulez-vous vraiment supprimer{" "}
								<Text
									style={{
										color: "#e8f0fe",
										fontWeight: "600"
									}}>
									{editedTitle}
								</Text>{" "}
								? Cette action est irréversible.
							</Text>
							<View style={wlStyles.modalButtons}>
								<Pressable
									style={wlStyles.btnCancel}
									onPress={() => setDeleteVisible(false)}>
									<Text style={wlStyles.btnCancelText}>
										Annuler
									</Text>
								</Pressable>
								<Pressable
									style={wlStyles.btnDelete}
									onPress={handleDelete}>
									<Text style={wlStyles.btnDeleteText}>
										Supprimer
									</Text>
								</Pressable>
							</View>
						</Pressable>
					</Animated.View>
				</Pressable>
			</Modal>
		</>
	);
};

export default DropDownModifyPlaylist;
