import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	Row: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%"
	},
	Item: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 4,
		borderRightWidth: 1,
		borderRightColor: "rgba(255,255,255,0.1)"
	},
	Num: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "700",
		letterSpacing: -0.3
	},
	Label: {
		color: "#4a6a8a",
		fontSize: 15,
		fontWeight: "400",
		marginTop: 1
	},
	Separator: {
		height: 1,
		backgroundColor: "rgba(255,255,255,0.1)",
		width: "100%"
	},
	Icon: {
		marginBottom: 2
	},
	ItemLast: {
		borderRightWidth: 0
	}
});

export default styles;
