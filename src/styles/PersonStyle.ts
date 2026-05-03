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
		alignItems: "flex-start",
		flex: 1,
		gap: 12
	},
	personName: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 4
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 14
	},
	infoText: {
		fontSize: 12,
		color: "#B0C8D9",
		flex: 1,
		lineHeight: 20,
		alignContent: "center",
		alignSelf: "center"
	},
	ageBadge: {
		marginTop: 4,
		backgroundColor: "#1A3A5C",
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 4,
		alignSelf: "flex-start"
	},
	ageBadgeText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#7EB8D4"
	},
	birthPlaceLabel: {
		fontSize: 11,
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 1
	},
	birthPlaceValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	ageText: {
		fontSize: 11,
		color: "#FFFFFF",
		textTransform: "uppercase",
		letterSpacing: 1
	},
	ageUnit: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	mediaSection: {
		marginBottom: 20
	},
	mediaSectionTitle: {
		fontSize: 20
	}
});

export default styles;
