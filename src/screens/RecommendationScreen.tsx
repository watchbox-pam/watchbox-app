import { useState, useCallback, useRef } from "react";
import { Animated, StatusBar, View, ActivityIndicator } from "react-native";

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
		image: require("../assets/images/Emotion/jurassic-park.jpg"),
		gradient: ["#A8E6CF", "#4CAF50"],
		color: "#4CAF50"
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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [refreshing, setRefreshing] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const currentUser = useSessionStore((state: any) => state.user);
	const userId: string = currentUser?.id;

	const opacity = useRef(new Animated.Value(1)).current;
	const scaleRef = useRef(new Animated.Value(1)).current;

	const animateFade = useCallback(
		(toValue: number, duration: number = 300) =>
			new Promise<void>((resolve) => {
				Animated.timing(opacity, {
					toValue,
					duration,
					useNativeDriver: true
				}).start(() => resolve());
			}),
		[opacity]
	);

	const animateScale = useCallback(
		(toValue: number, duration: number = 200) =>
			new Promise<void>((resolve) => {
				Animated.timing(scaleRef, {
					toValue,
					duration,
					useNativeDriver: true
				}).start(() => resolve());
			}),
		[scaleRef]
	);

	const fetchMoviesByEmotion = useCallback(async (emotion: Emotion) => {
		setError(null);
		try {
			const response = await fetchRecommendations(emotion.value);

			if (response.success) {
				setMovies(response.data);
			} else {
				setError("Impossible de charger les recommandations.");
			}
		} catch {
			setError("Impossible de charger les recommandations.");
		}
	}, []);

	const handleSelectEmotion = useCallback(
		async (emotion: Emotion) => {
			setLoading(true);
			setIsTransitioning(true);

			await Promise.all([animateFade(0, 250), animateScale(0.95, 250)]);

			setSelectedEmotion(emotion);

			await fetchMoviesByEmotion(emotion);

			setIsTransitioning(false);

			opacity.setValue(0);
			scaleRef.setValue(0.95);

			await Promise.all([animateFade(1, 300), animateScale(1, 300)]);

			setLoading(false);
		},
		[animateFade, animateScale, fetchMoviesByEmotion, opacity, scaleRef]
	);

	const onRefresh = useCallback(async () => {
		if (!selectedEmotion) return;
		setRefreshing(true);
		try {
			await fetchMoviesByEmotion(selectedEmotion);
		} finally {
			setRefreshing(false);
		}
	}, [selectedEmotion, fetchMoviesByEmotion]);

	const handleBack = useCallback(async () => {
		setMovies([]);

		await Promise.all([animateFade(0, 250), animateScale(0.95, 250)]);

		setSelectedEmotion(null);
		setError(null);

		opacity.setValue(0);
		scaleRef.setValue(0.95);

		await Promise.all([animateFade(1, 300), animateScale(1, 300)]);
	}, [animateFade, animateScale, opacity, scaleRef]);

	const removeMovie = useCallback((movieId: number) => {
		setMovies((prev) => prev.filter((m) => m.id !== movieId));
	}, []);

	const fetchOneMoreMovie = useCallback(async () => {
		if (!selectedEmotion) return;

		const excludeIds = movies.map((m) => m.id);

		try {
			const response = await fetchRecommendations(selectedEmotion.value, {
				limit: 1,
				excludeIds
			});

			if (response.success && response.data?.length > 0) {
				const next = response.data[0];

				setMovies((prev) => {
					if (prev.length >= 10) return prev;
					if (prev.some((m) => m.id === next.id)) return prev;
					return [...prev, next];
				});
			}
		} catch {}
	}, [selectedEmotion, movies]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			{loading && (
				<View style={styles.loadingOverlay}>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}

			<Animated.View
				style={[
					{ flex: 1 },
					{
						opacity,
						transform: [{ scale: scaleRef }]
					}
				]}>
				{!selectedEmotion ? (
					<>
						<Header title="Recommandations" />
						<EmotionsList
							emotions={emotions}
							selectedEmotion={selectedEmotion}
							onSelectEmotion={handleSelectEmotion}
							isTransitioning={isTransitioning}
						/>
					</>
				) : (
					<MovieList
						movies={movies}
						loading={loading}
						error={error}
						selectedEmotion={selectedEmotion}
						userId={userId}
						onRetry={() => fetchMoviesByEmotion(selectedEmotion)}
						onBack={handleBack}
						refreshing={refreshing}
						onRefresh={onRefresh}
						onMovieRemoved={removeMovie}
						onRated={fetchOneMoreMovie}
					/>
				)}
			</Animated.View>
		</View>
	);
}
