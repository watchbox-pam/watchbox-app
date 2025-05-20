import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import { fetchMovies, Movie } from "@/src/services/SwipeService";
import { SwipeCard } from "@/src/components/SwipeCard";

export const SwipeScreen: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadMovies = async () => {
			const response = await fetchMovies(200);
			if (response.success && Array.isArray(response.data)) {
				setMovies(response.data);
			} else {
				console.error("Erreur chargement films :", response.data);
			}
			setIsLoading(false);
		};

		loadMovies();
	}, []);

	const onSwipedLeft = (index: number) => {
		const movie = movies[index];
		console.log("Pas aimé :", movie.title);
	};

	const onSwipedRight = (index: number) => {
		const movie = movies[index];
		console.log("Aimé :", movie.title);
	};

	if (isLoading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#00f" />
				<Text style={{ marginTop: 16, color: "#fff" }}>
					Chargement...
				</Text>
			</View>
		);
	}

	if (movies.length === 0) {
		return (
			<View style={styles.loading}>
				<Text style={{ color: "#fff" }}>Aucun film trouvé</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Swiper
				cards={movies}
				renderCard={(movie) => <SwipeCard movie={movie} />}
				onSwipedLeft={onSwipedLeft}
				onSwipedRight={onSwipedRight}
				cardIndex={0}
				backgroundColor="transparent"
				stackSize={3}
				infinite={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		justifyContent: "center"
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000"
	}
});
