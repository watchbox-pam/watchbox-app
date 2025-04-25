import Playlist from "@/src/models/Playlist";
import { ApiHelper } from "@/src/utils/axios";

export async function createPlaylist(playlist: Playlist) {
	try {
		if (!playlist.title) {
			return {
				success: false,
				message: "Le titre de la playlist est requis",
				element: "title"
			};
		}

		if (playlist.is_private === undefined || playlist.is_private === null) {
			return {
				success: false,
				message: "Le statut de confidentialité est requis",
				element: "is_private"
			};
		}

		if (!playlist.user_id) {
			return {
				success: false,
				message: "L'identifiant de l'utilisateur est requis",
				element: "userId"
			};
		}

		const result = await ApiHelper.post("/playlists/", {
			id: "",
			user_id: playlist.user_id,
			title: playlist.title,
			created_at: new Date().toISOString(),
			is_private: playlist.is_private
		});

		if (result.success) {
			return {
				success: true,
				message: "Playlist créée avec succès"
			};
		} else {
			return {
				success: false,
				message:
					result.data || "Erreur lors de la création de la playlist"
			};
		}
	} catch (error) {
		return {
			success: false,
			// @ts-ignore
			message: error.detail || "Une erreur est survenue"
		};
	}
}

export async function getUserPlaylists(userId: string) {
	if (!userId || typeof userId !== "string") {
		return {
			success: false,
			message: "ID utilisateur invalide"
		};
	}

	try {
		const result = await ApiHelper.get(`/playlists/user/${userId}`);
		return {
			success: true,
			data: result.data
		};
	} catch (error) {
		console.error(
			"Error in getUserPlaylists:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message:
				error.message || "Erreur lors de la récupération des playlists"
		};
	}
}

export async function addMediaToPlaylist(playlistId: string, mediaId: number) {
	if (!playlistId || typeof playlistId !== "string") {
		return {
			success: false,
			message: "ID de la playlist invalide"
		};
	}

	if (!mediaId || typeof mediaId !== "number") {
		return {
			success: false,
			message: "ID du média invalide"
		};
	}

	try {
		const result = await ApiHelper.post(
			`/playlists/${playlistId}/media/${mediaId}`,
			{
				playlist_id: playlistId,
				media_id: mediaId
			}
		);
		return {
			success: true,
			message: "Média ajouté à la playlist avec succès"
		};
	} catch (error) {
		console.error(
			"Error in addMediaToPlaylist:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message:
				error.message || "Erreur lors de l'ajout du média à la playlist"
		};
	}
}

export async function getMediaInPlaylist(playlistId: string) {
	if (!playlistId || typeof playlistId !== "string") {
		return {
			success: false,
			message: "ID de la playlist invalide"
		};
	}

	try {
		const result = await ApiHelper.get(
			`/playlists/${playlistId}/media_list`
		);
		return {
			success: true,
			data: Array.isArray(result.data) ? result.data : [] // Ensure data is always an array
		};
	} catch (error) {
		console.error(
			"Error in getMediaInPlaylist:",
			error.response?.data || error.message || "Unknown error"
		);
		return {
			success: false,
			message:
				error.message ||
				"Erreur lors de la récupération des médias de la playlist"
		};
	}
}

export async function getPlaylistById(playlistId: string) {
	if (!playlistId || typeof playlistId !== "string") {
		return {
			success: false,
			message: "ID de la playlist invalide"
		};
	}

	try {
		const result = await ApiHelper.get(`/playlists/${playlistId}`);
		return {
			success: true,
			data: result.data
		};
	} catch (error) {
		console.error(
			"Error in getPlaylistById:",
			error.response?.data || error.message
		);
		return {
			success: false,
			message:
				error.message || "Erreur lors de la récupération de la playlist"
		};
	}
}
