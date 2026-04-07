import React, { useState, useEffect } from "react";
import {
	View,
	Image,
	Text,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
	Animated,
	RefreshControl,
	StyleSheet
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { postFeedback } from "@/src/services/ReviewService";

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

interface Emotion {
	id: number;
	label: string;
	value: string;
	color: string;
}

interface MovieListProps {
	movies: Movie[];
	loading: boolean;
	error: string | null;
	selectedEmotion: Emotion | null;
	userId: string;
	onRetry: () => void;
	onBack: () => void;
	refreshing: boolean;
	onRefresh: () => void;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieItem = ({
	item,
	emotionColor,
	userId,
	onDislike,
	isVisible,
	onShow,
	onHide
}: {
	item: Movie;
	emotionColor: string;
	userId: string;
	onDislike: (movieId: number) => void;
	isVisible: boolean;
	onShow: () => void;
	onHide: () => void;
}) => {
	const [feedbackSent, setFeedbackSent] = useState<"like" | "dislike" | null>(
		null
	);
	const fadeAnim = useState(new Animated.Value(0))[0];

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: isVisible ? 1 : 0,
			duration: 200,
			useNativeDriver: true
		}).start(() => {
			if (!isVisible) setFeedbackSent(null);
		});
	}, [isVisible]);

	const handleFeedback = async (type: "like" | "dislike") => {
		const rating = type === "like" ? 8 : 2;
		setFeedbackSent(type);

		try {
			await postFeedback(item.id, userId, rating);
			if (type === "dislike") {
				setTimeout(() => {
					onHide();
					onDislike(item.id);
				}, 500);
			} else {
				setTimeout(onHide, 800);
			}
		} catch (err) {
			console.error("Erreur feedback:", err);
			onHide();
		}
	};

	return (
		<View style={cardStyles.card}>
			<Link
				href={{
					pathname: "/(app)/(tabs)/movie/[id]",
					params: { id: item.id }
				}}
				asChild>
				<TouchableOpacity
					onLongPress={onShow}
					activeOpacity={0.9}
					style={{ flex: 1 }}>
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
			</Link>

			{isVisible && (
				<TouchableOpacity
					style={StyleSheet.absoluteFill}
					activeOpacity={1}
					onPress={onHide}>
					<Animated.View
						style={[cardStyles.overlay, { opacity: fadeAnim }]}>
						{feedbackSent === null ? (
							<View style={cardStyles.feedbackButtons}>
								<TouchableOpacity
									style={[
										cardStyles.feedbackBtn,
										cardStyles.dislikeBtn
									]}
									onPress={() => handleFeedback("dislike")}>
									<Ionicons
										name="close"
										size={32}
										color="#fff"
									/>
								</TouchableOpacity>

								<TouchableOpacity
									style={[
										cardStyles.feedbackBtn,
										{ backgroundColor: emotionColor }
									]}
									onPress={() => handleFeedback("like")}>
									<Ionicons
										name="heart"
										size={32}
										color="#fff"
									/>
								</TouchableOpacity>
							</View>
						) : (
							<View style={cardStyles.feedbackConfirm}>
								<Ionicons
									name={
										feedbackSent === "like"
											? "heart"
											: "close-circle"
									}
									size={56}
									color={
										feedbackSent === "like"
											? emotionColor
											: "#ff4444"
									}
								/>
							</View>
						)}
					</Animated.View>
				</TouchableOpacity>
			)}
		</View>
	);
};

const MovieList: React.FC<MovieListProps> = ({
	movies,
	loading,
	error,
	selectedEmotion,
	userId,
	onRetry,
	onBack,
	refreshing,
	onRefresh
}) => {
	const [visibleMovies, setVisibleMovies] = useState<Movie[]>(movies);
	const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

	useEffect(() => {
		setVisibleMovies(movies);
	}, [movies]);

	const handleDislike = (movieId: number) => {
		setVisibleMovies((prev) => prev.filter((m) => m.id !== movieId));
		if (activeMovieId === movieId) setActiveMovieId(null);
	};

	const renderMovieItem = ({ item }: { item: Movie }) => (
		<MovieItem
			item={item}
			emotionColor={selectedEmotion?.color ?? "#ffffff"}
			userId={userId}
			onDislike={handleDislike}
			isVisible={activeMovieId === item.id}
			onShow={() => setActiveMovieId(item.id)}
			onHide={() => setActiveMovieId(null)}
		/>
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
					onPress={onBack}>
					<Ionicons name="arrow-back" size={24} color="#fff" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					Films pour : {selectedEmotion?.label || ""}
				</Text>
			</View>

			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size="large"
						color={selectedEmotion?.color ?? "#fff"}
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
					data={visibleMovies}
					renderItem={renderMovieItem}
					keyExtractor={(item) => item.id.toString()}
					numColumns={2}
					contentContainerStyle={styles.moviesList}
					columnWrapperStyle={styles.columnWrapper}
					extraData={activeMovieId}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				/>
			)}
		</View>
	);
};

const cardStyles = StyleSheet.create({
	card: {
		width: "48%",
		marginVertical: 6,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "#1a1a1a",
		minHeight: 250
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.85)",
		alignItems: "center",
		justifyContent: "center"
	},
	feedbackButtons: { flexDirection: "row", gap: 20 },
	feedbackBtn: {
		width: 55,
		height: 55,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center"
	},
	dislikeBtn: { backgroundColor: "#ff4444" },
	feedbackConfirm: { alignItems: "center", justifyContent: "center" }
});

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: "#0A1E38"
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		flex: 1,
		textAlign: "center",
		marginRight: 44
	},
	backButton: {
		width: 44,
		height: 44,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	moviesList: { padding: 10, paddingBottom: 60 },
	columnWrapper: { justifyContent: "space-between" },
	poster: { width: "100%", aspectRatio: 2 / 3 },
	noPoster: {
		width: "100%",
		height: 200,
		backgroundColor: "#0f2c53",
		justifyContent: "center",
		alignItems: "center"
	},
	noPosterText: { color: "#fff" },
	movieTitle: { padding: 10, fontSize: 14, fontWeight: "600", color: "#fff" },
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: { marginTop: 10, color: "#fff" },
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	errorText: { color: "#ff6b6b", textAlign: "center", marginBottom: 20 },
	retryButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 4
	},
	retryButtonText: { color: "#fff", fontWeight: "600" }
});

export default MovieList;
