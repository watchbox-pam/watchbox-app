import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	userCard: {
		display: "flex",
		flexDirection: "row",
		padding: 15
	},
	userProfilePicture: {
		width: 75,
		height: 75,
		borderRadius: 44
	},
	userName: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 18,
		marginStart: 10
	}
});

export default styles;
