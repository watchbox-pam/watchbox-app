import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 0,
		paddingTop: 20
	},
	topSection: {
		marginHorizontal: 10,
		width: "auto",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderRadius: 8
	},
	input: {
		color: "#000",
		paddingLeft: 20,
		marginRight: 5,
		height: 40,
		width: "100%"
	},
	clearButton: {
		position: "absolute",
		right: 0,
		top: "40%",
		transform: [{ translateY: -10 }],
		padding: 4
	},
	BtnSearch: {
		width: "25%"
	},
	TextSearch: {
		color: "#000",
		margin: "auto",
		fontSize: 18
	},
	searchInputContainer: {
		flex: 1,
		position: "relative"
	},
	suggestionsContainer: {
		position: "absolute",
		top: "100%",
		left: 0,
		right: 0,
		backgroundColor: "#1a1a1a",
		borderRadius: 8,
		marginTop: 4,
		maxHeight: 300,
		zIndex: 1000,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84
	},
	suggestionItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#333"
	},
	suggestionImage: {
		width: 40,
		height: 60,
		borderRadius: 4,
		marginRight: 12
	},
	suggestionText: {
		flex: 1,
		color: "#fff",
		fontSize: 14
	},
	suggestionLoadingContainer: {
		padding: 20,
		alignItems: "center"
	},

	filterSection: {
		margin: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 5
	},
	listFilters: {
		flexDirection: "row",
		marginBottom: 0
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
		height: 175,
		width: "100%",
		marginHorizontal: 20,
		marginVertical: 10
	},
	resultatInfo: {
		flex: 1,
		flexDirection: "row"
	},
	image: {
		aspectRatio: 2 / 3,
		borderRadius: 10,
		backgroundColor: "#313131"
	},
	resultInfo: {
		width: "60%",
		marginLeft: "5%",
		display: "flex",
		alignContent: "flex-start",
		alignItems: "flex-start"
	},
	resultTitle: {
		color: "#EBDDFF",
		fontWeight: "bold",
		fontSize: 25,
		flexWrap: "wrap",
		width: "100%"
	},
	resultDetails: {
		color: "#fff",
		fontSize: 14
	},
	resultDetailsOverview: {
		color: "#fff",
		fontSize: 14,
		marginTop: 5
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
		marginHorizontal: 20,
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
		fontSize: 16,
		margin: "auto"
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
	},
	headers: {
		position: "fixed",
		top: 0,
		zIndex: 1,
		backgroundColor: "#0A1E38"
	},
	actorsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: 10,
		justifyContent: "space-between"
	},
	actorGridItem: {
		width: "48%",
		marginBottom: 15
	},
	actorCard: {
		alignItems: "center",
		backgroundColor: "#0F1C2E",
		borderRadius: 10,
		padding: 8
	},
	actorImage: {
		width: "100%",
		aspectRatio: 2 / 3,
		borderRadius: 8,
		backgroundColor: "#313131",
		marginBottom: 6
	},
	actorName: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 14,
		textAlign: "center",
		width: "100%"
	},
	actorDepartment: {
		color: "#aaa",
		fontSize: 12,
		textAlign: "center"
	}
});

export default styles;
