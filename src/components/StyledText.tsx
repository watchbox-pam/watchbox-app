import { useFonts } from "expo-font";
import React from "react";
import {
	StyleSheet,
	Text,
	StyleProp,
	TextStyle,
	TextProps
} from "react-native";

export default function StyledText({
	children,
	style,
	testID,
	...props
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
	testID?: string;
} & TextProps) {
	const [fontsLoaded] = useFonts({
		Oswald: require("@/src/assets/fonts/Oswald-VariableFont_wght.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Text style={[styles.text, style]} testID={testID} {...props}>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Oswald",
		color: "#FFFFFF",
		fontSize: 16
	}
});
