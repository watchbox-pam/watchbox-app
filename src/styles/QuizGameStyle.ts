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
	headerGenre: {
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "400",
		letterSpacing: 3,
		textTransform: "uppercase"
	},
	headerQuiz: {
		color: "#FFFFFF",
		fontSize: 28,
		fontWeight: "900",
		marginTop: -4
	},
	headerSpacer: {
		width: 45
	},
	timerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginBottom: 12
	},
	timerBarBg: {
		flex: 1,
		marginHorizontal: 16,
		height: 5,
		backgroundColor: "rgba(255,255,255,0.15)",
		borderRadius: 3
	},
	timerBarFill: {
		height: 5,
		backgroundColor: "#AC2821",
		borderRadius: 3
	},
	timerText: {
		color: "#FFFFFF",
		fontSize: 13,
		fontWeight: "700",
		minWidth: 28,
		textAlign: "right",
		marginRight: 16
	},
	movieImageContainer: {
		marginHorizontal: 16,
		borderRadius: 14,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "rgba(255,255,255,0.15)",
		marginBottom: 20,
		height: 200
	},
	movieImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover"
	},
	question: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		marginHorizontal: 20,
		marginBottom: 24,
		lineHeight: 28
	},
	answersContainer: {
		paddingHorizontal: 16,
		gap: 12,
		marginBottom: 24
	},
	answerButton: {
		backgroundColor: "#13396A",
		borderRadius: 10,
		paddingVertical: 16,
		paddingHorizontal: 20,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent"
	},
	answerButtonSelected: {
		backgroundColor: "#0D2B55",
		borderColor: "#FFFFFF"
	},
	answerButtonCorrect: {
		backgroundColor: "#1A5C2A",
		borderColor: "#4CAF50"
	},
	answerButtonWrong: {
		backgroundColor: "#5C1A1A",
		borderColor: "#AC2821"
	},
	answerText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600"
	},
	validateButton: {
		marginHorizontal: 16,
		backgroundColor: "#AC2821",
		borderRadius: 10,
		paddingVertical: 16,
		alignItems: "center"
	},
	validateButtonDisabled: {
		backgroundColor: "#5A1010",
		opacity: 0.6
	},
	validateText: {
		color: "#FFFFFF",
		fontSize: 17,
		fontWeight: "700"
	},
	progressRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		marginBottom: 16
	},
	progressDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "rgba(255,255,255,0.25)"
	},
	progressDotActive: {
		backgroundColor: "#FFFFFF"
	},
	progressDotDone: {
		backgroundColor: "#AC2821"
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 16
	},
	loadingText: {
		color: "rgba(255,255,255,0.6)",
		fontSize: 15
	},
	errorText: {
		color: "#ff6b6b",
		fontSize: 15,
		textAlign: "center",
		marginHorizontal: 24
	},
	resultContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
		gap: 16
	},
	resultEmoji: {
		fontSize: 64
	},
	resultPoints: {
		color: "#FFFFFF",
		fontSize: 48,
		fontWeight: "900"
	},
	resultPointsLabel: {
		color: "rgba(255,255,255,0.6)",
		fontSize: 16,
		marginTop: -12
	},
	resultCorrect: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "700"
	},
	resultLevel: {
		color: "rgba(255,255,255,0.6)",
		fontSize: 15
	},
	submitErrorTitle: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "800",
		textAlign: "center"
	},
	submitErrorMessage: {
		color: "rgba(255,255,255,0.6)",
		fontSize: 15,
		textAlign: "center",
		lineHeight: 22
	},
	resultButtonRow: {
		flexDirection: "row",
		gap: 12,
		marginTop: 16
	},
	resultButtonSecondary: {
		flex: 1,
		backgroundColor: "#13396A",
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center"
	},
	resultButtonPrimary: {
		flex: 1,
		backgroundColor: "#AC2821",
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center"
	},
	resultButtonText: {
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "700"
	},
	sameDirectorBlock: {
		marginHorizontal: 20,
		marginBottom: 24,
		gap: 8
	},
	sameDirectorLabel: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		marginBottom: 4
	},
	sameDirectorRow: {
		flexDirection: "row",
		alignItems: "center",
		borderLeftWidth: 3,
		borderLeftColor: "#AC2821",
		paddingVertical: 8,
		paddingHorizontal: 14,
		gap: 12
	},
	sameDirectorIndex: {
		color: "rgba(255,255,255,0.35)",
		fontSize: 13,
		fontWeight: "700",
		width: 16,
		textAlign: "center"
	},
	sameDirectorTitle: {
		color: "rgba(255,255,255,0.85)",
		fontSize: 15,
		fontWeight: "500",
		fontStyle: "italic",
		flex: 1
	},
	posterGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: 16,
		gap: 10,
		marginBottom: 24
	},
	posterCard: {
		width: "47.5%",
		aspectRatio: 2 / 3,
		borderRadius: 10,
		overflow: "hidden",
		borderWidth: 3,
		borderColor: "transparent",
		backgroundColor: "#13396A"
	},
	posterCardSelected: {
		borderColor: "#FFFFFF"
	},
	posterCardCorrect: {
		borderColor: "#4CAF50"
	},
	posterCardWrong: {
		borderColor: "#AC2821"
	},
	posterCardImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover"
	},
	posterCardPlaceholder: {
		flex: 1,
		backgroundColor: "#13396A"
	},
	posterCardLabel: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0,0,0,0.75)",
		paddingVertical: 6,
		paddingHorizontal: 8
	},
	posterCardLabelText: {
		color: "#FFFFFF",
		fontSize: 11,
		fontWeight: "700",
		textAlign: "center"
	},
	quitModalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32
	},
	quitModalCard: {
		backgroundColor: "#0D2547",
		borderRadius: 16,
		padding: 24,
		width: "100%",
		gap: 12
	},
	quitModalTitle: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "800",
		textAlign: "center"
	},
	quitModalMessage: {
		color: "rgba(255,255,255,0.65)",
		fontSize: 14,
		textAlign: "center",
		lineHeight: 20
	},
	quitModalButtons: {
		flexDirection: "row",
		gap: 10,
		marginTop: 8
	},
	quitModalContinue: {
		flex: 1,
		backgroundColor: "#13396A",
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center"
	},
	quitModalQuit: {
		flex: 1,
		backgroundColor: "#AC2821",
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center"
	},
	quitModalButtonText: {
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "700"
	}
});

export default styles;
