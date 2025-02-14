import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function StyledText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  const [fontsLoaded] = useFonts({
    Oswald: require("@/assets/fonts/Oswald-VariableFont_wght.ttf"),
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
    fontSize: 16,
  },
});
