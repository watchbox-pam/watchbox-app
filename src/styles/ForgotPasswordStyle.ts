import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 16
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		color: "#fff",
		marginBottom: 8,
		marginTop: 8
	},
	subtitle: {
		fontSize: 14,
		color: "rgba(255,255,255,0.45)",
		lineHeight: 21,
		marginBottom: 32
	},
	inputLabel: {
		fontSize: 11,
		fontWeight: "600",
		letterSpacing: 1,
		color: "rgba(255,255,255,0.4)",
		textTransform: "uppercase",
		marginBottom: 8
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.06)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
		borderRadius: 12,
		paddingHorizontal: 14,
		height: 52,
		gap: 10
	},
	input: {
		flex: 1,
		color: "#fff",
		fontSize: 15
	},
	button: {
		backgroundColor: "#AC2128",
		borderRadius: 14,
		paddingVertical: 16,
		alignItems: "center",
		marginTop: 28
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 15
	},
	helperText: {
		textAlign: "center",
		color: "rgba(255,255,255,0.3)",
		marginTop: 16
	},
	helperLink: {
		color: "#AC2128",
		fontWeight: "600"
	}
});

export default styles;
