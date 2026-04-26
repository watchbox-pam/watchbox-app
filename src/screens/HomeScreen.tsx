import { useEffect, useState, useCallback } from "react";
import CarouselPoster from "../components/CarouselPoster";
//import LogoButton from "../components/Logo";
import CadrePublicitaire from "../components/CadrePublicitaire";
import { View, ScrollView, RefreshControl } from "react-native";
import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/HomeStyle";
import { fetchGenre, fetchPopular } from "@/src/services/HomePageService";
import useSessionStore from "@/src/zustand/sessionStore";
import { ActivityIndicator } from "react-native-paper";
import { ErrorMessage } from "../components/ErrorMessage";
//import IconProfile from "@/src/components/IconProfile";
import Header from "../components/Header";
import Quizz from "../components/QuizzButton";
import { BackgroundLine } from "../assets/background/BackgroundLine";

export default function HomeScreen() {
	const [movies, setMovies] = useState<{ title?: string; movies: any[] }[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	const currentUser = useSessionStore((state: any) => state.user);

	// Fetch movie data from multiple endpoints
	const fetchMovies = async () => {
		try {
			const list = [];
			const popularDay = await fetchPopular("day");
			const popularWeek = await fetchPopular("week");
			const actionGenre = await fetchGenre("28");
			const comedyGenre = await fetchGenre("35");
			const dramaGenre = await fetchGenre("18");

			// If any fetch fails, show error state
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

			// Build the movie sections
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
					title: "Action",
					movies: actionGenre.data["results"]
				},
				{
					title: "Comédie",
					movies: comedyGenre.data["results"]
				},
				{
					title: "Drama",
					movies: dramaGenre.data["results"]
				},
				{
					title: "Drama",
					movies: dramaGenre.data["results"]
				},
				{
					title: "Drama",
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
		setLoading(true);

		fetchMovies();
		if (refreshing) {
			setRefreshing(false);
		}
	}, [refreshing]);

	if (error) {
		return <ErrorMessage onRetry={() => setRefreshing(!refreshing)} />;
	}

	if (loading) {
		return (
			<View style={styles.loading} testID="loading">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return (
        <View style={styles.wrapper}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <BackgroundLine />
                <BackgroundLine />

                <Header title={`Hello there, ${currentUser.identifier}`} />

                {movies &&
                    movies.map(({ title, movies }, index) => (
                        <View key={index}>
                            <View style={styles.WatchList}>
                                <View style={styles.TitleWatchList}>
                                    <StyledText style={styles.MainTitleWatchList}>
                                        {title}
                                    </StyledText>
                                </View>
                                {movies && <CarouselPoster data={movies} />}
                            </View>
                            {(index + 1) % 5 === 0 && <Quizz />}
                            {/* {(index + 1) % 3 === 0 && (
                                <CadrePublicitaire
                                    title="🎬 Streaming Premium"
                                    description="Profitez de 30 jours gratuits sur toutes les plateformes"
                                    imageUrl="https://via.placeholder.com/150"
                                    link="https://example.com"
                                />
                            )} */}
                        </View>
                    ))}
            </ScrollView>
		</View>
	);
}
