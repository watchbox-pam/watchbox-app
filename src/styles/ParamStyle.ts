import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#0A1E38",
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	paramTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		backgroundColor: "#143b71",
		borderRadius: 8,
		width: "100%",
		height: 70,
		marginHorizontal: "auto",
		marginBottom: 30
	},
	text: { fontSize: 18, color: "#fff" },
	desc: { fontSize: 12, color: "#fff" },
	toggleContainer: {
		flexDirection: "row",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#0A1E38",
		height: "80%",
		alignItems: "center"
	},
	toggleButton: {
		paddingVertical: 10,
		padding: 15,
		width: 68,
		alignItems: "center"
	},
	active: {
		backgroundColor: "#143b71",
		height: "80%",
		marginHorizontal: 10,
		borderRadius: 8
	},
	inactive: {
		backgroundColor: "#0A1E38"
	},
	toggleText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold"
	},
	activeText: {
		color: "#fff"
	},
	// Nouveaux styles pour les providers
	providersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		width: "100%"
	},
	providerButton: {
		width: 60,
		height: 60,
		margin: 5,
		borderRadius: 8,
		backgroundColor: "#0A1E38",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden"
	},
	selectedProvider: {
		borderWidth: 2,
		borderColor: "#FFF"
	},
	providerLogo: {
		width: 50,
		height: 50,
		borderRadius: 6
	},
	providerText: {
		color: "#FFF",
		fontSize: 10,
		textAlign: "center",
		padding: 2
	}
});

export default styles;
