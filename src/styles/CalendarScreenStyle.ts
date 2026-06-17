import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07192e",
		paddingTop: 20
	},

	// Navigation mois
	monthNavigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 24
	},
	monthYearText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#ffffff",
		letterSpacing: 0.3
	},
	navBtn: {
		padding: 8
	},

	// Bouton aujourd'hui
	todayButton: {
		alignSelf: "center",
		paddingHorizontal: 20,
		paddingVertical: 7,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(30,144,255,0.4)",
		marginBottom: 20
	},
	todayButtonText: {
		color: "#1E90FF",
		fontSize: 13,
		fontWeight: "500"
	},

	// Calendrier
	calendarContainer: {
		paddingHorizontal: 16,
		marginBottom: 8
	},
	weekDaysContainer: {
		flexDirection: "row",
		marginBottom: 8
	},
	weekDayCell: {
		width: "14.28%",
		alignItems: "center",
		paddingVertical: 4
	},
	weekDayText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#4a6a8a",
		textTransform: "uppercase",
		letterSpacing: 0.5
	},
	daysGrid: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	dayCell: {
		width: "14.28%",
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		position: "relative"
	},
	dayText: {
		fontSize: 15,
		color: "#ccd6e0",
		fontWeight: "400"
	},
	today: {
		backgroundColor: "#1E90FF",
		borderRadius: 24
	},
	todayText: {
		color: "#ffffff",
		fontWeight: "700"
	},
	selectedDay: {
		borderRadius: 24,
		borderWidth: 1,
		borderColor: "#1E90FF"
	},
	selectedDayText: {
		color: "#1E90FF",
		fontWeight: "600"
	},
	eventDot: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#1E90FF",
		position: "absolute",
		bottom: 6
	},

	// Séparateur
	divider: {
		height: 1,
		backgroundColor: "rgba(255,255,255,0.06)",
		marginHorizontal: 16,
		marginVertical: 20
	},

	// Événements
	eventsSection: {
		paddingHorizontal: 16,
		paddingBottom: 40
	},
	eventsSectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16
	},
	eventsSectionTitle: {
		fontSize: 15,
		fontWeight: "500",
		color: "#ffffff"
	},
	addEventButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "rgba(30,144,255,0.4)",
		justifyContent: "center",
		alignItems: "center"
	},
	eventCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.03)",
		borderRadius: 10,
		marginBottom: 8,
		overflow: "hidden"
	},
	eventLeftBar: {
		width: 3,
		alignSelf: "stretch",
		backgroundColor: "#1E90FF"
	},
	eventDetails: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 14,
		gap: 2
	},
	eventTime: {
		color: "#1E90FF",
		fontSize: 12,
		fontWeight: "500"
	},
	eventTitle: {
		color: "#ffffff",
		fontSize: 15,
		fontWeight: "500"
	},
	eventDescription: {
		color: "#4a6a8a",
		fontSize: 13,
		marginTop: 2
	},
	deleteBtn: {
		padding: 12
	},
	noEventsText: {
		color: "#4a6a8a",
		fontSize: 14,
		textAlign: "center",
		paddingVertical: 32
	},

	// Modal
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		justifyContent: "flex-end"
	},
	modalSheet: {
		backgroundColor: "#0d2137",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 24,
		paddingBottom: 40,
		paddingTop: 12
	},
	modalHandle: {
		width: 36,
		height: 4,
		borderRadius: 2,
		backgroundColor: "rgba(255,255,255,0.15)",
		alignSelf: "center",
		marginBottom: 20
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#ffffff",
		marginBottom: 20
	},
	inputLabel: {
		fontSize: 12,
		fontWeight: "500",
		color: "#4a6a8a",
		textTransform: "uppercase",
		letterSpacing: 0.5,
		marginBottom: 8,
		marginTop: 16
	},
	input: {
		backgroundColor: "rgba(255,255,255,0.05)",
		borderRadius: 10,
		padding: 14,
		color: "#ffffff",
		fontSize: 15,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.08)"
	},
	modalButtons: {
		flexDirection: "row",
		gap: 12,
		marginTop: 28
	},
	btnCancel: {
		flex: 1,
		paddingVertical: 14,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
		alignItems: "center"
	},
	btnCancelText: {
		color: "#4a6a8a",
		fontSize: 15,
		fontWeight: "500"
	},
	btnConfirm: {
		flex: 1,
		paddingVertical: 14,
		borderRadius: 10,
		backgroundColor: "#1E90FF",
		alignItems: "center"
	},
	btnConfirmText: {
		color: "#ffffff",
		fontSize: 15,
		fontWeight: "600"
	}
});

export default styles;
