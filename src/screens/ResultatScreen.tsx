import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const ResultatScreen = () => {
	const route = useRoute();
	const { emotion } = route.params as { emotion: string };

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Vous avez choisi :</Text>
			<Text style={styles.emotion}>{emotion}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold"
	},
	emotion: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#FF6347",
		marginTop: 10
	}
});

export default ResultatScreen;
