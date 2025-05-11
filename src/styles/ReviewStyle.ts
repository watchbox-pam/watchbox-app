import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5
	},
	title: {
		fontSize: 36
	},
	comment: {
		height: 40,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#6B737A",
		marginBottom: 15,
		color: "#fff",
		padding: 5
	},
	button: {
		backgroundColor: "#AC2128",
		width: "75%",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		margin: 8
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 17
	}
});

export default styles;
