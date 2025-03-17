import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface Styles {
	container: ViewStyle;
	quarterBase: ViewStyle;
	topLeft: ViewStyle;
	topRight: ViewStyle;
	bottomLeft: ViewStyle;
	bottomRight: ViewStyle;
	centerCircle: ViewStyle;
	centerText: TextStyle;
	emotionIcon: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
	container: {
		position: "relative",
		width: 273,
		height: 273
	},
	quarterBase: {
		width: 136.5,
		height: 136.5,
		borderWidth: 1,
		borderColor: "#AC2128",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute"
	},
	topLeft: {
		top: 0,
		left: 0,
		borderTopLeftRadius: 136.5
	},
	topRight: {
		top: 0,
		right: 0,
		borderTopRightRadius: 136.5
	},
	bottomLeft: {
		bottom: 0,
		left: 0,
		borderBottomLeftRadius: 136.5
	},
	bottomRight: {
		bottom: 0,
		right: 0,
		borderBottomRightRadius: 136.5
	},
	centerCircle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		width: 92,
		height: 92,
		borderRadius: 46,
		backgroundColor: "#AC2128",
		transform: [{ translateX: -46 }, { translateY: -46 }],
		zIndex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	centerText: {
		color: "white",
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Oswald"
	},
	emotionIcon: {
		width: 51,
		height: 51
	}
});

export default styles;
