import { useState } from "react";
import { Share } from "react-native";
import {
	addMediaToPlaylist,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import { trackMovieAddedToPlaylist } from "@/src/services/analytics";
import useSessionStore from "@/src/zustand/sessionStore";
import Toast from "react-native-toast-message";

export function usePlaylistActions(mediaId: number) {
	const [modalVisible, setModalVisible] = useState(false);
	const [userPlaylists, setUserPlaylists] = useState<
		{ id: string; title: string }[]
	>([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
		null
	);
	const [isFetchingPlaylists, setIsFetchingPlaylists] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const currentUser = useSessionStore((state: any) => state.user);

	const fetchUserPlaylists = async (userId: string) => {
		setIsFetchingPlaylists(true);
		try {
			const response = await getUserPlaylists(userId);
			setUserPlaylists(
				response.success
					? (response.data || []).filter(
							(p: { title: string }) => p.title !== "Historique"
						)
					: []
			);
		} finally {
			setIsFetchingPlaylists(false);
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
				text2: "Veuillez sélectionner une playlist"
			});
			return;
		}
		setIsAdding(true);
		try {
			const response = await addMediaToPlaylist(
				String(selectedPlaylistId),
				mediaId
			);
			if (response.success) {
				await trackMovieAddedToPlaylist(mediaId, selectedPlaylistId);
				Toast.show({
					type: "success",
					text1: "Ajouté",
					text2: "Le film a été ajouté à la playlist"
				});
				closeModal();
			} else if (response.message?.includes("déjà")) {
				Toast.show({
					type: "info",
					text1: "Déjà présent",
					text2: "Ce film est déjà dans cette playlist"
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: response.message || "Impossible d'ajouter le film"
				});
			}
		} finally {
			setIsAdding(false);
		}
	};

	const onShare = async () => {
		try {
			await Share.share({
				message: `Regarde ce film sur Watchbox : https://watchbox.app/movie/${mediaId}`
			});
		} catch (error: any) {
			Toast.show({
				type: "error",
				text1: "Erreur de partage",
				text2: error.message
			});
		}
	};

	return {
		modalVisible,
		userPlaylists,
		selectedPlaylistId,
		isFetchingPlaylists,
		isAdding,
		setSelectedPlaylistId,
		openModal,
		closeModal,
		handleAddToPlaylist,
		onShare
	};
}
