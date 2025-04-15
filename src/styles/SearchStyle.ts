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
		flex: 1
	},
	contInfo: {
		flex: 1,
		flexDirection: "row",
		width: "100%"
	},
	image: {
		width: "25%",
		height: 150,
		borderRadius: 10,
		backgroundColor: "#313131"
	},
	resultInfo: {
		width: "70%",
		marginLeft: "5%"
	},
	resultTitle: {
		color: "#EBDDFF",
		fontWeight: "bold",
		fontSize: 20
	},
	resultYear: {
		color: "#fff",
		fontSize: 14
	},
	avis: {
		color: "#fff"
	},
	separator: {
		width: "100%",
		height: 1,
		backgroundColor: "#EBDDFF",
		marginVertical: 10
	}
});

export default styles;
