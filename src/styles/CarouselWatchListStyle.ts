import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		height: 180,
		paddingHorizontal: 15,
		marginVertical: 8
	},
	imageContainer: {
		marginRight: 15,
		height: 160,
		width: 110,
		alignItems: "center",
		borderRadius: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8
	},
	image: {
		width: 110,
		height: 160,
		borderRadius: 12,
		backgroundColor: "#e8e8e8"
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0D1321",
		borderRadius: 12,
		paddingVertical: 30,
		paddingHorizontal: 20,
		marginHorizontal: 10
	},
	emptyIcon: {
		fontSize: 48,
		marginBottom: 15,
		color: "#D0BFFF"
	},
	emptyText: {
		fontSize: 20,
		color: "#FFF",
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		letterSpacing: 1
	},
	emptySubText: {
		fontSize: 14,
		color: "#FFF",
		textAlign: "center",
		lineHeight: 20,
		opacity: 0.8,
		fontWeight: "500"
	},
	emptyHighlight: {
		color: "#FF4A4A",
		fontWeight: "bold"
	}
});

export default styles;
