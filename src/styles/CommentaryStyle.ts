import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20
	},
	CommentTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	addComment: {
		backgroundColor: "#AC2128",
		width: "75%",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		margin: 8,
		color: "#fff",
		fontWeight: "bold",
		fontSize: 17
	}
});

export default styles;
