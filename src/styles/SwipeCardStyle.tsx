import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#13396A",
		borderRadius: 20,
		position: "absolute",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.35,
		shadowRadius: 12,
		elevation: 8,
		overflow: "hidden"
	},
	posterImage: {
		aspectRatio: 2 / 3,
		width: "100%",
		height: "100%",
		margin: "auto"
	},
	// cardFooter: {
	// 	flex: 1,
	// 	paddingHorizontal: 16,
	// 	paddingVertical: 12,
	// 	justifyContent: "center"
	// },
	// cardTitle: {
	// 	fontSize: 17,
	// 	fontWeight: "700",
	// 	color: "#ffffff",
	// 	marginBottom: 2
	// },
	// cardMeta: { fontSize: 13, color: "#9ca3af" },
	label: {
		position: "absolute",
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 8,
		borderWidth: 3
	},
	labelText: {
		fontSize: 22,
		fontWeight: "900",
		letterSpacing: 2
	},
	likeLabel: {
		top: 28,
		left: 20,
		borderColor: "#22c55e",
		transform: [{ rotate: "-15deg" }]
	},
	likeLabelText: {
		color: "#22c55e"
	},
	nopeLabel: {
		top: 28,
		right: 20,
		borderColor: "#ef4444",
		transform: [{ rotate: "15deg" }]
	},
	nopeLabelText: {
		color: "#ef4444"
	},
	skipLabel: {
		top: 28,
		alignSelf: "center",
		borderColor: "#f59e0b",
		transform: [{ rotate: "0deg" }]
	},
	skipLabelText: {
		color: "#f59e0b"
	}
});

export default styles;
