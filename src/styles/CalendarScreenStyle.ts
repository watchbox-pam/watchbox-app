import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		paddingTop: 60
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 20
	},
	CalendarTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	todayButton: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 10,
		marginHorizontal: 16,
		marginBottom: 16,
		alignItems: "center"
	},
	todayButtonText: {
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "600"
	},

	// Navigation du mois
	monthNavigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 20
	},
	monthYearText: {
		fontSize: 20,
		fontWeight: "600",
		color: "#FFFFFF"
	},

	// Calendrier
	calendarContainer: {
		paddingHorizontal: 16,
		marginBottom: 20
	},
	weekDaysContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 10
	},
	weekDayCell: {
		width: "14.28%",
		alignItems: "center"
	},
	weekDayText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#888888"
	},
	daysGrid: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	emptyDay: {
		width: "14.28%",
		height: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	dayCell: {
		width: "14.28%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		position: "relative"
	},
	dayText: {
		fontSize: 16,
		color: "#FFFFFF"
	},
	today: {
		backgroundColor: "#007AFF"
	},
	todayText: {
		color: "#FFFFFF",
		fontWeight: "bold"
	},
	selectedDay: {
		backgroundColor: "#FFD700"
	},
	selectedDayText: {
		color: "#000000",
		fontWeight: "bold"
	},
	eventDot: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#FF3B30",
		position: "absolute",
		bottom: 8
	},

	// Section des événements
	eventsSection: {
		paddingHorizontal: 16,
		marginTop: 20
	},
	eventsSectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#FFFFFF",
		marginBottom: 16
	},
	eventCard: {
		flexDirection: "row",
		backgroundColor: "#1C1C1E",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: "#007AFF"
	},
	eventTime: {
		fontSize: 16,
		fontWeight: "600",
		color: "#007AFF",
		marginRight: 16,
		width: 60
	},
	eventDetails: {
		flex: 1
	},
	eventTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#FFFFFF",
		marginBottom: 4
	},
	eventDescription: {
		fontSize: 14,
		color: "#888888"
	},
	noEvents: {
		padding: 32,
		alignItems: "center"
	},
	noEventsText: {
		fontSize: 16,
		color: "#888888"
	},
	eventPoster: {
		width: 50,
		height: 75,
		borderRadius: 6,
		marginRight: 12
	},
	eventMeta: {
		flexDirection: "row",
		gap: 8,
		marginTop: 4
	},
	eventRating: {
		fontSize: 12,
		color: "#FFD700"
	},
	eventGenre: {
		fontSize: 12,
		color: "#888"
	}
});

export default styles;
