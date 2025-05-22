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
		padding: 0,
		borderRadius: 30,
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
		display: "flex"
	},
	backButtonText: {
		color: "#ffffff",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		lineHeight: 24,
		includeFontPadding: false,
		textAlignVertical: "center"
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
	movieCard: {
		flex: 1,
		margin: 8,
		borderRadius: 8,
		overflow: "hidden",
		maxWidth: "47%",
		display: "flex",
		flexDirection: "column"
	},
	imagePosterContainer: {
		width: "100%",
		aspectRatio: 2 / 3,
		overflow: "hidden",
		borderRadius: 8
	},
	poster: {
		aspectRatio: 2 / 3
	},
	noPoster: {
		width: "100%",
		height: 200,
		backgroundColor: "#0f2c53",
		justifyContent: "center",
		alignItems: "center"
	},
	noPosterText: {
		color: "#ffffff"
	},
	movieTitle: {
		padding: 10,
		fontSize: 14,
		fontWeight: "600",
		color: "#ffffff"
	}
});

export default styles;
