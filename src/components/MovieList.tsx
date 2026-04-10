import React, { useState, useEffect, useRef, useCallback } from "react";
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
	onMovieRemoved: (movieId: number) => void;
	onRated: () => void;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieItem = React.memo(
	({
		item,
		emotionColor,
		userId,
		onRemove,
		onMovieRemoved,
		onRated,
		isVisible,
		onShow,
		onHide
	}: {
		item: Movie;
		emotionColor: string;
		userId: string;
		onRemove: (movieId: number) => void;
		onMovieRemoved: (movieId: number) => void;
		onRated: () => void;
		isVisible: boolean;
		onShow: () => void;
		onHide: () => void;
	}) => {
		const [feedbackSent, setFeedbackSent] = useState<
			"like" | "dislike" | null
		>(null);
		// Correction : useRef au lieu de useState pour Animated.Value
		const fadeAnim = useRef(new Animated.Value(0)).current;

		useEffect(() => {
			Animated.timing(fadeAnim, {
				toValue: isVisible ? 1 : 0,
				duration: 200,
				useNativeDriver: true
			}).start(() => {
				if (!isVisible) setFeedbackSent(null);
			});
		}, [isVisible, fadeAnim]);

		const handleFeedback = async (type: "like" | "dislike") => {
			const rating = type === "like" ? 8 : 2;
			setFeedbackSent(type);

			try {
				await postFeedback(item.id, userId, rating);
				onMovieRemoved(item.id);
				onRemove(item.id);
				setTimeout(() => {
					onHide();
					onRated();
				}, 600);
			} catch (err) {
				console.error("Erreur feedback:", err);
				onHide();
			}
		};

		return (
			<View style={styles.card}>
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
								<Text style={styles.noPosterText}>
									Pas d'image
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</Link>

				{isVisible && (
					<TouchableOpacity
						style={StyleSheet.absoluteFill}
						activeOpacity={1}
						onPress={onHide}>
						<Animated.View
							style={[styles.overlay, { opacity: fadeAnim }]}>
							{feedbackSent === null ? (
								<View style={styles.feedbackButtons}>
									<TouchableOpacity
										style={[
											styles.feedbackBtn,
											styles.dislikeBtn
										]}
										onPress={() =>
											handleFeedback("dislike")
										}>
										<Ionicons
											name="close"
											size={32}
											color="#fff"
										/>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.feedbackBtn,
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
								<View style={styles.feedbackConfirm}>
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
	}
);

const MovieList: React.FC<MovieListProps> = ({
	movies,
	loading,
	error,
	selectedEmotion,
	userId,
	onRetry,
	onBack,
	refreshing,
	onRefresh,
	onMovieRemoved,
	onRated
}) => {
	const [visibleMovies, setVisibleMovies] = useState<Movie[]>(movies);
	const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

	useEffect(() => {
		setVisibleMovies(movies);
	}, [movies]);

	const handleRemove = useCallback((movieId: number) => {
		setVisibleMovies((prev) => prev.filter((m) => m.id !== movieId));
		setActiveMovieId((current) => (current === movieId ? null : current));
	}, []);

	const handleShow = useCallback((id: number) => {
		setActiveMovieId(id);
	}, []);

	const handleHide = useCallback(() => {
		setActiveMovieId(null);
	}, []);

	const renderMovieItem = useCallback(
		({ item }: { item: Movie }) => (
			<MovieItem
				item={item}
				emotionColor={selectedEmotion?.color ?? "#ffffff"}
				userId={userId}
				onRemove={handleRemove}
				onMovieRemoved={onMovieRemoved}
				onRated={onRated}
				isVisible={activeMovieId === item.id}
				onShow={() => handleShow(item.id)}
				onHide={handleHide}
			/>
		),
		[
			selectedEmotion,
			userId,
			handleRemove,
			onMovieRemoved,
			onRated,
			activeMovieId,
			handleShow,
			handleHide
		]
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

export default MovieList;
