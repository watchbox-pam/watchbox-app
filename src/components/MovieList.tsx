import React from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

interface Emotion {
	id: number;
	label: string;
	value: string;
	startAngle: number;
	endAngle: number;
	color: string;
}

interface MovieListProps {
	movies: Movie[];
	loading: boolean;
	error: string | null;
	selectedEmotion: Emotion | null;
	onRetry: () => void;
	onBack: () => void;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList: React.FC<MovieListProps> = ({
	movies,
	loading,
	error,
	selectedEmotion,
	onRetry,
	onBack
}) => {
	const renderMovieItem = ({ item }: { item: Movie }) => (
		<TouchableOpacity
			style={styles.movieCard}
			onPress={() => console.log("Selected movie:", item)}>
			{item.poster_path ? (
				<Image
					source={{
						uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
					}}
					style={styles.poster}
				/>
			) : (
				<View style={styles.noPoster}>
					<Text style={styles.noPosterText}>Pas d'image</Text>
				</View>
			)}
			<Text style={styles.movieTitle} numberOfLines={2}>
				{item.title}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={[
						styles.backButton,
						selectedEmotion
							? { backgroundColor: selectedEmotion.color }
							: {}
					]}
					onPress={onBack}
					activeOpacity={0.7}>
					<Text style={styles.backButtonText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					Films pour: {selectedEmotion?.label || ""}
				</Text>
			</View>

			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size="large"
						color={
							selectedEmotion ? selectedEmotion.color : "#ffffff"
						}
					/>
					<Text style={styles.loadingText}>
						Recherche de films...
					</Text>
				</View>
			) : error ? (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
					<TouchableOpacity
						style={[
							styles.retryButton,
							selectedEmotion
								? { backgroundColor: selectedEmotion.color }
								: {}
						]}
						onPress={onRetry}>
						<Text style={styles.retryButtonText}>Réessayer</Text>
					</TouchableOpacity>
				</View>
			) : (
				<FlatList
					data={movies}
					renderItem={renderMovieItem}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={styles.moviesList}
					numColumns={2}
					showsVerticalScrollIndicator={true}
					showsHorizontalScrollIndicator={false}
					columnWrapperStyle={styles.columnWrapper}
					extraData={movies}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: "#0A1E38"
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		flex: 1,
		textAlign: "center",
		marginRight: 44
	},
	backButton: {
		padding: 0,
		borderRadius: 30,
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
		display: "flex"
	},
	backButtonText: {
		color: "#ffffff",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 24,
		includeFontPadding: false,
		textAlignVertical: "center"
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: {
		marginTop: 10,
		color: "#ffffff"
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	errorText: {
		color: "#ff6b6b",
		textAlign: "center",
		marginBottom: 20
	},
	retryButton: {
		backgroundColor: "#4a69bd",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 4
	},
	retryButtonText: {
		color: "#fff",
		fontWeight: "600"
	},
	moviesList: {
		padding: 10,
		paddingBottom: 60
	},
	columnWrapper: {
		justifyContent: "space-between"
	},
	movieCard: {
		flex: 1,
		margin: 8,
		backgroundColor: "#143b6f",
		borderRadius: 8,
		overflow: "hidden",
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
		backgroundColor: "#0f2c53",
		justifyContent: "center",
		alignItems: "center"
	},
	noPosterText: {
		color: "#ffffff"
	},
	movieTitle: {
		padding: 10,
		fontSize: 14,
		fontWeight: "600",
		color: "#ffffff"
	}
});

export default MovieList;
