import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	SafeAreaView,
	StatusBar,
	Alert,
	Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";

// Define types
interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

interface EmotionOption {
	label: string;
	value: string;
}

// Different base URLs for different environments
const getApiBaseUrl = (): string => {
	if (__DEV__) {
		if (Platform.OS === "android") {
			return "http://10.0.2.2:8000"; // Android emulator
		} else if (Platform.OS === "ios") {
			return "http://localhost:8000"; // iOS simulator
		} else {
			return "http://localhost:8000"; // Web
		}
	} else {
		// Production URL
		return "https://your-production-api.com";
	}
};

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;

const emotions: EmotionOption[] = [
	{ label: "Frisson", value: "frisson" },
	{ label: "Excitation", value: "excitation" },
	{ label: "Émerveillement", value: "emerveillement" },
	{ label: "Rire", value: "rire" },
	{ label: "Romantisme", value: "romantisme" },
	{ label: "Mélancolie", value: "melancolie" },
	{ label: "Réflexion", value: "reflexion" },
	{ label: "Nostalgie", value: "nostalgie" }
];

const RecommendationScreen: React.FC = () => {
	const [selectedEmotion, setSelectedEmotion] = useState<string>("frisson");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [debugInfo, setDebugInfo] = useState<string>("");
	const [networkInfo, setNetworkInfo] = useState<string>(
		"Checking network..."
	);
	const [limit] = useState<number>(10);

	// Check network on component mount
	useEffect(() => {
		checkNetworkStatus();
	}, []);

	// Fetch movies when emotion changes
	useEffect(() => {
		fetchMoviesByEmotion();
	}, [selectedEmotion]);

	const checkNetworkStatus = async (): Promise<void> => {
		try {
			const netInfo = await NetInfo.fetch();
			setNetworkInfo(
				`Connected: ${netInfo.isConnected ? "Yes" : "No"}\n` +
					`Type: ${netInfo.type}\n` +
					`Details: ${JSON.stringify(netInfo.details)}`
			);
		} catch (err) {
			setNetworkInfo(`Error checking network: ${err}`);
		}
	};

	const showDebugAlert = (): void => {
		Alert.alert(
			"Debug Information",
			`API URL: ${API_BASE_URL}\n\n` +
				`Network Info:\n${networkInfo}\n\n` +
				`Debug Log:\n${debugInfo}`,
			[{ text: "OK" }]
		);
	};

	const logDebug = (message: string): void => {
		console.log(message);
		setDebugInfo((prev) => `${prev}\n${message}`);
	};

	const testConnection = async (): Promise<void> => {
		try {
			logDebug(`Testing connection to: ${API_BASE_URL}`);
			setLoading(true);

			// Test OPTIONS request first (good for CORS issues)
			try {
				const optionsResponse = await axios({
					method: "OPTIONS",
					url: `${API_BASE_URL}recommendations/emotion/frisson`,
					timeout: 5000
				});
				logDebug(`OPTIONS response: ${optionsResponse.status}`);
			} catch (err) {
				if (axios.isAxiosError(err)) {
					logDebug(`OPTIONS failed: ${err.message}`);
					// Continue anyway, might be just CORS preflight
				}
			}

			// Now try GET request
			const getResponse = await axios.get(
				`${API_BASE_URL}recommendations/emotion/frisson?limit=1`,
				{
					timeout: 5000
				}
			);

			logDebug(`GET success: ${getResponse.status}`);
			logDebug(
				`Data received: ${JSON.stringify(getResponse.data).substring(0, 100)}...`
			);

			Alert.alert(
				"Connection Test Successful",
				"API connection is working!"
			);
		} catch (err) {
			let errorMsg = "Unknown error";

			if (axios.isAxiosError(err)) {
				errorMsg = `${err.message}\n`;

				if (err.response) {
					// Server responded with non-2xx
					errorMsg += `Status: ${err.response.status}\n`;
					errorMsg += `Data: ${JSON.stringify(err.response.data)}\n`;
					errorMsg += `Headers: ${JSON.stringify(err.response.headers)}`;
				} else if (err.request) {
					// Request made but no response
					errorMsg += "No response received from server";
				}

				logDebug(`Connection test failed: ${errorMsg}`);
			} else {
				logDebug(`Connection test failed with non-Axios error: ${err}`);
			}

			Alert.alert("Connection Test Failed", errorMsg);
		} finally {
			setLoading(false);
		}
	};

	const fetchMoviesByEmotion = async (): Promise<void> => {
		setLoading(true);
		setError(null);

		const apiUrl = `${API_BASE_URL}recommendations/emotion/${selectedEmotion}?limit=${limit}`;
		logDebug(`Fetching from: ${apiUrl}`);

		try {
			const response = await axios.get<Movie[]>(apiUrl, {
				timeout: 10000, // 10 second timeout
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});

			logDebug(`Response status: ${response.status}`);
			logDebug(
				`Response data (sample): ${JSON.stringify(response.data).substring(0, 100)}...`
			);

			setMovies(response.data);
		} catch (err) {
			let errorDetails = "";

			if (axios.isAxiosError(err)) {
				errorDetails = `${err.message} (${err.code || "no code"})`;

				if (err.response) {
					// Server responded with error
					errorDetails += `\nStatus: ${err.response.status}`;
					errorDetails += `\nData: ${JSON.stringify(err.response.data)}`;
				} else if (err.request) {
					// Request made but no response
					errorDetails += "\nNo response received from server";

					if (Platform.OS === "android") {
						errorDetails +=
							"\n\nTip: If using Android emulator, try using http://10.0.2.2:8000 instead of localhost";
					}
				}
			} else {
				errorDetails = `${err}`;
			}

			logDebug(`Error fetching: ${errorDetails}`);
			setError(
				`Impossible de charger les recommandations. ${errorDetails}`
			);
		} finally {
			setLoading(false);
			checkNetworkStatus(); // Check network again after attempt
		}
	};

	const handleMoviePress = (movie: Movie): void => {
		// Handle movie selection (e.g., show details modal)
		console.log("Selected movie:", movie);
	};

	const renderMovieItem = ({ item }: { item: Movie }) => (
		<TouchableOpacity
			style={styles.movieCard}
			onPress={() => handleMoviePress(item)}>
			{item.poster_path ? (
				<Image
					source={{
						uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
					}}
					style={styles.poster}
				/>
			) : (
				<View style={styles.noPoster}>
					<Text style={styles.noPosterText}>No Image</Text>
				</View>
			)}
			<Text style={styles.movieTitle} numberOfLines={2}>
				{item.title}
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.header}>
				<Text style={styles.headerTitle}>Recommendations de Films</Text>
				<Text style={styles.headerSubtitle}>
					Basées sur votre humeur
				</Text>
				<TouchableOpacity
					onPress={showDebugAlert}
					style={styles.debugButton}>
					<Text style={styles.debugButtonText}>Debug Info</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.debugBar}>
				<Text style={styles.debugText}>API: {API_BASE_URL}</Text>
				<TouchableOpacity
					onPress={testConnection}
					style={styles.testButton}>
					<Text style={styles.testButtonText}>Test API</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.emotionSelector}>
				<Text style={styles.label}>
					Comment vous sentez-vous aujourd'hui ?
				</Text>
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={selectedEmotion}
						onValueChange={(itemValue) =>
							setSelectedEmotion(itemValue)
						}
						style={styles.picker}>
						{emotions.map((emotion) => (
							<Picker.Item
								key={emotion.value}
								label={emotion.label}
								value={emotion.value}
							/>
						))}
					</Picker>
				</View>
			</View>

			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text style={styles.loadingText}>
						Recherche de films...
					</Text>
				</View>
			) : error ? (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
					<TouchableOpacity
						style={styles.retryButton}
						onPress={fetchMoviesByEmotion}>
						<Text style={styles.retryButtonText}>Réessayer</Text>
					</TouchableOpacity>
				</View>
			) : (
				<>
					<Text style={styles.resultsText}>
						Films pour l'émotion:{" "}
						<Text style={styles.emotionText}>
							{
								emotions.find(
									(e) => e.value === selectedEmotion
								)?.label
							}
						</Text>
					</Text>

					<FlatList
						data={movies}
						renderItem={renderMovieItem}
						keyExtractor={(item) => item.id.toString()}
						contentContainerStyle={styles.moviesList}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<View style={styles.emptyContainer}>
								<Text style={styles.emptyText}>
									Aucun film trouvé
								</Text>
							</View>
						}
					/>
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5"
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#eaeaea",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333"
	},
	headerSubtitle: {
		fontSize: 16,
		color: "#666",
		marginTop: 4
	},
	debugButton: {
		backgroundColor: "#f0f0f0",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4
	},
	debugButtonText: {
		color: "#666",
		fontSize: 12
	},
	debugBar: {
		backgroundColor: "#333",
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	debugText: {
		color: "#fff",
		fontSize: 12
	},
	testButton: {
		backgroundColor: "#555",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4
	},
	testButtonText: {
		color: "#fff",
		fontSize: 12
	},
	emotionSelector: {
		backgroundColor: "#fff",
		padding: 20,
		marginBottom: 10
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: "#333"
	},
	pickerContainer: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		backgroundColor: "#f9f9f9"
	},
	picker: {
		height: 50
	},
	resultsText: {
		fontSize: 16,
		color: "#555",
		marginHorizontal: 20,
		marginVertical: 10
	},
	emotionText: {
		fontWeight: "bold",
		color: "#0066cc"
	},
	moviesList: {
		padding: 10
	},
	movieCard: {
		flex: 1,
		margin: 8,
		backgroundColor: "#fff",
		borderRadius: 8,
		overflow: "hidden",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		maxWidth: "47%"
	},
	poster: {
		width: "100%",
		height: 200,
		resizeMode: "cover"
	},
	noPoster: {
		width: "100%",
		height: 200,
		backgroundColor: "#ddd",
		justifyContent: "center",
		alignItems: "center"
	},
	noPosterText: {
		color: "#888"
	},
	movieTitle: {
		padding: 10,
		fontSize: 14,
		fontWeight: "600",
		color: "#333"
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: {
		marginTop: 10,
		color: "#555"
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	errorText: {
		color: "#d32f2f",
		textAlign: "center",
		marginBottom: 20
	},
	retryButton: {
		backgroundColor: "#0066cc",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 4
	},
	retryButtonText: {
		color: "#fff",
		fontWeight: "600"
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 40
	},
	emptyText: {
		color: "#666",
		fontSize: 16,
		textAlign: "center"
	}
});

export default RecommendationScreen;
