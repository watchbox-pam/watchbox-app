import React, { useState, useRef } from "react";
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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120;

export default function App() {
	// Liste de films exemple
	const [movies, setMovies] = useState([
		{
			id: "1",
			title: "Inception",
			image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
		},
		{
			id: "2",
			title: "The Dark Knight",
			image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
		},
		{
			id: "3",
			title: "Interstellar",
			image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
		},
		{
			id: "4",
			title: "Pulp Fiction",
			image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
		},
		{
			id: "5",
			title: "The Godfather",
			image: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
		}
	]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedMovies, setLikedMovies] = useState([]);
	const [dislikedMovies, setDislikedMovies] = useState([]);

	// Animation pour le swipe
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

	// Gérer le résultat d'un swipe
	const handleSwipeComplete = (direction: string) => {
		const item = movies[currentIndex];

		if (direction === "right") {
			setLikedMovies((prev) => [...prev, item]);
			console.log("Liked: ", item.title);
		} else {
			setDislikedMovies((prev) => [...prev, item]);
			console.log("Disliked: ", item.title);
		}

		setCurrentIndex((prev) => prev + 1);
		position.setValue({ x: 0, y: 0 });
	};

	// Configuration du PanResponder pour gérer les mouvements
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

	// Fonction pour liker ou disliker via les boutons
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

	// Rendu des cartes
	const renderCards = () => {
		if (currentIndex >= movies.length) {
			return (
				<View style={styles.endContainer}>
					<Text style={styles.endText}>
						Vous avez parcouru tous les films!
					</Text>
					<Text style={styles.endSubText}>
						Films aimés: {likedMovies.length}
					</Text>
					<Text style={styles.endSubText}>
						Films non aimés: {dislikedMovies.length}
					</Text>
					<TouchableOpacity
						style={styles.resetButton}
						onPress={() => {
							setCurrentIndex(0);
							setLikedMovies([]);
							setDislikedMovies([]);
						}}>
						<Text style={styles.resetButtonText}>Recommencer</Text>
					</TouchableOpacity>
				</View>
			);
		}

		return movies
			.map((movie, index) => {
				if (index < currentIndex) {
					return null;
				}

				if (index === currentIndex) {
					return (
						<Animated.View
							key={movie.id}
							style={[
								styles.card,
								{
									transform: [
										{ translateX: position.x },
										{ translateY: position.y },
										{ rotate: rotate }
									]
								}
							]}
							{...panResponder.panHandlers}>
							<Image
								source={{ uri: movie.image }}
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
								<Text style={styles.dislikeLabelText}>
									NOPE
								</Text>
							</Animated.View>
						</Animated.View>
					);
				}

				if (index === currentIndex + 1) {
					return (
						<Animated.View
							key={movie.id}
							style={[
								styles.card,
								{
									opacity: nextCardOpacity,
									transform: [{ scale: nextCardScale }],
									zIndex: -1
								}
							]}>
							<Image
								source={{ uri: movie.image }}
								style={styles.posterImage}
							/>
							<Text style={styles.movieTitle}>{movie.title}</Text>
						</Animated.View>
					);
				}

				return null;
			})
			.reverse();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Film Swiper</Text>

			<View style={styles.cardContainer}>{renderCards()}</View>

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
		backgroundColor: "#f5f5f5",
		paddingTop: 50
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20
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
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		alignItems: "center",
		padding: 10
	},
	posterImage: {
		width: "100%",
		height: "85%",
		borderRadius: 15,
		resizeMode: "cover"
	},
	movieTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 15
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 30,
		width: "80%",
		alignSelf: "center"
	},
	likeButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#4caf50",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	dislikeButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#ff5252",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	buttonText: {
		fontSize: 30,
		color: "white"
	},
	likeLabel: {
		position: "absolute",
		top: 50,
		right: 40,
		transform: [{ rotate: "20deg" }],
		borderWidth: 4,
		borderColor: "#4caf50",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5
	},
	likeLabelText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#4caf50"
	},
	dislikeLabel: {
		position: "absolute",
		top: 50,
		left: 40,
		transform: [{ rotate: "-20deg" }],
		borderWidth: 4,
		borderColor: "#ff5252",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5
	},
	dislikeLabelText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#ff5252"
	},
	endContainer: {
		alignItems: "center",
		justifyContent: "center"
	},
	endText: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20
	},
	endSubText: {
		fontSize: 18,
		marginBottom: 5
	},
	resetButton: {
		marginTop: 30,
		backgroundColor: "#2196f3",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8
	},
	resetButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold"
	}
});
