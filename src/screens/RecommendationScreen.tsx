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
		color: "#FF9AAA",
		emoji: "🩷"
	},
	{
		id: 2,
		label: "ÉMERVEILLEMENT",
		value: "emerveillement",
		startAngle: 22.5,
		endAngle: 67.5,
		color: "#4CAF50",
		emoji: "😯"
	},
	{
		id: 3,
		label: "EXCITATION",
		value: "excitation",
		startAngle: 67.5,
		endAngle: 112.5,
		color: "#FF9800",
		emoji: "🫨"
	},
	{
		id: 4,
		label: "FRISSON",
		value: "frisson",
		startAngle: 112.5,
		endAngle: 157.5,
		color: "#D32F2F",
		emoji: "😨"
	},
	{
		id: 5,
		label: "NOSTALGIE",
		value: "nostalgie",
		startAngle: 157.5,
		endAngle: 202.5,
		color: "#9E9E9E",
		emoji: "😌"
	},
	{
		id: 6,
		label: "RÉFLEXION",
		value: "reflexion",
		startAngle: 202.5,
		endAngle: 247.5,
		color: "#212121",
		emoji: "🤓"
	},
	{
		id: 7,
		label: "MÉLANCOLIE",
		value: "melancolie",
		startAngle: 247.5,
		endAngle: 292.5,
		color: "#2196F3",
		emoji: "🥲"
	},
	{
		id: 8,
		label: "RIRE",
		value: "rire",
		startAngle: 292.5,
		endAngle: 337.5,
		color: "#ffd53b",
		emoji: "😂"
	}
];

export default function RecommendationScreen() {
	// @ts-ignore
	const { user } = useSessionStore();
	const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(
		null
	);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [emotionsOpacity] = useState(new Animated.Value(1));
	const [resultsOpacity] = useState(new Animated.Value(0));
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	useEffect(() => {
		if (selectedEmotion) {
			fetchMoviesByEmotion();
			animateTransition();
		}
		if (refreshing) {
			setRefreshing(false);
		}
	}, [selectedEmotion, refreshing]);

	const animateTransition = () => {
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
					onSelectEmotion={setSelectedEmotion}
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
					userId={user.id}
					onRetry={fetchMoviesByEmotion}
					onBack={resetAnimation}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			</Animated.View>
		</View>
	);
}
