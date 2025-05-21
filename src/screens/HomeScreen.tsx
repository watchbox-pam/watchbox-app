import { useEffect, useState } from "react";
import CarouselPoster from "../components/CarouselPoster";
import LogoButton from "../components/Logo";
import { View, ScrollView } from "react-native";

import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/HomeStyle";
import { fetchGenre, fetchPopular } from "@/src/services/HomePageService";
import useSessionStore from "@/src/zustand/sessionStore";
import { ActivityIndicator } from "react-native-paper";

export default function HomeScreen() {
	const [movies, setMovies] = useState<{ title?: string; movies: any[] }[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const currentUser = useSessionStore((state: any) => state.user);

	const fetchMovies = async () => {
		try {
			const list = [];
			const popularDay = await fetchPopular("day");
			const popularWeek = await fetchPopular("week");
			const actionGenre = await fetchGenre("28");
			const comedyGenre = await fetchGenre("35");
			const dramaGenre = await fetchGenre("18");

			if (
				!popularDay.success ||
				!popularWeek.success ||
				!actionGenre.success ||
				!comedyGenre.success ||
				!dramaGenre.success
			) {
				setError(true);
				return;
			}

			list.push(
				{
					title: "Populaires aujourd'hui",
					movies: popularDay.data["results"]
				},
				{
					title: "Populaires cette semaine",
					movies: popularWeek.data["results"]
				},
				{
					title: "action",
					movies: actionGenre.data["results"]
				},
				{
					title: "comédie",
					movies: comedyGenre.data["results"]
				},
				{
					title: "drama",
					movies: dramaGenre.data["results"]
				}
			);

			setMovies(list);
			if (list.length === 0) throw new Error("movie list is empty");
			setError(false);
		} catch (error) {
			console.error(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	if (error) {
		return (
			<View style={styles.errorContainer} testID="error">
				<StyledText style={styles.errorText}>
					Erreur lors du chargement des données.
				</StyledText>
			</View>
		);
	}

	if (loading) {
		return (
			<View style={styles.loading} testID="loading">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<StyledText style={styles.TitleHeader}>
					Hello there, {currentUser.identifier}
				</StyledText>
				<LogoButton />
			</View>

			{movies &&
				movies.map(({ title, movies }, index) => (
					<View key={index} style={styles.WatchList}>
						<View style={styles.TitleWatchList}>
							<StyledText style={styles.MainTitleWatchList}>
								{title}
							</StyledText>
						</View>
						{movies && <CarouselPoster data={movies} />}
					</View>
				))}
		</ScrollView>
	);
}
