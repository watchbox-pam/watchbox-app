import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		margin: 15,
		marginHorizontal: "auto",
		padding: 0,
		width: "95%"
	},
	topBar: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	formContainer: {
		width: "100%"
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
	btnForm: {
		width: "100%",
		marginTop: 15
	},
	button: {
		backgroundColor: "#AC2128",
		width: "75%",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		margin: "auto"
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 17
	},
	forgotPasswordContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	linkContainer: {
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center"
	},
	linkText: {
		color: "#fff"
	},
	linkRedirection: {
		fontWeight: "bold",
		color: "#AC2128",
		textDecorationLine: "underline"
	}
});

export default styles;
