import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { backgroundColor: "#0A1E38", padding: 20, gap: 16 },
	title: {
		color: "#FFFFFF",
		fontSize: 22,
		fontWeight: "800",
		lineHeight: 30
	},
	buttonquizz: {
		backgroundColor: "#AC2821",
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 16,
		gap: 12
	},
	iconQuizzButton: {
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		borderRadius: 50,
		padding: 6
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "700",
		flex: 1
	}
});

export default styles;
