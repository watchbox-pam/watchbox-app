import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		zIndex: 2
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
		backgroundColor: "#13396A",
		borderWidth: 1,
		top: 95,
		left: 188,
		zIndex: 5,
		borderRadius: 30,
		paddingVertical: 0,
		paddingHorizontal: 0,
		minWidth: 160
	},
	menuItemContent: {
		paddingLeft: 0,
		alignItems: "baseline"
	},
	menuItem: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 30
	},
	menuItemTitle: {
		color: "#FFFFFF",
		fontWeight: "bold"
	}
});

export default styles;
