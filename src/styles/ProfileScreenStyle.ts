import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 0
	},
	contentContainer: {
		alignItems: "center",
		paddingVertical: 20
	},
	errorContainer: {
		padding: 15,
		backgroundColor: "rgba(255, 0, 0, 0.1)",
		borderRadius: 8,
		marginVertical: 10,
		width: "90%",
		alignItems: "center"
	},
	errorText: {
		color: "#ffffff",
		fontWeight: "bold",
		textAlign: "center"
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
		flexDirection: "row",
		width: "70%",
		marginRight: 20
	},
	ProfilPicture: {
		width: 100,
		height: 100,
		borderRadius: 100,
		borderWidth: 3,
		borderColor: "#ffffff",
		zIndex: 1
	},
	title: {
		fontSize: 30,
		color: "#ffffff",
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		width: "90%"
	},
	text: {
		fontSize: 15
	},
	textBold: {
		fontWeight: "bold"
	},
	description: {
		fontSize: 20,
		paddingRight: 20,
		paddingLeft: 20,
		marginBottom: 20,
		zIndex: -1
	},
	Trait: {
		marginTop: 20,
		marginBottom: 20
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
		alignSelf: "flex-end"
	},
	tagContainer: {
		marginBottom: -10
	},
	textTag: {
		fontSize: 10
	},
	WatchList: {
		width: 350,
		marginBottom: 10,
		zIndex: -10
	},
	TitleWatchList: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		marginLeft: 10
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
	watchListHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10
	},
	createWatchlistButton: {
		backgroundColor: "#1E90FF",
		padding: 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		width: 30,
		height: 30,
		zIndex: -1
	},
	createWatchlistButtonText: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 22,
		zIndex: -1
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#0A1E38",
		borderRadius: 10,
		padding: 20,
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 20,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 20
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		color: "#fff"
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 10
	},
	checkboxChecked: {
		backgroundColor: "#1E90FF"
	},
	checkboxLabel: {
		fontSize: 16,
		color: "#fff"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	playlistItem: {
		backgroundColor: "#1E90FF",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10
	},
	playlistTitle: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold"
	},
	playlistPrivacy: {
		color: "#ffffff",
		fontSize: 14
	},
	noPlaylistsText: {
		color: "#ffffff",
		fontSize: 16,
		textAlign: "center"
	}
});

export default styles;
