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
	filterSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 5
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
		flex: 1,
		color: "#EBDDFF",
		fontWeight: "bold",
		fontSize: 20,
		flexWrap: "wrap",
		width: "90%"
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
	},
	sectionTitle: {
		fontSize: 24,
		color: "#fff",
		marginVertical: 10,
		fontWeight: "bold"
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	// Provider filter button styles
	providerFilterButton: {
		backgroundColor: "transparent",
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: "#AC2821",
		height: 35
	},
	activeProviderFilterButton: {
		backgroundColor: "#AC2821",
		borderColor: "#AC2821"
	},
	providerFilterText: {
		color: "#fff",
		fontSize: 16
	},
	// Provider filter modal styles
	providerFilterContainer: {
		backgroundColor: "#192841",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10
	},
	providerFilterHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15
	},
	providerFilterTitle: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold"
	},
	clearText: {
		color: "#AC2821",
		fontSize: 14
	},
	providerList: {
		flexDirection: "row",
		marginBottom: 15
	},
	providerItem: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0F1C2E",
		borderWidth: 1,
		borderColor: "transparent"
	},
	selectedProviderItem: {
		borderColor: "#AC2821",
		borderWidth: 2
	},
	providerLogo: {
		width: 60,
		height: 60,
		borderRadius: 5
	},
	providerName: {
		color: "#fff",
		textAlign: "center",
		fontSize: 12,
		padding: 5
	},
	providerFilterActions: {
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	providerFilterApplyButton: {
		backgroundColor: "#AC2821",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5
	},
	providerFilterApplyText: {
		color: "#fff",
		fontWeight: "bold"
	}
});

export default styles;
