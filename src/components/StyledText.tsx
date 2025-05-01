import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, Text, StyleProp, TextStyle } from "react-native";

export default function StyledText({
	children,
	style,
	testID
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
	testID?: string;
}) {
	const [fontsLoaded] = useFonts({
		Oswald: require("@/src/assets/fonts/Oswald-VariableFont_wght.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Oswald",
		color: "#FFFFFF",
		fontSize: 16
	}
});
