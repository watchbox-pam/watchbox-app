import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientDivider = () => {
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "#888", "#888", "rgba(0,0,0,0)"]} // Dégradé transparent -> gris -> transparent
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.gradientLine}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 15, // Espacement du dessous
		alignItems: "center",
		width: "100%"
	},
	gradientLine: {
		width: "90%", // Largeur du trait
		height: 2 // Épaisseur du trait
	}
});

export default GradientDivider;
