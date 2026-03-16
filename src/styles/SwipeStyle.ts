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
		gap: 30
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
		flexDirection: "row"
	},
	btnIconEndStats: {
		fontSize: 32,
		lineHeight: 36
	},
	endText: {
		width: 120,
		height: 120,
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "column"
	},
	btnLabelEndStats: {
		fontSize: 15,
		fontWeight: "800",
		letterSpacing: 1.5
	},
	LabelEndStats: {
		fontSize: 25,
		fontWeight: "bold",
		letterSpacing: 1.5
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 30,
		paddingBottom: 48,
		paddingTop: 16
	},
	actionBtn: {
		width: 110,
		height: 80,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 6
	},
	skipBtn: {
		width: 75,
		height: 75,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fbbf2415",
		borderWidth: 2,
		borderColor: "#fbbf24"
	},
	dislikeBtn: {
		width: 110,
		height: 62,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ef444420",
		borderWidth: 2,
		borderColor: "#ef4444"
	},
	likeBtn: {
		width: 110,
		height: 62,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#22c55e20",
		borderWidth: 2,
		borderColor: "#22c55e"
	},
	btnIcon: {
		fontSize: 22,
		lineHeight: 26
	},
	btnLabel: {
		fontSize: 10,
		fontWeight: "800",
		letterSpacing: 1.5
	},
	btnText: { fontSize: 26, color: "#ffffff", fontWeight: "700" }
});

export default styles;
