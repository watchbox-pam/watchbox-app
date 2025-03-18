import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types"; // Assurez-vous d'importer le type

// Typage de la route
type ResultatScreenRouteProp = RouteProp<RootStackParamList, "ResultatScreen">;

const ResultatScreen = ({ route }: { route: ResultatScreenRouteProp }) => {
	const { emotion } = route.params; // Utilisation de 'emotion' typé

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Émotion Sélectionnée</Text>
			<Text style={styles.emotionText}>{emotion}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20
	},
	emotionText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#333"
	}
});

export default ResultatScreen;
