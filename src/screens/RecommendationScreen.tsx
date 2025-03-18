import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EmotionPieChart from "../components/EmotionPieChart";

const RecommendationScreen = () => {
	const navigation = useNavigation();

	const handleSelectEmotion = (emotion: string) => {
		navigation.navigate("ResultatScreen", { emotion });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choisissez votre émotion</Text>
			<EmotionPieChart onSelectEmotion={handleSelectEmotion} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20
	}
});

export default RecommendationScreen;
