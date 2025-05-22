import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		zIndex: 2,
		alignSelf: "flex-end"
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
		top: -30,
		left: -20,
		zIndex: 5,
		borderRadius: 30,
		paddingVertical: 0,
		paddingHorizontal: 0,
		minWidth: 160
	},
	menuItem: {
		backgroundColor: "#0A1E38",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 30
	},
	menuItemTitle: {
		color: "#FFFFFF",
		fontWeight: "bold"
	},
	menuItemContent: {
		backgroundColor: "#0A1E38"
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
		fontSize: 18,
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
		fontSize: 16
	},
	selectedItem: {
		backgroundColor: "#1F4E89"
	},
	selectedText: {
		fontWeight: "bold"
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	input: {
		backgroundColor: "#1E2D4F",
		color: "#FFFFFF",
		width: "100%",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
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
	}
});

export default styles;
