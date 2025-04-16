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
		marginVertical: 10,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderRadius: 8
	},
	input: {
		height: 40,
		color: "#000",
		paddingVertical: "auto",
		paddingLeft: 20,
		flex: 1,
		marginRight: 5,
		width: "65%"
	},
	BtnSearch: {
		height: 40,
		width: "35%"
	},
	TextSearch: {
		color: "#000",
		margin: "auto"
	},
	listFilters: {
		marginVertical: 10,
		flexDirection: "row",
		marginBottom: 20
	},
	filterContainer: {
		borderWidth: 0.5,
		borderColor: "#AC2821",
		padding: 5,
		borderRadius: 5,
		fontSize: 16,
		marginRight: 10,
		paddingHorizontal: 15,
		height: 30
	},
	selectedFilterContainer: {
		backgroundColor: "#fff",
		borderWidth: 0.5,
		borderColor: "#000"
	},
	filter: {
		color: "#fff",
		margin: "auto",
		fontSize: 16
	},
	selectedFilter: {
		color: "#000"
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
	},
	NoResult: {
		margin: "auto",
		height: "100%",
		fontSize: 30
	}
});

export default styles;
