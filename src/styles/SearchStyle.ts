import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		width: "100%",
		margin: 0,
		padding: 10
	},
	topSection: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		height: 40,
		marginBottom: 20
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#6B737A",
		marginBottom: 15,
		color: "#fff",
		padding: 5,
		flex: 1,
		marginRight: 5
	},
	listFilters: {
		flexDirection: "row",
		gap: 20,
		justifyContent: "center",
		marginBottom: 20
	},
	filter: {
		color: "#fff",
		borderWidth: 1,
		borderColor: "#AC2821",
		padding: 5,
		borderRadius: 5,
		fontSize: 16
	},
	resultsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		gap: 15
	},
	image: {
		width: 100,
		height: 150,
		aspectRatio: 2 / 3,
		borderRadius: 10,
		backgroundColor: "#313131",
		marginRight: 15
	},
	resContainer: {
		height: 160,
		paddingLeft: 10,
		width: "100%"
	},
	link: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 20
	},
	resultInfo: {
		marginLeft: 15,
		flexDirection: "column",
		justifyContent: "flex-start",
		height: "100%"
	},
	resultTitle: {
		color: "#EBDDFF",
		fontWeight: "bold",
		fontSize: 24,
		textOverflow: "ellipsis",
		flexWrap: "wrap"
	},
	resultYear: {
		color: "#fff"
	},
	separator: {
		width: "100%",
		height: 1,
		backgroundColor: "#EBDDFF"
	}
});

export default styles;
