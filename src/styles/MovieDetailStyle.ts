import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headers: {
		position: "absolute",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		zIndex: 100
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
		fontSize: 40
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
		alignSelf: "flex-end"
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
	providerTag: {
		backgroundColor: "none"
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
	noImage: {
		aspectRatio: 2 / 3,
		backgroundColor: "#ccc"
	}
});

export default styles;
