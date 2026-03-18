import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		zIndex: 2
	},
	button: {
		alignItems: "center",
		backgroundColor: "#13396A",
		padding: 10,
		borderRadius: 50,
		width: 45,
		height: 45,
		justifyContent: "center"
	},
	menuContent: {
		backgroundColor: "#0A1E38",
		borderWidth: 1,
		top: 30,
		left: 130,
		zIndex: 5,
		borderRadius: 30,
		paddingVertical: 0,
		paddingHorizontal: 0,
		minWidth: 160
	},
	menuItemContent: {
		paddingLeft: 0,
		flexDirection: "row",
		minWidth: 180
	},
	menuItem: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 30
	},
	menuItemTitle: {
		color: "#FFFFFF",
		fontWeight: "bold"
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
		fontSize: 40,
		color: "#FFFFFF",
		fontWeight: "bold",
		marginBottom: 10
	},
	selectContainer: {
		width: "100%",
		maxHeight: 200,
		marginBottom: 20
	},
	playlistItem: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		backgroundColor: "#13396A",
		borderRadius: 8,
		marginBottom: 8
	},
	playlistText: {
		color: "#FFFFFF",
		fontSize: 20
	},
	selectedItem: {
		backgroundColor: "#4A90E2",
		borderColor: "#FFFFFF",
		borderWidth: 2
	},
	selectedText: {
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});

export default styles;
