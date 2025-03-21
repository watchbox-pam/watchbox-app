import { useEffect, useState } from "react";
import CarouselPoster from "../components/CarouselPoster";
import LogoButton from "../components/Logo";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import { ApiHelper } from "../utils/axios";

import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/HomeStyle";

export default function HomeScreen() {
	const [popularDay, setPopularDay] = useState();
	const [popularWeek, setPopularWeek] = useState();

	useEffect(() => {
		const fetchPopularDay = async () => {
			try {
				const time_window = "day";
				const data = await ApiHelper.get(
					`movies/popular/${time_window}?page=1`
				);
				setPopularDay(data);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des films populaires:",
					error
				);
			}
		};
		fetchPopularDay();
	}, []);

	useEffect(() => {
		const fetchPopularWeek = async () => {
			try {
				const time_window = "week";
				const data = await ApiHelper.get(
					`movies/popular/${time_window}?page=1`
				);
				setPopularWeek(data);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des films populaires:",
					error
				);
			}
		};
		fetchPopularWeek();
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
