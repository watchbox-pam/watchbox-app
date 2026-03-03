import { useState, useCallback } from "react";
import CarouselPoster from "../components/CarouselPoster";
//import LogoButton from "../components/Logo";
import CadrePublicitaire from "../components/CadrePublicitaire";
import { View, ScrollView, RefreshControl } from "react-native";
import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/HomeStyle";
import useSessionStore from "@/src/zustand/sessionStore";
import useMoviesStore from "@/src/zustand/moviesStore";
import { ErrorMessage } from "../components/ErrorMessage";
import IconProfile from "@/src/components/IconProfile";

export default function HomeScreen() {
	const movies = useMoviesStore((state) => state.sections);
	const currentUser = useSessionStore((state: any) => state.user);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 1000);
	}, []);

	if (movies.length === 0) {
		return <ErrorMessage onRetry={onRefresh} />;
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<View style={styles.header}>
				<StyledText style={styles.TitleHeader}>
					Hello there, {currentUser.identifier}
				</StyledText>
				<IconProfile />
				{/* <LogoButton /> */}
			</View>

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
						{(index + 1) % 3 === 0 && (
							<CadrePublicitaire
								title="🎬 Streaming Premium"
								description="Profitez de 30 jours gratuits sur toutes les plateformes"
								imageUrl="https://via.placeholder.com/150"
								link="https://example.com"
							/>
						)}
					</View>
				))}
		</ScrollView>
	);
}
