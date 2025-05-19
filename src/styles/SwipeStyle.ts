import { StyleSheet } from "react-native";

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
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		alignItems: "center",
		padding: 10
	},
	posterImage: {
		width: "100%",
		height: "85%",
		borderRadius: 15,
		resizeMode: "cover"
	},
	movieTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 15,
		color: "#fff"
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 30,
		width: "80%",
		alignSelf: "center"
	},
	likeButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#4caf50",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	dislikeButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#ff5252",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	buttonText: {
		fontSize: 30,
		color: "white"
	},
	likeLabel: {
		position: "absolute",
		top: 50,
		right: 40,
		transform: [{ rotate: "20deg" }],
		borderWidth: 4,
		borderColor: "#4caf50",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5
	},
	likeLabelText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#4caf50"
	},
	dislikeLabel: {
		position: "absolute",
		top: 50,
		left: 40,
		transform: [{ rotate: "-20deg" }],
		borderWidth: 4,
		borderColor: "#ff5252",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5
	},
	dislikeLabelText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#ff5252"
	},
	endContainer: {
		alignItems: "center",
		justifyContent: "center",
		color: "white"
	},
	endText: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#fff"
	},
	endSubText: {
		fontSize: 18,
		marginBottom: 5,
		color: "#fff"
	},
	resetButton: {
		marginTop: 30,
		backgroundColor: "#143b71",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8
	},
	resetButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold"
	}
});
