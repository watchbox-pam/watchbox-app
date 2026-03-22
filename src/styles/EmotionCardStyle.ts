import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		width: "48%",
		aspectRatio: 1.6,
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	selectedCard: {
		borderWidth: 2,
		borderColor: "#FFFFFF",
		shadowOpacity: 0.5,
		shadowRadius: 8,
		elevation: 8
	},
	imageBackground: {
		flex: 1,
		width: "100%",
		height: "100%"
	},
	image: {
		borderRadius: 10
	},
	gradient: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 10
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Oswald",
		color: "white"
	}
});

export default styles;
