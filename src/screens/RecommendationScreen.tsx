import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Animated,
	StatusBar,
	SafeAreaView,
	Dimensions
} from "react-native";
import axios from "axios";
import EmotionsPieChart from "../components/EmotionsPieChart";
import MovieList from "../components/MovieList";

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

interface Emotion {
	id: number;
	label: string;
	value: string;
	startAngle: number;
	endAngle: number;
	color: string;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;

const emotions: Emotion[] = [
	{
		id: 1,
		label: "ROMANTISME",
		value: "romantisme",
		startAngle: -22.5,
		endAngle: 22.5,
		color: "#FF9AAA"
	},
	{
		id: 2,
		label: "ÉMERVEILLEMENT",
		value: "emerveillement",
		startAngle: 22.5,
		endAngle: 67.5,
		color: "#4CAF50"
	},
	{
		id: 3,
		label: "EXCITATION",
		value: "excitation",
		startAngle: 67.5,
		endAngle: 112.5,
		color: "#FF9800"
	},
	{
		id: 4,
		label: "FRISSON",
		value: "frisson",
		startAngle: 112.5,
		endAngle: 157.5,
		color: "#D32F2F"
	},
	{
		id: 5,
		label: "NOSTALGIE",
		value: "nostalgie",
		startAngle: 157.5,
		endAngle: 202.5,
		color: "#9E9E9E"
	},
	{
		id: 6,
		label: "RÉFLEXION",
		value: "reflexion",
		startAngle: 202.5,
		endAngle: 247.5,
		color: "#212121"
	},
	{
		id: 7,
		label: "MÉLANCOLIE",
		value: "melancolie",
		startAngle: 247.5,
		endAngle: 292.5,
		color: "#2196F3"
	},
	{
		id: 8,
		label: "RIRE",
		value: "rire",
		startAngle: 292.5,
		endAngle: 337.5,
		color: "#FFEB3B"
	}
];

const RecommendationScreen: React.FC = () => {
	const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(
		null
	);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [wheelOpacity] = useState(new Animated.Value(1));
	const [resultsOpacity] = useState(new Animated.Value(0));

	const size = 300;
	const windowHeight = Dimensions.get("window").height;

	useEffect(() => {
		if (selectedEmotion) {
			fetchMoviesByEmotion();
			animateTransition();
		}
	}, [selectedEmotion]);

	const animateTransition = () => {
		Animated.parallel([
			Animated.timing(wheelOpacity, {
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
			Animated.timing(wheelOpacity, {
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

		const apiUrl = `${API_BASE_URL}recommendations/emotion/${selectedEmotion.value}?limit=10`;

		try {
			const response = await axios.get<Movie[]>(apiUrl, {
				timeout: 10000,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});
			setMovies(response.data);
		} catch (err) {
			console.error("Erreur lors du chargement des films:", err);
			setError("Impossible de charger les recommandations.");
		} finally {
			setLoading(false);
		}
	};

	const handleSelectEmotion = (emotion: Emotion) => {
		setSelectedEmotion(emotion);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" />

			<Animated.View
				style={[
					styles.centeredContainer,
					{ height: windowHeight, opacity: wheelOpacity }
				]}
				pointerEvents={selectedEmotion ? "none" : "auto"}>
				<EmotionsPieChart
					emotions={emotions}
					selectedEmotion={selectedEmotion}
					onSelectEmotion={handleSelectEmotion}
					size={size}
					wheelOpacity={wheelOpacity}
				/>
			</Animated.View>

			<Animated.View
				style={[styles.moviesContainer, { opacity: resultsOpacity }]}
				pointerEvents={selectedEmotion ? "auto" : "none"}>
				<MovieList
					movies={movies}
					loading={loading}
					error={error}
					selectedEmotion={selectedEmotion}
					onRetry={fetchMoviesByEmotion}
					onBack={resetAnimation}
				/>
			</Animated.View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38"
	},
	centeredContainer: {
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1
	},
	moviesContainer: {
		flex: 1,
		width: "100%",
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2
	}
});

export default RecommendationScreen;
