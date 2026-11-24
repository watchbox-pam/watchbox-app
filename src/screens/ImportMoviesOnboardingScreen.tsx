import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import ImportMovies, {
	ImportProvider
} from "@/src/components/Param/ImportMovies";
import { fetchMovieImportOptions } from "@/src/services/ProviderService";
import { UploadFileToPlaylist } from "@/src/services/PlaylistService";
import { pickDocument } from "@/src/utils/pickDocument";
import StyledText from "@/src/components/StyledText";

type ImportOption = {
	id: number;
	name: string;
	logo_path: string;
};

const ImportMoviesOnboardingScreen = () => {
	const [movieImports, setMovieImports] = useState<ImportOption[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isImporting, setIsImporting] = useState(false);

	useEffect(() => {
		const loadImportOptions = async () => {
			const result = await fetchMovieImportOptions();
			if (result.success && Array.isArray(result.data)) {
				setMovieImports(result.data);
			} else {
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: "Impossible de récupérer les options d'importation"
				});
			}
			setIsLoading(false);
		};

		loadImportOptions();
	}, []);

	const handleImportProvider = async (provider: ImportProvider) => {
		let mimeType: string;
		switch (provider) {
			case ImportProvider.Netflix:
				mimeType = "text/comma-separated-values";
				break;
			case ImportProvider.Letterboxd:
				mimeType = "application/zip";
				break;
			default:
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: "Ce service d'importation n'est pas pris en charge"
				});
				return;
		}

		setIsImporting(true);
		try {
			const file = await pickDocument(mimeType);
			if (!file) return;

			if (!file.uri || !file.mimeType || !file.name) {
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: "Fichier invalide"
				});
				return;
			}

			const result = await UploadFileToPlaylist(
				file.uri,
				file.mimeType,
				file.name,
				provider.toString()
			);
			if (!result.success) {
				Toast.show({
					type: "error",
					text1: "Erreur d'importation",
					text2: result.message
				});
				return;
			}

			Toast.show({
				type: "success",
				text1: "Importation terminée",
				text2: result.message
			});
			router.replace("/");
		} catch {
			Toast.show({
				type: "error",
				text1: "Erreur d'importation",
				text2: "Impossible d'importer ce fichier"
			});
		} finally {
			setIsImporting(false);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.content}>
				<StyledText style={styles.title}>Bienvenue sur WatchBox !</StyledText>
				<Text style={styles.description}>
					Vous pouvez importer vos films depuis un service que vous
					utilisez déjà. Cette étape est facultative.
				</Text>

				{isLoading ? (
					<ActivityIndicator
						size="large"
						color="#fff"
						style={styles.loader}
					/>
				) : (
					<ImportMovies
						movieImports={movieImports}
						onImportProvider={handleImportProvider}
						isLoading={isImporting}
					/>
				)}

				<TouchableOpacity
					accessibilityRole="button"
					style={styles.skipButton}
					disabled={isImporting}
					onPress={() => router.replace("/")}>
					<Text style={styles.skipText}>Passer et découvrir WatchBox</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#0A1E38"
	},
	content: {
		width: "100%",
		maxWidth: 520,
		alignSelf: "center"
	},
	title: {
		color: "#fff",
		fontSize: 28,
		textAlign: "center",
		marginBottom: 12
	},
	description: {
		color: "#fff",
		fontSize: 16,
		lineHeight: 24,
		textAlign: "center",
		marginBottom: 28
	},
	loader: {
		marginVertical: 28
	},
	skipButton: {
		alignItems: "center",
		paddingVertical: 16
	},
	skipText: {
		color: "#fff",
		fontSize: 16,
		textDecorationLine: "underline"
	}
});

export default ImportMoviesOnboardingScreen;
