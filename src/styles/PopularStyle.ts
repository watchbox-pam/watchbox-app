import { StyleSheet, Dimensions } from "react-native";

const PopularStyle = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#0D1B34"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingTop: 30,
		paddingBottom: 10
	},
	titleContainer: {
		marginBottom: 20
	},
	mainTitleText: {
		color: "white",
		fontSize: 36,
		fontWeight: "700",
		lineHeight: 42,
		letterSpacing: 0.5,
		fontFamily: "Helvetica-Bold"
	},
	subTitleText: {
		color: "white",
		fontSize: 24,
		fontWeight: "300",
		marginTop: -5,
		fontFamily: "Helvetica-Light"
	},
	emotionButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#AC2128",
		alignSelf: "flex-start",
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 20,
		marginTop: 5,
		marginBottom: 15
	},
	emotionButtonText: {
		color: "white",
		fontSize: 16
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: {
		color: "white"
	},
	flatListContainer: {
		flex: 1
	},
	flatListContent: {
		paddingLeft: 20,
		paddingRight: 10
	},
	movieItemContainer: {
		width: 150,
		marginRight: 15,
		marginVertical: 10
	},
	posterImage: {
		width: 150,
		height: 220,
		borderRadius: 5,
		marginBottom: 8,
		backgroundColor: "#143B6F"
	},
	noPosterContainer: {
		width: 150,
		height: 220,
		backgroundColor: "#143B6F",
		borderRadius: 5,
		marginBottom: 8,
		justifyContent: "center",
		alignItems: "center"
	},
	noPosterText: {
		color: "white"
	},
	movieTitle: {
		color: "white",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 2,
		textAlign: "center"
	}
});

export default PopularStyle;
