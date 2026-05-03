import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: "#0A1E38"
	},
	title: {
		fontSize: 36,
		color: "#fff"
	},
	comment: {
		flex: 1,
		backgroundColor: "#122B4A",
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#6B737A",
		marginBottom: 15,
		color: "#fff",
		padding: 10
	},
	ratingView: {
		alignItems: "center"
	},
	spoilerView: {
		alignItems: "flex-start"
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
