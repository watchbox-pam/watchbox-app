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
import styles from "@/src/styles/MovieListStyle";

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
	onDislike
}: {
	item: Movie;
	emotionColor: string;
	userId: string;
	onDislike: (movieId: number) => void;
}) => {
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedbackSent, setFeedbackSent] = useState<"like" | "dislike" | null>(
		null
	);
	const fadeAnim = useState(new Animated.Value(0))[0];

	const showOverlay = () => {
		setShowFeedback(true);
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true
		}).start();
	};

	const hideOverlay = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true
		}).start(() => {
			setShowFeedback(false);
			setFeedbackSent(null);
		});
	};

	const handleFeedback = async (type: "like" | "dislike") => {
		const rating = type === "like" ? 8 : 2;
		setFeedbackSent(type);
		await postFeedback(item.id, userId, rating);
		if (type === "dislike") {
			setTimeout(() => onDislike(item.id), 500);
		} else {
			setTimeout(hideOverlay, 800);
		}
	};

	return (
		<TouchableOpacity
			onLongPress={showOverlay}
			onPress={showFeedback ? hideOverlay : undefined}
			activeOpacity={0.9}
			style={cardStyles.card}>
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

			{showFeedback && (
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
								<Ionicons name="close" size={32} color="#fff" />
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									cardStyles.feedbackBtn,
									{ backgroundColor: emotionColor }
								]}
								onPress={() => handleFeedback("like")}>
								<Ionicons name="heart" size={32} color="#fff" />
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
			)}

			<Link
				href={{
					pathname: "/(app)/(tabs)/movie/[id]",
					params: { id: item.id }
				}}
				style={styles.movieCard}>
				<Text style={styles.movieTitle} numberOfLines={2}>
					{item.title}
				</Text>
			</Link>
		</TouchableOpacity>
	);
};

const cardStyles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 6,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "#1a1a1a"
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.7)",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10
	},
	feedbackButtons: {
		flexDirection: "row",
		gap: 24
	},
	feedbackBtn: {
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center"
	},
	dislikeBtn: {
		backgroundColor: "#ff4444"
	},
	feedbackConfirm: {
		alignItems: "center",
		justifyContent: "center"
	}
});

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

	useEffect(() => {
		setVisibleMovies(movies);
	}, [movies]);

	const handleDislike = (movieId: number) => {
		setVisibleMovies((prev) => prev.filter((m) => m.id !== movieId));
	};

	const renderMovieItem = ({ item }: { item: Movie }) => (
		<MovieItem
			item={item}
			emotionColor={selectedEmotion?.color ?? "#ffffff"}
			userId={userId}
			onDislike={handleDislike}
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
					onPress={onBack}
					activeOpacity={0.7}>
					<Ionicons name="arrow-back" size={24} color="#ffffff" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					Films pour : {selectedEmotion?.label || ""}
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
					data={visibleMovies}
					renderItem={renderMovieItem}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={styles.moviesList}
					numColumns={2}
					showsVerticalScrollIndicator={true}
					columnWrapperStyle={styles.columnWrapper}
					extraData={visibleMovies}
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

export default MovieList;
