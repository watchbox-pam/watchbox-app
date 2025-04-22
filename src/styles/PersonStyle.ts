/* style={styles.container}
			contentContainerStyle={styles.contentContainer}
			overScrollMode="never" */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	headers: {
		position: "absolute",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		zIndex: 100
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
		borderRadius: 5
	},
	imageContainer: {
		width: "50%"
	},
	noImage: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
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
		paddingTop: 50
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
		textAlign: "center"
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
