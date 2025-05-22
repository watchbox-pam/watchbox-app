import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		paddingTop: 50
	},
	cardContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	card: {
		position: "absolute",
		width: SCREEN_WIDTH * 0.9,
		height: SCREEN_WIDTH * 1.5,
		borderRadius: 20,
		backgroundColor: "#143b71",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
		overflow: "hidden"
	},
	posterImage: {
		width: "90%",
		height: "80%",
		alignSelf: "center",
		marginTop: 10,
		borderRadius: 20
	},
	movieTitle: {
		fontSize: 18,
		color: "white",
		padding: 10,
		textAlign: "center",
		justifyContent: "center",
		fontFamily: "oswald",
		fontWeight: "bold"
	},
	likeLabel: {
		position: "absolute",
		top: 50,
		right: 30,
		borderWidth: 4,
		borderColor: "#4CAF50",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: "rgba(76, 175, 80, 0.2)",
		transform: [{ rotate: "15deg" }]
	},
	likeLabelText: {
		color: "#4CAF50",
		fontWeight: "900",
		fontSize: 28,
		letterSpacing: 2
	},
	skipLabel: {
		position: "absolute",
		top: 50,
		alignSelf: "center",
		left: "50%",
		marginLeft: -50,
		paddingHorizontal: 20,
		backgroundColor: "rgba(76, 175, 80, 0.2)",
		paddingVertical: 10,
		borderRadius: 10,
		borderWidth: 4,
		borderColor: "blue"
	},
	skipLabelText: {
		color: "blue",
		fontWeight: "900",
		fontSize: 28,
		letterSpacing: 2
	},
	dislikeLabel: {
		position: "absolute",
		top: 50,
		left: 30,
		borderWidth: 4,
		borderColor: "#F44336",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: "rgba(244, 67, 54, 0.2)",
		transform: [{ rotate: "-15deg" }]
	},
	dislikeLabelText: {
		color: "#F44336",
		fontWeight: "900",
		fontSize: 28,
		letterSpacing: 2
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingBottom: 15,
		paddingHorizontal: 40,
		marginTop: 40
	},
	likeButton: {
		backgroundColor: "#4CAF50",
		width: 70,
		height: 70,
		borderRadius: 35,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
		zIndex: 20,
		color: "white"
	},
	skipButton: {
		backgroundColor: "blue",
		width: 70,
		height: 70,
		borderRadius: 35,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
		zIndex: 20
	},
	dislikeButton: {
		backgroundColor: "#F44336",
		width: 70,
		height: 70,
		borderRadius: 35,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 8,
		zIndex: 20
	},
	buttonText: {
		fontSize: 24,
		color: "white",
		fontWeight: "bold"
	},
	endContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	endText: {
		color: "white",
		fontSize: 22,
		textAlign: "center"
	}
});

export default styles;
