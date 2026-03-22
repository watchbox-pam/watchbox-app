import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headers: {
		position: "absolute",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		marginTop: 10,
		zIndex: 100,
		alignItems: "center",
		paddingVertical: 10
	},
	editButton: {
		top: -10
	},
	container: {
		width: "100%",
		backgroundColor: "#0A1E38",
		margin: 0
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0A1E38"
	},
	contentContainer: {
		alignItems: "center",
		paddingVertical: 90
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25
	},
	viewResult: {
		height: 175
	},
	resultatInfo: {
		flexDirection: "row",
		paddingHorizontal: 10,
		width: "100%"
	},
	image: {
		width: 90,
		height: 130,
		borderRadius: 10,
		backgroundColor: "#313131"
	},
	resultInfo: {
		width: "60%",
		marginLeft: 10
	},
	resultTitle: {
		color: "#EBDDFF",
		fontWeight: "bold",
		fontSize: 20,
		marginTop: 10
	},
	resultYear: {
		color: "#fff",
		fontSize: 14
	},
	separator: {
		width: "95%",
		height: 1,
		backgroundColor: "#EBDDFF",
		position: "absolute",
		bottom: 20
	},
	NoResult: {
		margin: "auto",
		height: "100%",
		fontSize: 30
	},
	playlistName: {
		color: "#FFFFFF",
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 30,
		marginLeft: 10
	},
	deleteIconContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10
	},
	deleteIcon: {
		marginLeft: 10,
		alignSelf: "center"
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
	},

	modalContent: {
		backgroundColor: "#0A1E38",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center"
	},

	modalTitle: {
		fontSize: 18,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 15
	},

	input: {
		backgroundColor: "#1E2D4F",
		color: "#FFFFFF",
		width: "100%",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5
	},

	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20
	},

	switchLabel: {
		color: "#FFFFFF",
		fontSize: 16
	},

	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});

export default styles;
