import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#0A1E38"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	NotifTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	notification: {
		padding: 15,
		marginVertical: 5,
		backgroundColor: "#64a2f9",
		borderRadius: 8
	},
	readNotification: {
		backgroundColor: "#326bbb"
	},
	message: {
		fontSize: 16
	}
});

export default styles;
