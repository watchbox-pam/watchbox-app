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

export async function updatePlaylist(playlist: Playlist) {
	if (!playlist.id) {
		return {
			success: false,
			message: "L'identifiant de la playlist est requis",
			element: "id"
		};
	}

	try {
		let currentPlaylist: { title?: string; is_private?: boolean } = {};

		if (
			!playlist.title ||
			playlist.is_private === undefined ||
			playlist.is_private === null
		) {
			const currentDetails = await getPlaylistById(playlist.id);
			console.log("Current playlist details fetched:", currentDetails);
			if (currentDetails.success) {
				currentPlaylist = currentDetails.data;
			} else {
				return {
					success: false,
					message:
						"Impossible de récupérer les détails actuels de la playlist"
				};
			}
		}

		console.log("Data being sent to the backend:", {
			id: playlist.id,
			title: playlist.title || currentPlaylist.title,
			is_private:
				playlist.is_private !== undefined &&
				playlist.is_private !== null
					? playlist.is_private
					: currentPlaylist.is_private
		});

		const result = await ApiHelper.put(`/playlists/${playlist.id}`, {
			id: playlist.id,
			title: playlist.title || currentPlaylist.title,
			is_private:
				playlist.is_private !== undefined &&
				playlist.is_private !== null
					? playlist.is_private
					: currentPlaylist.is_private
		});

		console.log("Backend response:", result);

		if (result.success) {
			return {
				success: true,
				message: "Playlist mise à jour avec succès"
			};
		} else {
			return {
				success: false,
				message:
					result.data ||
					"Erreur lors de la mise à jour de la playlist"
			};
		}
	} catch (error) {
		const err = error as any; // Explicitly cast error to 'any'
		console.error("Error during updatePlaylist:", err);
		return {
			success: false,
			message:
				err.message || "Erreur lors de la mise à jour de la playlist"
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
		const stringUserId = String(userId);
		const result = await ApiHelper.get(`/playlists/user/${stringUserId}`);
		return {
			success: true,
			data: result.data
		};
	} catch (error) {
		console.error(
			"Error in getUserPlaylists:",
			(error as any).response?.data || (error as any).message
		);
		return {
			success: false,
			message:
				(error as any).message ||
				"Erreur lors de la récupération des playlists"
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
			(error as any).response?.data || (error as any).message
		);
		return {
			success: false,
			message:
				(error as any).message ||
				"Erreur lors de l'ajout du média à la playlist"
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
		const stringPlaylistId = String(playlistId);
		const result = await ApiHelper.get(
			`/playlists/${stringPlaylistId}/media_list`
		);
		return {
			success: true,
			data: Array.isArray(result.data) ? result.data : []
		};
	} catch (error) {
		console.error(
			"Error in getMediaInPlaylist:",
			(error as any).response?.data ||
				(error as any).message ||
				"Unknown error"
		);
		return {
			success: false,
			message:
				(error as any).message ||
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
			(error as any).response?.data || (error as any).message
		);
		return {
			success: false,
			message:
				(error as any).message ||
				"Erreur lors de la récupération de la playlist"
		};
	}
}

export async function deleteMediaFromPlaylist(
	playlistId: string,
	mediaId: number
) {
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
		const result = await ApiHelper.delete(
			`/playlists/${playlistId}/media/${mediaId}`
		);
		return {
			success: true,
			message: "Média supprimé de la playlist avec succès"
		};
	} catch (error) {
		console.error(
			"Error in deleteMediaFromPlaylist:",
			(error as any).response?.data || (error as any).message
		);
		return {
			success: false,
			message:
				(error as any).message ||
				"Erreur lors de la suppression du média de la playlist"
		};
	}
}
