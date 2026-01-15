import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	Image,
	Animated,
	PanResponder,
	TouchableOpacity,
	Dimensions
} from "react-native";

import styles from "@/src/styles/SwipeStyle";
import { fetchMovies } from "../services/SwipeService";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 120;
const SWIPE_VERTICAL_THRESHOLD = 100;

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

export default function SwipeScreen() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<Movie[]>([]);
	const [skippedMovies, setSkippedMovies] = useState<Movie[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);

	const router = useRouter();
	const position = useRef(new Animated.ValueXY()).current;
	const tapStartTime = useRef<number>(0);
	const moviesRef = useRef<Movie[]>([]);
	const currentIndexRef = useRef<number>(0);

	useEffect(() => {
		const loadMovies = async () => {
			try {
				const res = await fetchMovies();
				setMovies(res);
			} catch (error) {
				console.error("Erreur lors du chargement des films :", error);
			} finally {
				setLoading(false);
			}
		};

		loadMovies();
	}, []);

	useEffect(() => {
		moviesRef.current = movies;
	}, [movies]);

	useEffect(() => {
		currentIndexRef.current = currentIndex;
	}, [currentIndex]);

	// Reset la position quand l'index change
	useEffect(() => {
		if (currentIndex > 0) {
			position.setValue({ x: 0, y: 0 });
			setIsAnimating(false);
		}
	}, [currentIndex, position]);

	const rotate = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: ["-10deg", "0deg", "10deg"],
		extrapolate: "clamp"
	});
	const likeOpacity = position.x.interpolate({
		inputRange: [0, SCREEN_WIDTH / 4],
		outputRange: [0, 1],
		extrapolate: "clamp"
	});
	const dislikeOpacity = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 4, 0],
		outputRange: [1, 0],
		extrapolate: "clamp"
	});

	const skipOpacity = position.y.interpolate({
		inputRange: [-SCREEN_WIDTH / 4, 0],
		outputRange: [1, 0],
		extrapolate: "clamp"
	});

	// Gérer le résultat d'un swipe
	const handleSwipeComplete = (direction: string) => {
		const item = movies[currentIndex];

		if (direction === "right") {
			setLikedMovies((prev) => [...prev, item]);
		} else if (direction === "left") {
			setDislikedMovies((prev) => [...prev, item]);
		} else {
			setSkippedMovies((prev) => [...prev, item]);
		}

		setCurrentIndex((prev) => prev + 1);
		position.setValue({ x: 0, y: 0 });
	};

	// Configuration du PanResponder pour gérer les mouvements
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				tapStartTime.current = Date.now();
			},
			onPanResponderMove: (evt, gestureState) => {
				position.setValue({ x: gestureState.dx, y: gestureState.dy });
			},
			onPanResponderRelease: (evt, gestureState) => {
				const tapDuration = Date.now() - tapStartTime.current;

				// Détecter un simple tap
				const isClick =
					Math.abs(gestureState.dx) < 10 &&
					Math.abs(gestureState.dy) < 10 &&
					tapDuration < 300;

				if (isClick) {
					// Utiliser les refs pour avoir les valeurs actuelles
					const currentMovie =
						moviesRef.current[currentIndexRef.current];

					if (currentMovie) {
						console.log("Navigating to movie:", currentMovie.id);
						router.push({
							pathname: "/(app)/(tabs)/movie/[id]",
							params: { id: currentMovie.id.toString() }
						});
						position.setValue({ x: 0, y: 0 });
						return;
					} else {
						console.log(
							"No movie found at index:",
							currentIndexRef.current
						);
					}
				}

				// Gestion normale du swipe
				if (gestureState.dx > SWIPE_THRESHOLD) {
					Animated.spring(position, {
						toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
						useNativeDriver: false
					}).start(() => {
						handleSwipeComplete("right");
					});
				} else if (gestureState.dx < -SWIPE_THRESHOLD) {
					Animated.spring(position, {
						toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
						useNativeDriver: false
					}).start(() => {
						handleSwipeComplete("left");
					});
				} else if (gestureState.dy < -SWIPE_VERTICAL_THRESHOLD) {
					Animated.timing(position, {
						toValue: {
							x: gestureState.dx,
							y: -SCREEN_HEIGHT - 100
						},
						duration: 500,
						useNativeDriver: false
					}).start(() => {
						handleSwipeComplete("up");
					});
				} else {
					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						friction: 4,
						useNativeDriver: false
					}).start();
				}
			}
		})
	).current;

	const handleButtonPress = (direction: "left" | "right" | "up") => {
		if (currentIndex >= movies.length || isAnimating) return;

		setIsAnimating(true);
		let toValue = { x: 0, y: 0 };

		if (direction === "right") {
			toValue = { x: SCREEN_WIDTH + 100, y: 0 };
		} else if (direction === "left") {
			toValue = { x: -SCREEN_WIDTH - 100, y: 0 };
		} else if (direction === "up") {
			toValue = { x: 0, y: -SCREEN_HEIGHT - 100 };
		}

		Animated.timing(position, {
			toValue,
			duration: 2000,
			useNativeDriver: false
		}).start(() => {
			handleSwipeComplete(direction);
			setIsAnimating(false);
		});
	};

	const renderCurrentCard = () => {
		if (currentIndex >= movies.length) return null;

		const movie = movies[currentIndex];
		const posterUri = movie.poster_path
			? movie.poster_path.startsWith("http")
				? movie.poster_path
				: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
			: "https://via.placeholder.com/300x450?text=Pas+d'image";

		return (
			<Animated.View
				key={`current-${movie.id}-${currentIndex}`}
				style={[
					styles.card,
					{
						transform: [
							{ translateX: position.x },
							{ translateY: position.y },
							{ rotate }
						],
						zIndex: 100
					}
				]}
				{...panResponder.panHandlers}>
				<Image source={{ uri: posterUri }} style={styles.posterImage} />
				<Text style={styles.movieTitle}>{movie.title}</Text>

				<Animated.View
					style={[styles.likeLabel, { opacity: likeOpacity }]}>
					<Text style={styles.likeLabelText}>LIKE</Text>
				</Animated.View>

				<Animated.View
					style={[styles.skipLabel, { opacity: skipOpacity }]}>
					<Text style={styles.skipLabelText}>Pas Vue</Text>
				</Animated.View>

				<Animated.View
					style={[styles.dislikeLabel, { opacity: dislikeOpacity }]}>
					<Text style={styles.dislikeLabelText}>NOPE</Text>
				</Animated.View>
			</Animated.View>
		);
	};

	const renderBackgroundCards = () => {
		const cards = [];
		const maxBackgroundCards = 2;

		for (let i = 1; i <= maxBackgroundCards; i++) {
			const index = currentIndex + i;
			if (index >= movies.length) continue;

			const movie = movies[index];
			const posterUri = movie.poster_path
				? movie.poster_path.startsWith("http")
					? movie.poster_path
					: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
				: "https://via.placeholder.com/300x450?text=Pas+d'image";

			const cardScale = 0.95 - i * 0.05;
			const imageOpacity = 0.8 - i * 0.2; // Opacité pour l'image seulement
			const cardOffset = i * 8;

			cards.push(
				<View
					key={`bg-${movie.id}-${index}`}
					style={[
						styles.card,
						{
							transform: [
								{ scale: cardScale },
								{ translateY: cardOffset }
							],
							zIndex: 10 - i
						}
					]}>
					<Image
						source={{ uri: posterUri }}
						style={[
							styles.posterImage,
							{ opacity: imageOpacity } // Appliquer l'opacité seulement à l'image
						]}
					/>
					{/* Le titre reste complètement invisible pour les cartes d'arrière-plan */}
					<View style={{ opacity: 1 }}>
						<Text style={styles.movieTitle}>{movie.title}</Text>
					</View>
				</View>
			);
		}

		return cards;
	};

	const renderCards = () => {
		if (movies.length === 0) {
			return (
				<View style={styles.endContainer}>
					<Text style={styles.endText}>Aucun film disponible.</Text>
				</View>
			);
		}

		if (currentIndex >= movies.length) {
			return (
				<View style={styles.endContainer}>
					<Text style={styles.endText}>Plus de films à swiper !</Text>
					<Text style={styles.endText}>
						Aimés: {likedMovies.length} | Pas aimés:{" "}
						{dislikedMovies.length} | Pas vus:{" "}
						{skippedMovies.length}
					</Text>
				</View>
			);
		}

		return (
			<>
				{renderBackgroundCards()}
				{renderCurrentCard()}
			</>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>{renderCards()}</View>

			{!loading && currentIndex < movies.length && (
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={styles.dislikeButton}
						onPress={() => handleButtonPress("left")}
						disabled={isAnimating}>
						<Text style={styles.buttonText}>👎</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.skipButton}
						onPress={() => handleButtonPress("up")}
						disabled={isAnimating}>
						<Text style={styles.buttonText}>🤔</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.likeButton}
						onPress={() => handleButtonPress("right")}
						disabled={isAnimating}>
						<Text style={styles.buttonText}>👍</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
