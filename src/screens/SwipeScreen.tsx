import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Animated,
	PanResponder,
	TouchableOpacity,
	Dimensions
} from "react-native";
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
								top: 10 * i, // légère translation verticale
								zIndex: 3 - i
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		paddingTop: 50
	},
	cardContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	card: {
		position: "absolute",
		width: SCREEN_WIDTH * 0.9,
		height: SCREEN_WIDTH * 1.5,
		borderRadius: 20,
		backgroundColor: "#143b71",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
		overflow: "hidden"
	},
	posterImage: {
		width: "100%",
		height: "85%"
	},
	movieTitle: {
		fontSize: 24,
		color: "white",
		padding: 10,
		textAlign: "center"
	},
	likeLabel: {
		position: "absolute",
		top: 40,
		left: 40,
		borderWidth: 3,
		borderColor: "green",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "rgba(0,255,0,0.2)",
		transform: [{ rotate: "-20deg" }]
	},
	likeLabelText: {
		color: "green",
		fontWeight: "800",
		fontSize: 32
	},
	dislikeLabel: {
		position: "absolute",
		top: 40,
		right: 40,
		borderWidth: 3,
		borderColor: "red",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "rgba(255,0,0,0.2)",
		transform: [{ rotate: "20deg" }]
	},
	dislikeLabelText: {
		color: "red",
		fontWeight: "800",
		fontSize: 32
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingBottom: 30
	},
	likeButton: {
		backgroundColor: "green",
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	dislikeButton: {
		backgroundColor: "red",
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	buttonText: {
		fontSize: 32,
		color: "white"
	},
	endContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	endText: {
		color: "white",
		fontSize: 22
	}
});
