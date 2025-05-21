import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "@/src/styles/TraitGradiantStyles";

const GradientDivider = () => {
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "#888", "#888", "rgba(0,0,0,0)"]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.gradientLine}
			/>
		</View>
	);
};

export default GradientDivider;
