import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headers: {
		position: "absolute",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		zIndex: 100,
		alignItems: "center",
		paddingVertical: 10
	},
	container: {
		backgroundColor: "#0A1E38",
		height: "100%",
		width: "100%",
		fontFamily: "wght"
	},
	loading: {
		backgroundColor: "#0A1E38",
		height: "100%",
		width: "100%",
		justifyContent: "center"
	},
	contentContainer: {
		alignItems: "center"
	},
	imageBannerContainer: {
		width: "100%",
		aspectRatio: 16 / 9
	},
	imageBanner: {
		width: "100%",
		height: "100%"
	},
	imagePosterContainer: {
		width: "30%",
		marginRight: 20,
		zIndex: 1
	},
	imagePoster: {
		aspectRatio: 2 / 3
	},
	title: {
		fontSize: 40,
		maxWidth: "100%",
		zIndex: 1
	},
	text: {
		fontSize: 14
	},
	textBold: {
		fontWeight: "bold"
	},
	description: {
		fontSize: 14,
		paddingRight: 20,
		paddingLeft: 20
	},
	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingRight: 20,
		paddingLeft: 20,
		top: -20
	},
	infoDiv: {
		flexDirection: "column",
		alignSelf: "flex-end",
		flex: 1
	},
	tagContainer: {
		marginBottom: -10
	},
	textTag: {
		fontSize: 10
	},
	providersContainer: {
		flexDirection: "column",
		alignSelf: "flex-start",
		marginRight: 20,
		marginLeft: 20,
		marginBottom: 10
	},
	castingContainer: {
		width: "100%",
		paddingRight: 20,
		paddingLeft: 20,
		marginTop: 30
	},
	textCasting: {
		fontSize: 25
	},
	directorContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	videoContainer: {
		aspectRatio: 16 / 9,
		width: "100%",
		paddingRight: 20,
		paddingLeft: 20,
		marginTop: 30
	},
	shadowBottom: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "60%",
		transform: [{ rotate: "180deg" }],
		zIndex: 1
	},
	menuButton: {
		fontSize: 24,
		color: "#ffffff"
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20
	},
	playlistText: {
		fontSize: 16,
		color: "#333"
	},
	selectedPlaylist: {
		fontSize: 16,
		color: "#1E90FF",
		fontWeight: "bold"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 20
	},
	noPlaylistsText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginVertical: 20
	},
	selectContainer: {
		width: "100%",
		marginVertical: 10,
		backgroundColor: "#f9f9f9",
		borderRadius: 5,
		padding: 10
	},
	noImage: {
		aspectRatio: 2 / 3,
		backgroundColor: "#ccc"
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
	}
});

export default styles;
