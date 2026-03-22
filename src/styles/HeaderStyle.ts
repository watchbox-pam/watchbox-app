import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 20,
		width: "100%",
		fontFamily: "Oswald",
		marginTop: Platform.OS === "ios" ? 30 : 0
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#FFFFFF"
	}
});

export default styles;
