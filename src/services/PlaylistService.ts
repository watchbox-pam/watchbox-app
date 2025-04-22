import Playlist from "@/src/models/Playlist";
import { ApiHelper } from "@/src/utils/axios";

export async function createPlaylist(playlist: Playlist) {
	try {
		console.log("createPlaylist called with:", playlist);
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

		if (!playlist.userId) {
			return {
				success: false,
				message: "L'identifiant de l'utilisateur est requis",
				element: "userId"
			};
		}

		const result = await ApiHelper.post("/playlist", {
			id: playlist.id || "",
			userId: playlist.userId,
			title: playlist.title,
			is_private: playlist.is_private,
			created_at: playlist.created_at || new Date().toISOString()
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

export async function getAllPlaylists(userId: string) {
	try {
		const result = await ApiHelper.get(`/playlists?userId=${userId}`);
		if (result.success) {
			return result.data; // Assuming the API returns an array of playlists
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
}
