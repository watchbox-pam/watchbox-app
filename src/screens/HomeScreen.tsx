import { useEffect, useState } from "react";
import CarouselPoster from "../components/CarouselPoster";
import LogoButton from "../components/Logo";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";

import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/HomeStyle";
import { fetchGenre, fetchPopular } from "@/src/services/HomePageService";
import useSessionStore from "@/src/zustand/sessionStore";

export default function HomeScreen() {
	const [popularDay, setPopularDay] = useState();
	const [popularWeek, setPopularWeek] = useState();
	const [action, setAction] = useState();
	const [comedy, setComedy] = useState();
	const [drama, setDrama] = useState();

	const currentUser = useSessionStore((state: any) => state.user);

	const fetchPopularMovies = async () => {
		const popularDay = await fetchPopular("day");
		if (popularDay.success) {
			setPopularDay(popularDay.data);
		}
		const popularWeek = await fetchPopular("week");
		if (popularWeek.success) {
			setPopularWeek(popularWeek.data);
		}
	};

	const fetchByGenres = async () => {
		const actionGenre = await fetchGenre("28");
		if (actionGenre.success) {
			setAction(actionGenre.data);
		}
		const comedyGenre = await fetchGenre("35");
		if (comedyGenre.success) {
			setComedy(comedyGenre.data);
		}
		const dramaGenre = await fetchGenre("18");
		if (dramaGenre.success) {
			setDrama(dramaGenre.data);
		}
	};

	useEffect(() => {
		fetchPopularMovies();
		fetchByGenres();
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<StyledText style={styles.TitleHeader}>
					Hello there, {currentUser.username}
				</StyledText>
				<LogoButton />
			</View>

			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires aujourd'hui{" "}
					</StyledText>
				</View>
				{popularDay && <CarouselPoster data={popularDay["results"]} />}
			</View>
			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires cette semaine{" "}
					</StyledText>
				</View>
				{popularWeek && (
					<CarouselPoster data={popularWeek["results"]} />
				)}
			</View>

			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires par genre{" "}
						<StyledText style={styles.SubTitleWatchList}>
							action
						</StyledText>
					</StyledText>
				</View>
				{action && <CarouselPoster data={action["results"]} />}
			</View>

			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires par genre{" "}
						<StyledText style={styles.SubTitleWatchList}>
							comédie
						</StyledText>
					</StyledText>
				</View>
				{comedy && <CarouselPoster data={comedy["results"]} />}
			</View>

			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires par genre{" "}
						<StyledText style={styles.SubTitleWatchList}>
							drame
						</StyledText>
					</StyledText>
				</View>
				{drama && <CarouselPoster data={drama["results"]} />}
			</View>
		</ScrollView>
	);
}
