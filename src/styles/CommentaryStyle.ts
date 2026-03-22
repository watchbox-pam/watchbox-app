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
		width: "auto",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		margin: 8,
		color: "#fff",
		fontWeight: "bold",
		fontSize: 17
	},
	commentContainer: {
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	comment: {
		fontSize: 16,
		marginVertical: 5,
		color: "#fff",
		paddingVertical: 15
	},
	commentTop: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center"
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center"
	},
	userPicture: {
		width: "30%",
		aspectRatio: 1,
		borderRadius: 100,
		marginEnd: 10
	},
	userName: {
		fontWeight: "bold"
	},
	commentText: {
		filter: "blur(3)"
	},
	spoilerWarning: {
		zIndex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		alignItems: "center",
		borderRadius: 5
	},
	coms: {
		fontSize: 20,
		marginBottom: 30,
		textAlign: "center"
	}
});

export default styles;
