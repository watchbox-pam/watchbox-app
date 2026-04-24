import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#07192e" },
	contentContainer: { paddingTop: 80, paddingBottom: 40 },
	loading: {
		flex: 1,
		backgroundColor: "#07192e",
		justifyContent: "center",
		alignItems: "center"
	},

	// Header
	headers: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 14,
		zIndex: 100,
		backgroundColor: "rgba(7,25,46,0.95)",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(30,144,255,0.12)"
	},
	playlistName: {
		flex: 1,
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "700",
		letterSpacing: -0.3,
		textAlign: "center",
		marginHorizontal: 8
	},

	// Movie row
	viewResult: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255,255,255,0.06)"
	},
	resultatInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14
	},
	image: {
		width: 72,
		height: 108,
		borderRadius: 10,
		backgroundColor: "#0d2240"
	},
	resultInfo: { flex: 1 },
	resultTitle: {
		color: "#e8f0fe",
		fontSize: 16,
		fontWeight: "600",
		letterSpacing: -0.2,
		marginBottom: 6
	},
	resultYear: {
		color: "#4a6a8a",
		fontSize: 13
	},
	deleteIconContainer: {
		padding: 8,
		backgroundColor: "rgba(224,90,90,0.1)",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(224,90,90,0.2)"
	},

	NoResult: {
		color: "#4a6a8a",
		fontSize: 16,
		textAlign: "center",
		marginTop: 60
	},

	// Modal
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.65)",
		justifyContent: "flex-end"
	},
	modalSheet: {
		backgroundColor: "#0d2240",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		padding: 24,
		borderWidth: 1,
		borderColor: "rgba(30,144,255,0.15)",
		borderBottomWidth: 0
	},
	modalHandle: {
		width: 36,
		height: 4,
		backgroundColor: "rgba(255,255,255,0.15)",
		borderRadius: 2,
		alignSelf: "center",
		marginBottom: 20
	},
	modalTitle: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 20,
		letterSpacing: -0.3
	},
	input: {
		width: "100%",
		backgroundColor: "rgba(255,255,255,0.05)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
		borderRadius: 12,
		padding: 14,
		color: "#ffffff",
		fontSize: 15,
		marginBottom: 16
	},
	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
		gap: 10
	},
	checkbox: {
		width: 22,
		height: 22,
		borderRadius: 6,
		borderWidth: 1.5,
		borderColor: "rgba(30,144,255,0.5)"
	},
	checkboxChecked: { backgroundColor: "#1E90FF", borderColor: "#1E90FF" },
	checkboxLabel: { color: "#c0d4f0", fontSize: 14 },
	modalButtons: { flexDirection: "row", gap: 10 },
	btnCancel: {
		flex: 1,
		padding: 14,
		borderRadius: 12,
		backgroundColor: "rgba(255,255,255,0.07)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
		alignItems: "center"
	},
	btnCancelText: { color: "#8ba4c0", fontSize: 15, fontWeight: "600" },
	btnConfirm: {
		flex: 1,
		padding: 14,
		borderRadius: 12,
		backgroundColor: "#1E90FF",
		alignItems: "center"
	},
	btnConfirmText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
	btnDelete: {
		flex: 1,
		padding: 14,
		borderRadius: 12,
		backgroundColor: "rgba(224,90,90,0.15)",
		borderWidth: 1,
		borderColor: "rgba(224,90,90,0.3)",
		alignItems: "center"
	},
	btnDeleteText: { color: "#e05a5a", fontSize: 15, fontWeight: "600" }
});

export default styles;
