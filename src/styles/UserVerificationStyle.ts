import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		margin: 15
	},
	topBar: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	title: {
		fontSize: 40,
		fontWeight: "bold",
		marginBottom: 15
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#6B737A",
		marginBottom: 15,
		color: "#fff",
		padding: 5
	},
	picker: {
		height: 75,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#6B737A",
		marginBottom: 15,
		color: "#fff",
		padding: 5
	},
	btnSignUp: {
		width: "100%",
		alignItems: "center"
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
