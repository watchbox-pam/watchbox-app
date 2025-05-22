import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%"
	},
	image: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: "100%"
	},
	emptyImage: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: "100%",
		backgroundColor: "#ccc",
		justifyContent: "center"
	},
	emptyImageText: {
		fontSize: 12,
		textAlign: "center",
		color: "black",
		alignItems: "center"
	},
	imageContainer: {
		flex: 1,
		maxWidth: width / 4,
		padding: 2,
		alignItems: "center"
	},
	row: {
		justifyContent: "space-between",
		width: "100%"
	},
	readMoreButton: {
		alignItems: "center",
		marginTop: 5
	},
	readMoreText: {
		color: "#3498db",
		fontSize: 16,
		fontWeight: "bold"
	}
});

export default styles;
