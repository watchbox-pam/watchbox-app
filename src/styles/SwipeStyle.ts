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
		height: "85%",
		marginHorizontal: "auto",
		marginTop: 10,
		borderRadius: 20
	},
	movieTitle: {
		fontSize: 20,
		color: "white",
		padding: 10,
		textAlign: "center",
		height: "30%",
		fontFamily: "oswald"
	},
	likeLabel: {
		position: "absolute",
		top: 40,
		left: 40,
		borderWidth: 3,
		borderColor: "green",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "rgba(0,255,0,0.2)",
		transform: [{ rotate: "-20deg" }]
	},
	likeLabelText: {
		color: "green",
		fontWeight: "800",
		fontSize: 32
	},
	dislikeLabel: {
		position: "absolute",
		top: 40,
		right: 40,
		borderWidth: 3,
		borderColor: "red",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "rgba(255,0,0,0.2)",
		transform: [{ rotate: "20deg" }]
	},
	dislikeLabelText: {
		color: "red",
		fontWeight: "800",
		fontSize: 32
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingBottom: 30
	},
	likeButton: {
		backgroundColor: "green",
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	dislikeButton: {
		backgroundColor: "red",
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	buttonText: {
		fontSize: 32,
		color: "white"
	},
	endContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	endText: {
		color: "white",
		fontSize: 22
	}
});

export default styles;
