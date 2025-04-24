import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 10
	},
	topSection: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderRadius: 8
	},
	input: {
		color: "#000",
		paddingLeft: 20,
		marginRight: 5,
		height: 40,
		width: "75%"
	},
	BtnSearch: {
		width: "25%"
	},
	TextSearch: {
		color: "#000",
		margin: "auto"
	},
	listFilters: {
		flexDirection: "row",
		marginBottom: 10
	},
	filterContainer: {
		flex: 1,
		borderWidth: 0.5,
		borderColor: "#AC2821",
		borderRadius: 5,
		marginRight: 10,
		paddingHorizontal: 15,
		height: 35
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
	contInfo: {
		flex: 1,
		flexDirection: "row",
		width: "100%"
	},
	viewResult: {
		height: 175
	},
	resultatInfo: {
		flex: 1,
		flexDirection: "row",
		height: 100
	},
	image: {
		width: "30%",
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
