import { StyleSheet } from "react-native";

const RED = "#AC2128";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 24
	},
	step: {
		color: "#9AA4B2",
		fontSize: 13,
		textTransform: "uppercase",
		letterSpacing: 1,
		marginBottom: 6
	},
	title: {
		color: "#fff",
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 8
	},
	subtitle: {
		color: "#C9D1DB",
		fontSize: 15,
		lineHeight: 21,
		marginBottom: 20
	},
	grid: {
		paddingBottom: 16
	},
	row: {
		gap: 12,
		marginBottom: 12
	},
	tile: {
		flex: 1,
		aspectRatio: 1,
		borderRadius: 14,
		borderWidth: 2,
		borderColor: "transparent",
		backgroundColor: "#0A1E38",
		alignItems: "center",
		justifyContent: "center",
		padding: 8
	},
	tileSelected: {
		borderColor: RED
	},
	tileLogo: {
		width: "62%",
		aspectRatio: 1,
		borderRadius: 10
	},
	tileName: {
		color: "#fff",
		fontSize: 12,
		textAlign: "center",
		marginTop: 6
	},
	tileCheck: {
		position: "absolute",
		top: 6,
		right: 6,
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: RED,
		alignItems: "center",
		justifyContent: "center"
	},
	emptySlot: {
		flex: 1
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 12
	},
	message: {
		color: "#C9D1DB",
		textAlign: "center"
	},
	footer: {
		paddingVertical: 16
	},
	counter: {
		color: "#9AA4B2",
		textAlign: "center",
		marginBottom: 10
	},
	button: {
		backgroundColor: RED,
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center"
	},
	buttonDisabled: {
		opacity: 0.6
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 17
	},
	secondaryButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#6B737A"
	},
	secondaryButtonText: {
		color: "#fff"
	}
});

export default styles;
