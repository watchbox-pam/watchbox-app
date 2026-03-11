import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		alignItems: "center",
		justifyContent: "center"
	},
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 12
	},
	cardContainer: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	loadingText: {
		marginTop: 16,
		color: "#9ca3af",
		fontSize: 15
	},
	endTitle: {
		fontSize: 26,
		fontWeight: "800",
		color: "#ffffff"
	},
	endStats: {
		fontSize: 18,
		color: "#9ca3af"
	},
	endText: {
		fontSize: 18,
		color: "#9ca3af"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 24,
		paddingBottom: 48,
		paddingTop: 16
	},
	btn: {
		width: 64,
		height: 64,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6
	},
	dislikeBtn: {
		backgroundColor: "#1f1f35",
		borderWidth: 2,
		borderColor: "#ef4444"
	},
	skipBtn: {
		width: 54,
		height: 54,
		borderRadius: 27,
		backgroundColor: "#1f1f35",
		borderWidth: 2,
		borderColor: "#fbbf24" // "#f59e0b"
	},
	likeBtn: {
		backgroundColor: "#1f1f35",
		borderWidth: 2,
		borderColor: "#22c55e" //"#34d399"
	},
	btnIcon: { fontSize: 26 }
});

export default styles;
