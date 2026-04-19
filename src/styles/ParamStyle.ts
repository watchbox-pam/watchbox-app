import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#0A1E38",
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	paramTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		backgroundColor: "#143b71",
		borderRadius: 8,
		width: "100%",
		height: 70,
		marginHorizontal: "auto",
		marginBottom: 30
	},
	Reditem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		backgroundColor: "#8B0000",
		borderRadius: 8,
		width: "100%",
		height: 70,
		marginHorizontal: "auto",
		marginBottom: 30
	},
	// Styles pour le modal
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	modalContent: {
		backgroundColor: "#1C1C1E",
		borderRadius: 20,
		padding: 24,
		width: "100%",
		maxWidth: 400,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 16,
		textAlign: "center"
	},
	modalText: {
		fontSize: 16,
		color: "#B0B0B0",
		lineHeight: 24,
		marginBottom: 24,
		textAlign: "center"
	},
	boldText: {
		fontWeight: "bold",
		color: "#FF3B30"
	},
	modalButtons: {
		flexDirection: "row",
		gap: 12
	},
	modalButton: {
		flex: 1,
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center"
	},
	cancelButton: {
		backgroundColor: "#2C2C2E"
	},
	cancelButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600"
	},
	deleteButton: {
		backgroundColor: "#FF3B30"
	},
	deleteButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600"
	},
	text: { fontSize: 18, color: "#fff" },
	desc: { fontSize: 12, color: "#fff" },
	toggleContainer: {
		flexDirection: "row",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#0A1E38",
		height: "80%",
		alignItems: "center"
	},
	toggleButton: {
		paddingVertical: 10,
		padding: 15,
		width: 68,
		alignItems: "center"
	},
	active: {
		backgroundColor: "#143b71",
		height: "80%",
		marginHorizontal: 10,
		borderRadius: 8
	},
	inactive: {
		backgroundColor: "#0A1E38"
	},
	toggleText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold"
	},
	activeText: {
		color: "#fff"
	},
	confirmButton: {
		backgroundColor: "#007AFF"
	},
	confirmButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600"
	},
	readMoreButton: {
		marginTop: 10
	},
	readMoreText: {
		fontWeight: "600"
	},
	CheckboxItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		borderRadius: 8,
		width: "100%",
		height: 35,
		marginHorizontal: "auto",
		marginBottom: 30
	},
	// Nouveaux styles pour les providers
	providersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: "100%"
	},
	providerButton: {
		width: 60,
		height: 60,
		margin: 5,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "transparent",
		backgroundColor: "#0A1E38",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden"
	},
	selectedProvider: {
		borderColor: "#FFF"
	},
	providerLogo: {
		width: 50,
		height: 50,
		borderRadius: 6
	},
	providerText: {
		color: "#FFF",
		fontSize: 10,
		textAlign: "center",
		padding: 2
	}
});

export default styles;
