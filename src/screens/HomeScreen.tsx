import { useEffect, useState } from "react";
import CarouselPoster from "../components/CarouselPoster";
import LogoButton from "../components/Logo";
import { View, ScrollView } from "react-native";

import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/HomeStyle";
import { fetchPopularMovies } from "./utils/utils";

export default function HomeScreen() {
	const [popularDay, setPopularDay] = useState();
	const [popularWeek, setPopularWeek] = useState();

	useEffect(() => {
		async function fetchData() {
			const { day, week } = await fetchPopularMovies();
			setPopularDay(day);
			setPopularWeek(week);
		}
		fetchData();
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<StyledText style={styles.TitleHeader}>
					Bonjour Julien-QTX !
				</StyledText>
				<LogoButton />
			</View>

			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires aujourd'hui{" "}
						<StyledText style={styles.SubTitleWatchList}>
							films
						</StyledText>
					</StyledText>
				</View>
				{popularDay && <CarouselPoster data={popularDay["results"]} />}
			</View>
			<View style={styles.WatchList}>
				<View style={styles.TitleWatchList}>
					<StyledText style={styles.MainTitleWatchList}>
						Populaires cette semaine{" "}
						<StyledText style={styles.SubTitleWatchList}>
							films
						</StyledText>
					</StyledText>
				</View>
				{popularWeek && (
					<CarouselPoster data={popularWeek["results"]} />
				)}
			</View>
		</ScrollView>
	);
}
