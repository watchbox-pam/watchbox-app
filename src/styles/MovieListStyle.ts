import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: "#0A1E38"
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		flex: 1,
		textAlign: "center",
		marginRight: 44
	},
	backButton: {
		width: 44,
		height: 44,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: {
		marginTop: 10,
		color: "#ffffff"
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	errorText: {
		color: "#ff6b6b",
		textAlign: "center",
		marginBottom: 20
	},
	retryButton: {
		backgroundColor: "#4a69bd",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 4
	},
	retryButtonText: {
		color: "#fff",
		fontWeight: "600"
	},
	moviesList: {
		padding: 10,
		paddingBottom: 60
	},
	columnWrapper: {
		justifyContent: "space-between"
	},
	// Carte film
	card: {
		width: "48%",
		marginVertical: 6,
		borderRadius: 10,
		overflow: "hidden"
	},
	// Overlay like/dislike
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.85)",
		alignItems: "center",
		justifyContent: "center"
	},
	feedbackButtons: {
		flexDirection: "row",
		gap: 20
	},
	feedbackBtn: {
		width: 55,
		height: 55,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center"
	},
	dislikeBtn: {
		backgroundColor: "#ff4444"
	},
	feedbackConfirm: {
		alignItems: "center",
		justifyContent: "center"
	},
	// Poster
	poster: {
		width: "100%",
		aspectRatio: 2 / 3
	},
	noPoster: {
		width: "100%",
		aspectRatio: 2 / 3,
		backgroundColor: "#0f2c53",
		justifyContent: "center",
		alignItems: "center"
	},
	noPosterText: {
		color: "#ffffff"
	}
});

export default styles;
