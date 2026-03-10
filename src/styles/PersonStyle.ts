import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	headers: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 25,
		paddingVertical: 10,
		zIndex: 100,
		width: "100%",
		position: "absolute",
		top: 0
	},
	container: {
		backgroundColor: "#0A1E38",
		height: "100%",
		width: "100%",
		fontFamily: "wght",
		paddingRight: 20,
		paddingLeft: 20,
		paddingBottom: 20
	},
	loading: {
		backgroundColor: "#0A1E38",
		height: "100%",
		width: "100%",
		justifyContent: "center"
	},
	image: {
		aspectRatio: 3 / 4,
		borderRadius: 7
	},
	imageContainer: {
		width: "50%"
	},
	noImage: {
		aspectRatio: 3 / 4,
		borderRadius: 7,
		backgroundColor: "#ccc",
		justifyContent: "center"
	},
	noDataText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center"
	},
	personInfoRow: {
		flexDirection: "row",
		gap: 20,
		paddingTop: 75
	},
	personInfoContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		flexWrap: "wrap"
	},
	personName: {
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center",
		width: "100%"
	},
	birthPlaceLabel: {
		textAlign: "center"
	},
	birthPlaceValue: {
		fontSize: 20,
		fontWeight: "bold"
	},
	ageText: {
		fontSize: 30
	},
	ageUnit: {
		fontSize: 20,
		fontWeight: "bold"
	},
	mediaSection: {
		marginBottom: 20
	},
	mediaSectionTitle: {
		fontSize: 20
	}
});

export default styles;
