import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#07192e" },
	contentContainer: { paddingBottom: 40 },

	// Loading
	loading: {
		flex: 1,
		backgroundColor: "#07192e",
		justifyContent: "center",
		alignItems: "center"
	},

	// Banner
	bannerContainer: {
		width: "100%",
		height: 150,
		position: "relative",
		overflow: "hidden"
	},
	bannerImage: { width: "100%", height: "100%", resizeMode: "cover" },
	bannerGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "75%"
	},
	bannerGradientTop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 60
	},

	// Profile header
	profileSection: { paddingHorizontal: 20, marginTop: -44, zIndex: 10 },
	avatarRow: {
		width: "100%",
		height: 88,
		position: "relative",
		flexDirection: "row"
	},
	avatar: {
		width: 88,
		height: 88,
		borderRadius: 44
	},
	avatarActions: {
		position: "absolute",
		right: 0,
		bottom: 6,
		flexDirection: "row",
		gap: 8
	},
	btnEdit: {
		backgroundColor: "rgba(255,255,255,0.07)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.12)",
		paddingHorizontal: 8,
		paddingVertical: 7,
		borderRadius: 50
	},
	btnEditText: { color: "#5BAAFF", fontSize: 12, fontWeight: "500" },
	btnDots: {
		backgroundColor: "rgba(255,255,255,0.07)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.12)",
		paddingHorizontal: 10,
		paddingVertical: 7,
		borderRadius: 20
	},
	btnDotsText: { color: "#8ba4c0", fontSize: 12 },

	username: {
		color: "#ffffff",
		fontSize: 22,
		fontWeight: "700",
		marginTop: 10,
		letterSpacing: -0.3
	},
	userSub: { color: "#4a6a8a", fontSize: 13, marginTop: 2 },

	divider: {
		height: 1,
		backgroundColor: "rgba(30,144,255,0.18)",
		marginVertical: 16
	},

	editSectionLabel: {
		color: "#4a6a8a",
		fontSize: 11,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 0.8,
		marginBottom: 8
	},
	editMediaButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.05)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.08)",
		borderRadius: 12,
		padding: 14,
		marginBottom: 16,
		gap: 12
	},
	editMediaIcon: {
		fontSize: 18
	},
	editMediaText: {
		flex: 1,
		color: "#c0d4f0",
		fontSize: 14,
		fontWeight: "500"
	},
	editMediaArrow: {
		color: "#4a6a8a",
		fontSize: 20,
		lineHeight: 22
	},

	// Stats
	handle: {
		color: "#4a6a8a",
		fontSize: 13,
		marginTop: 2,
		marginBottom: 14
	},
	statsRow: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%"
	},
	statItem: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 4,
		borderRightWidth: 1,
		borderRightColor: "rgba(255,255,255,0.1)"
	},
	statNum: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "700",
		letterSpacing: -0.3
	},
	statLabel: {
		color: "#4a6a8a",
		fontSize: 12,
		fontWeight: "400",
		marginTop: 1
	},

	// Sections
	section: { paddingHorizontal: 20, marginTop: 20 },
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 14
	},
	sectionTitle: {
		color: "#ffffff",
		fontSize: 15,
		fontWeight: "600",
		letterSpacing: -0.2
	},
	btnAdd: {
		width: 28,
		height: 28,
		backgroundColor: "#1565c0",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center"
	},
	btnAddText: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "700",
		lineHeight: 22
	},

	// Playlist cards
	playlistCard: {
		backgroundColor: "rgba(255,255,255,0.04)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.07)",
		borderRadius: 16,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 10
	},
	historyCard: {
		borderWidth: 1,
		borderColor: "rgba(30,144,255,0.22)",
		borderRadius: 16,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 10,
		overflow: "hidden"
	},
	playlistThumb: {
		width: 54,
		height: 54,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0
	},
	playlistThumbText: { fontSize: 22 },
	playlistInfo: { flex: 1 },
	playlistName: {
		color: "#e8f0fe",
		fontSize: 17,
		fontWeight: "bold",
		letterSpacing: -0.2
	},
	playlistMeta: { color: "#4a6a8a", fontSize: 12, marginTop: 3 },
	badge: {
		backgroundColor: "rgba(30,144,255,0.12)",
		borderWidth: 1,
		borderColor: "rgba(30,144,255,0.22)",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 20
	},
	badgeText: { color: "#5BAAFF", fontSize: 10, fontWeight: "600" },
	badgePrivate: {
		backgroundColor: "rgba(255,255,255,0.06)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.12)",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 20
	},
	badgePrivateText: { color: "#6a8aaa", fontSize: 10, fontWeight: "600" },

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
	emptyPlaylists: {}
});

export default styles;
