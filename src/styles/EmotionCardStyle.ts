import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		width: "48%",
		aspectRatio: 1.6,
		borderRadius: 10,
		padding: 10,
		marginBottom: 16,
		justifyContent: "space-between",
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
	title: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Oswald",
		color: "white",
		marginBottom: 8
	},
	emoji: {
		fontSize: 60,
		alignSelf: "flex-end",
		transform: "rotate(15deg)",
		opacity: 0.9
	}
});

export default styles;
