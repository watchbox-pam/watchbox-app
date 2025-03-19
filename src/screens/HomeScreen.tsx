import CarouselPoster from "../components/CarouselPoster";
import LogoButton from "../components/Logo";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";

export default function HomeScreen() {
	const providers = [
		"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
		"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
		"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
		"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
		"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"
	];

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.TitleHeader}>Bonjour Julien-QTX</Text>
				<LogoButton />
			</View>

			<View style={styles.WatchList}>
				<Text style={styles.TitleWatchList}>WatchList Film</Text>
				<CarouselPoster providers={providers} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 0
	},
	contentContainer: {
		alignItems: "center",
		paddingVertical: 20
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		marginTop: Platform.OS === "ios" ? "30" : "0"
	},
	TitleHeader: {
		color: "#ffffff",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10
	},
	WatchList: {
		width: 350,
		marginBottom: 10
	},
	TitleWatchList: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		marginLeft: 10
	}
});
