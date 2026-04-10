import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38"
	},
	overlayContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		height: "100%",
		zIndex: 1,
		marginTop: 20
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#0A1E38"
	},
	scrollContainer: {
		flex: 1
	},
	loadingOverlay: {
	...StyleSheet.absoluteFillObject,
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1000
}
});

export default styles;
