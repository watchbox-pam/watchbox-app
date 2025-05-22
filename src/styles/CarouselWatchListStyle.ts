import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 150,
		borderRadius: 10
	},
	imageContainer: {
		marginRight: 10,
		height: 160,
		alignItems: "center"
	},
	container: {
		height: 160,
		paddingLeft: 10
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	emptyImage: {
		width: 100,
		height: 100
	}
});

export default styles;
