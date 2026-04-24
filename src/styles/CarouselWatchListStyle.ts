import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		height: 180,
		paddingHorizontal: 16,
		marginTop: 4,
		marginBottom: 16
	},
	imageContainer: {
		width: 108,
		aspectRatio: 2 / 3
		// borderRadius: 10,
		// overflow: "hidden",
		// borderWidth: 1,
		// borderColor: "rgba(255,255,255,0.07)",
	},
	image: {
		width: "100%",
		height: "100%"
		// borderRadius: 10,
		// backgroundColor: "#0d2240",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.03)",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.06)",
		borderStyle: "dashed",
		marginHorizontal: 4,
		paddingVertical: 24,
		paddingHorizontal: 20
	},
	emptyText: {
		fontSize: 14,
		color: "rgba(255,255,255,0.4)",
		fontWeight: "500",
		textAlign: "center",
		marginBottom: 6
	},
	emptySubText: {
		fontSize: 12,
		color: "rgba(255,255,255,0.25)",
		textAlign: "center",
		lineHeight: 18
	},
	emptyHighlight: {
		color: "#1E90FF",
		fontWeight: "600"
	}
});

export default styles;
