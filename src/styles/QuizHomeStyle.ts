import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 8
	},
	headerTitle: {
		flex: 1,
		alignItems: "center"
	},
	headerTitleTop: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "400",
		fontStyle: "italic",
		letterSpacing: 2
	},
	headerTitleMain: {
		color: "#FFFFFF",
		fontSize: 32,
		fontWeight: "900",
		marginTop: -4
	},
	hero: {
		alignItems: "center",
		marginTop: -10,
		marginBottom: 4
	},
	heroImage: {
		width: 240,
		height: 200,
		resizeMode: "contain"
	},
	scoreCard: {
		marginHorizontal: 16,
		backgroundColor: "#F5F0E8",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12
	},
	scoreRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10
	},
	scoreLabelRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4
	},
	scoreLabel: {
		color: "#0A1E38",
		fontSize: 15,
		fontWeight: "700"
	},
	scoreEmoji: {
		fontSize: 15
	},
	scorePoints: {
		color: "#0A1E38",
		fontSize: 15,
		fontWeight: "700"
	},
	progressBarBg: {
		height: 8,
		backgroundColor: "#D9D9D9",
		borderRadius: 4,
		marginBottom: 6
	},
	progressBarFill: {
		height: 8,
		backgroundColor: "#AC2821",
		borderRadius: 4
	},
	levelText: {
		color: "#888",
		fontSize: 13,
		textAlign: "right"
	},
	leaderboardButton: {
		marginHorizontal: 16,
		backgroundColor: "#AC2821",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 20,
		marginBottom: 24
	},
	leaderboardText: {
		flex: 1,
		color: "#FFFFFF",
		fontSize: 17,
		fontWeight: "700"
	},
	leaderboardIcon: {
		backgroundColor: "rgba(255,255,255,0.15)",
		borderRadius: 50,
		padding: 6,
		marginRight: 6
	},
	sectionTitle: {
		color: "#FFFFFF",
		fontSize: 22,
		fontWeight: "800",
		marginHorizontal: 16,
		marginBottom: 14
	},
	genreGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: 12,
		gap: 10
	},
	genreCard: {
		width: "47%",
		height: 110,
		borderRadius: 12,
		overflow: "hidden"
	},
	genreImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover"
	},
	genreOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "55%",
		justifyContent: "flex-end",
		paddingBottom: 10,
		paddingHorizontal: 10
	},
	genreName: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "900",
		letterSpacing: 1.5,
		textShadowColor: "rgba(0,0,0,0.8)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 4
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		justifyContent: "flex-end"
	},
	modalContent: {
		backgroundColor: "#0D2547",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 16,
		paddingBottom: 40,
		maxHeight: "75%"
	},
	modalHandle: {
		width: 40,
		height: 4,
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 2,
		alignSelf: "center",
		marginBottom: 16
	},
	modalTitle: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "800",
		textAlign: "center",
		marginBottom: 16
	},
	leaderboardRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 12,
		gap: 12
	},
	leaderboardRowAlt: {
		backgroundColor: "rgba(255,255,255,0.04)"
	},
	leaderboardRank: {
		color: "rgba(255,255,255,0.5)",
		fontSize: 14,
		fontWeight: "700",
		width: 28,
		textAlign: "center"
	},
	leaderboardRankTop: {
		color: "#FFD700",
		fontSize: 16
	},
	leaderboardUsername: {
		flex: 1,
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "600"
	},
	leaderboardScore: {
		color: "rgba(255,255,255,0.7)",
		fontSize: 14,
		fontWeight: "700"
	},
	leaderboardLevel: {
		color: "#AC2821",
		fontSize: 12,
		fontWeight: "700"
	}
});

export default styles;
