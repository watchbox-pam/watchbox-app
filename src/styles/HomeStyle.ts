import { Platform, StyleSheet } from "react-native";

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
		marginTop: Platform.OS === "ios" ? 30 : 0 // Corrigé: nombres au lieu de strings
	},
	TitleHeader: {
		color: "#ffffff",
		fontSize: 28,
		marginTop: 10
	},
	WatchList: {
		width: 350,
		marginBottom: 10
	},
	TitleWatchList: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		marginLeft: 10,
		marginBottom: 10
	},
	MainTitleWatchList: {
		color: "#ffffff",
		fontSize: 35
	},
	SubTitleWatchList: {
		color: "#ffffff",
		fontSize: 20
	}
});

export default styles;
