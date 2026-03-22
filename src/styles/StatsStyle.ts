import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: "90%",
		backgroundColor: "#0D1321",
		borderRadius: 12,
		paddingVertical: 25,
		paddingHorizontal: 20,
		marginVertical: 15
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFF",
		textAlign: "center",
		marginBottom: 20,
		letterSpacing: 1
	},
	statsGrid: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	statItem: {
		flex: 1,
		alignItems: "center"
	},
	statDivider: {
		width: 2,
		height: 60,
		backgroundColor: "#D0BFFF",
		marginHorizontal: 15,
		opacity: 0.3
	},
	statNumber: {
		fontSize: 36,
		fontWeight: "900",
		color: "#D0BFFF",
		marginBottom: 5
	},
	statTime: {
		fontSize: 18,
		fontWeight: "700",
		color: "#FF4A4A",
		marginBottom: 5,
		textAlign: "center"
	},
	statLabel: {
		fontSize: 14,
		color: "#FFF",
		opacity: 0.8,
		textAlign: "center",
		fontWeight: "500"
	},

	highlight: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FF4A4A"
	}
});

export default styles;
