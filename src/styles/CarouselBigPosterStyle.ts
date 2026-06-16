import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		height: 200,
		paddingLeft: 10
	},
	itemContainer: {
		marginRight: 5,
		alignItems: "center"
	},
	image: {
		width: 130,
		aspectRatio: 2 / 3,
		borderRadius: 5
	},
	title: {
		color: "#ffffff",
		fontSize: 21,
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 10,
		width: "100%"
	},
	overview: {
		color: "#ffffff",
		fontSize: 15,
		opacity: 0.8,
		marginTop: 4,
		width: "100%"
	}
});

export default styles;
