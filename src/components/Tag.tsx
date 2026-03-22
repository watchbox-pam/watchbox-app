import React from "react";
import { View } from "react-native";
import styles from "@/src/styles/TagStyle";

export default function Tag({
	children,
	style
}: {
	children: React.ReactNode;
	style?: any;
}) {
	return <View style={[styles.div, style]}>{children}</View>;
}
