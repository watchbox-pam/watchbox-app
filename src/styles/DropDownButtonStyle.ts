import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	trigger: {
		backgroundColor: "rgba(255,255,255,0.07)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.12)",
		paddingHorizontal: 8,
		paddingVertical: 7,
		borderRadius: 50,
		alignSelf: "flex-start"
	},
	triggerText: {
		color: "#8ba4c0",
		fontSize: 13,
		letterSpacing: 1
	},
	menu: {
		backgroundColor: "#0d2240",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(30,144,255,0.15)",
		width: 220,
		marginTop: 33
	},
	menuItem: {
		color: "#c8dcf4",
		fontSize: 14
	},
	logoutText: {
		color: "#e05a5a",
		fontSize: 14
	}
});

export default styles;
