import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	image: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: 100
	},
	noImage: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: 100,
		backgroundColor: "#ccc"
	},
	name: {
		textAlign: "center",
		fontWeight: "bold",
		flexWrap: "wrap",
		width: 100
	},
	character: {
		textAlign: "center",
		flexWrap: "wrap",
		width: 100
	}
});

export default styles;
