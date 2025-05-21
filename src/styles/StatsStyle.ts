import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		width: "90%",
		marginVertical: "auto",
		paddingHorizontal: 20,
		backgroundColor: "#0D1321",
		borderRadius: 12
	},
	title: {
		fontSize: 40,
		fontWeight: "bold",
		color: "#FFF",
		marginBottom: 20,
		textDecorationLine: "underline"
	},
	statBlockLeft: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginVertical: "auto"
	},
	labelLeft: {
		width: "51%",
		fontSize: 14,
		color: "#FFF",
		textAlign: "right",
		paddingTop: 15
	},
	valueLeft: {
		width: "49%",
		fontSize: 50,
		fontWeight: "bold",
		color: "#D0BFFF"
	},
	statBlockRight: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 20,
		marginVertical: "auto"
	},
	labelRight: {
		width: "51%",
		fontSize: 14,
		color: "#FFF",
		textAlign: "left",
		paddingTop: 15
	},
	valueRight: {
		width: "49%",
		fontSize: 50,
		fontWeight: "bold",
		color: "#D0BFFF",
		textAlign: "right"
	},
	statBlockTime: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 20
	},
	label: {
		width: "50%",
		fontSize: 14,
		color: "#FFF",
		textAlign: "center"
	},
	value: {
		width: "50%",
		fontSize: 50,
		fontWeight: "bold",
		color: "#D0BFFF"
	},
	timeValue: {
		fontSize: 20,
		color: "#FFF"
	},
	highlight: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FF4A4A"
	}
});

export default styles;
