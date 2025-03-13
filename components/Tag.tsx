import React from "react";
import { StyleSheet, View } from "react-native";

export default function Tag({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <View style={[styles.div, style]}>{children}</View>;
}
const styles = StyleSheet.create({
  div: {
    backgroundColor: "#506E7D",
    borderRadius: 3,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
    alignSelf: "flex-start",
    justifyContent: "center",
  },
});
