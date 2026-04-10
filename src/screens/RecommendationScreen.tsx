import { useState, useEffect, useCallback } from "react";
import { Animated, StatusBar, View } from "react-native";

import styles from "@/src/styles/RecommendationScreenStyle";
import Emotion from "@/src/models/Emotion";
import MovieList from "../components/MovieList";
import EmotionsList from "../components/EmotionsList";
import { fetchRecommendations } from "@/src/services/RecommendationService";
import Header from "../components/Header";
import useSessionStore from "@/src/zustand/sessionStore";

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

const emotions: Emotion[] = [
	{
		id: 1,
		label: "ROMANTISME",
		value: "romantisme",
		startAngle: -22.5,
		endAngle: 22.5,
		image: require("../assets/images/Emotion/titanic.png"),
		gradient: ["#FF9AAA", "#FF6F91"],
		color: "#FF6F91"
	},
	{
		id: 2,
		label: "ÉMERVEILLEMENT",
		value: "emerveillement",
		startAngle: 22.5,
		endAngle: 67.5,
		color: "#4CAF50",
		image: require("../assets/images/Emotion/jurassic-park.jpg"),
		gradient: ["#A8E6CF", "#4CAF50"]
	},
	{
		id: 3,
		label: "ADRÉNALINE",
		value: "adrenaline",
		startAngle: 67.5,
		endAngle: 112.5,
		image: require("../assets/images/Emotion/avengers.jpg"),
		gradient: ["#FFD180", "#FF9800"],
		color: "#FF9800"
	},
	{
		id: 4,
		label: "FRISSON",
		value: "frisson",
		startAngle: 112.5,
		endAngle: 157.5,
		image: require("../assets/images/Emotion/the-shining.png"),
		gradient: ["#EF9A9A", "#D32F2F"],
		color: "#D32F2F"
	},
	{
		id: 5,
		label: "NOSTALGIE",
		value: "nostalgie",
		startAngle: 157.5,
		endAngle: 202.5,
		image: require("../assets/images/Emotion/forrest-gump.png"),
		gradient: ["#E0E0E0", "#9E9E9E"],
		color: "#9E9E9E"
	},
	{
		id: 6,
		label: "RÉFLEXION",
		value: "reflexion",
		startAngle: 202.5,
		endAngle: 247.5,
		image: require("../assets/images/Emotion/oppenheimer.jpeg"),
		gradient: ["#616161", "#212121"],
		color: "#212121"
	},
	{
		id: 7,
		label: "MÉLANCOLIE",
		value: "melancolie",
		startAngle: 247.5,
		endAngle: 292.5,
		image: require("../assets/images/Emotion/up.jpg"),
		gradient: ["#90CAF9", "#2196F3"],
		color: "#2196F3"
	},
	{
		id: 8,
		label: "RIRE",
		value: "rire",
		startAngle: 292.5,
		endAngle: 337.5,
		image: require("../assets/images/Emotion/asterix.png"),
		gradient: ["#FFF176", "#FFD600"],
		color: "#FFD600"
	}
];

export default function RecommendationScreen() {
	const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(
		null
	);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [emotionsOpacity] = useState(new Animated.Value(1));
	const [resultsOpacity] = useState(new Animated.Value(0));
	const [refreshing, setRefreshing] = useState(false);

	const currentUser = useSessionStore((state: any) => state.user);
	const userId: string = currentUser?.id;

	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	useEffect(() => {
		/**
		 * Why this if in useEffect ?
		 * 1. useEffect is executed when the component is initially mounted (the first time it is rendered), at this point selectedEmotion is null
		 * 2. The useEffect is also executed after a resetAnimation(), which sets selectedEmotion to null
		 * 3. Without this condition, you would have useless calls to fetchMoviesByEmotion() with a null value
		 */
		if (selectedEmotion) {
			fetchMoviesByEmotion();
			animateTransition();
		}
		if (refreshing) {
			if (selectedEmotion) fetchMoviesByEmotion();
			setRefreshing(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedEmotion, refreshing]);

	/**
	 * 	Animation function for the transition between the list of emotions and the results
	 */
	const animateTransition = () => {
		/**
		 *  Simultaneous execution of the 2 animations
		 */
		Animated.parallel([
			Animated.timing(emotionsOpacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.timing(resultsOpacity, {
				toValue: 1,
				duration: 500,
				delay: 300,
				useNativeDriver: true
			})
		]).start();
	};

	const resetAnimation = () => {
		/**
		 *  Simultaneous execution of the 2 animations
		 */
		Animated.parallel([
			Animated.timing(emotionsOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.timing(resultsOpacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			})
		]).start(() => {
			setSelectedEmotion(null);
			setMovies([]);
			setError(null);
		});
	};

	/**
	 * Asynchronous function to retrieve films based on the selected emotion
	 */
	const fetchMoviesByEmotion = async (): Promise<void> => {
		if (!selectedEmotion) return;

		setLoading(true);
		setError(null);

		try {
			const response = await fetchRecommendations(selectedEmotion.value);
			if (response.success) {
				setMovies(response.data);
			} else {
				setError("Impossible de charger les recommandations.");
			}
		} catch (err) {
			setError("Impossible de charger les recommandations.");
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Remove a movie from the list (called when user likes/dislikes)
	 * FIX: This ensures the parent state is updated, not just the child local state
	 */
	const removeMovie = (movieId: number): void => {
		setMovies((prev) => prev.filter((m) => m.id !== movieId));
	};

	/**
	 * Fetch one more movie to replace the one that was just rated
	 * FIX: Now the count is accurate because movies is updated immediately via removeMovie()
	 */
	const fetchOneMoreMovie = async (): Promise<void> => {
		if (!selectedEmotion) return;

		const excludeIds = movies.map((m) => m.id);

		try {
			const response = await fetchRecommendations(selectedEmotion.value, {
				limit: 1,
				excludeIds
			});

			if (
				response.success &&
				Array.isArray(response.data) &&
				response.data.length > 0
			) {
				const next: Movie = response.data[0];

				setMovies((prev) => {
					// Only add if we haven't reached 10 movies and it's not a duplicate
					if (prev.length >= 10) return prev;
					if (prev.some((m) => m.id === next.id)) return prev;
					return [...prev, next];
				});
			}
		} catch {}
	};

	const handleSelectEmotion = (emotion: Emotion) => {
		setSelectedEmotion(emotion);
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<Animated.View
				style={[styles.overlayContainer, { opacity: emotionsOpacity }]}
				pointerEvents={selectedEmotion ? "none" : "auto"}>
				<Header title="Recommandations" />
				<EmotionsList
					emotions={emotions}
					selectedEmotion={selectedEmotion}
					onSelectEmotion={handleSelectEmotion}
				/>
			</Animated.View>

			<Animated.View
				style={[styles.overlayContainer, { opacity: resultsOpacity }]}
				pointerEvents={selectedEmotion ? "auto" : "none"}>
				<MovieList
					movies={movies}
					loading={loading}
					error={error}
					selectedEmotion={selectedEmotion}
					userId={userId}
					onRetry={fetchMoviesByEmotion}
					onBack={resetAnimation}
					refreshing={refreshing}
					onRefresh={onRefresh}
					onMovieRemoved={removeMovie}
					onRated={fetchOneMoreMovie}
				/>
			</Animated.View>
		</View>
	);
}
