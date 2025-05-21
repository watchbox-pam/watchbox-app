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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120;

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

export default function SwipeScreen() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadMovies = async () => {
			const res = await fetchMovies();
			setMovies(res);
			setLoading(false);
		};

		loadMovies();
	}, []);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
	const [dislikedMovies, setDislikedMovies] = useState<Movie[]>([]);

	const position = useRef(new Animated.ValueXY()).current;
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

	const nextCardOpacity = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: [1, 0.5, 1],
		extrapolate: "clamp"
	});

	const nextCardScale = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: [1, 0.8, 1],
		extrapolate: "clamp"
	});

	const handleSwipeComplete = (direction: string) => {
		if (movies.length === 0) return;

		const item = movies[currentIndex % movies.length];
		if (!item) return;

		if (direction === "right") {
			setLikedMovies((prev) => [...prev, item]);
		} else {
			setDislikedMovies((prev) => [...prev, item]);
		}

		setCurrentIndex((prev) => (prev + 1) % movies.length);
		position.setValue({ x: 0, y: 0 });
	};

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, gestureState) => {
				position.setValue({ x: gestureState.dx, y: gestureState.dy });
			},
			onPanResponderRelease: (evt, gestureState) => {
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

	const handleButtonPress = (direction: string) => {
		Animated.spring(position, {
			toValue: {
				x:
					direction === "right"
						? SCREEN_WIDTH + 100
						: -SCREEN_WIDTH - 100,
				y: 0
			},
			useNativeDriver: false
		}).start(() => {
			handleSwipeComplete(direction);
		});
	};

	const renderCards = () => {
		if (movies.length === 0) {
			return (
				<View style={styles.endContainer}>
					<Text style={styles.endText}>Aucun film disponible.</Text>
				</View>
			);
		}

		// Affiche 3 cartes à la fois : current, next et next +1, en boucle
		const cards = [];
		for (let i = 0; i < movies.length; i++) {
			const index = (currentIndex + i) % movies.length;
			const movie = movies[index];
			const posterUri = movie.poster_path
				? movie.poster_path.startsWith("http")
					? movie.poster_path
					: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
				: "https://via.placeholder.com/300x450?text=Pas+d'image";

			if (i === 0) {
				// carte active (swipe)
				cards.push(
					<Animated.View
						key={movie.id}
						style={[
							styles.card,
							{
								transform: [
									{ translateX: position.x },
									{ translateY: position.y },
									{ rotate: rotate }
								],
								zIndex: 3
							}
						]}
						{...panResponder.panHandlers}>
						<Image
							source={{ uri: posterUri }}
							style={styles.posterImage}
						/>
						<Text style={styles.movieTitle}>{movie.title}</Text>

						<Animated.View
							style={[
								styles.likeLabel,
								{ opacity: likeOpacity }
							]}>
							<Text style={styles.likeLabelText}>LIKE</Text>
						</Animated.View>

						<Animated.View
							style={[
								styles.dislikeLabel,
								{ opacity: dislikeOpacity }
							]}>
							<Text style={styles.dislikeLabelText}>NOPE</Text>
						</Animated.View>
					</Animated.View>
				);
			} else {
				// cartes suivantes, derrière avec opacité et scale
				cards.push(
					<Animated.View
						key={movie.id}
						style={[
							styles.card,
							{
								opacity: nextCardOpacity,
								transform: [{ scale: nextCardScale }],
								zIndex: 3 - i,
								shadowOpacity: 0
							}
						]}>
						<Image
							source={{ uri: posterUri }}
							style={styles.posterImage}
						/>
						<Text style={styles.movieTitle}>{movie.title}</Text>
					</Animated.View>
				);
			}
		}

		// Inverse l'ordre pour que la carte active soit au-dessus
		return cards.reverse();
	};

	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				{loading ? (
					<Text style={{ color: "white" }}>Chargement...</Text>
				) : (
					renderCards()
				)}
			</View>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.dislikeButton}
					onPress={() => handleButtonPress("left")}>
					<Text style={styles.buttonText}>✗</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.likeButton}
					onPress={() => handleButtonPress("right")}>
					<Text style={styles.buttonText}>♥</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
