// RecommendationScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EmotionsPieChart from "../components/EmotionsPieChart";
import { RootStackParamList } from "../navigation/types"; // Importer les types
import { StackNavigationProp } from "@react-navigation/stack";

// Typage du hook useNavigation
type RecommendationScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"RecommendationScreen"
>;

const emotions = [
	{ key: 1, label: "Emerveillement", color: "#00FF00" },
	{ key: 2, label: "Energique", color: "#FF6347" },
	{ key: 3, label: "Frisson", color: "#FF4500" },
	{ key: 4, label: "Rire", color: "#FFD700" },
	{ key: 5, label: "Romantique", color: "#FF69B4" },
	{ key: 6, label: "Melancolie", color: "#1E90FF" },
	{ key: 7, label: "Nostalgie", color: "#858585" },
	{ key: 8, label: "MindFuck", color: "#000000" }
];

const RecommendationScreen = () => {
	const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
	const navigation = useNavigation<RecommendationScreenNavigationProp>(); // Utilisation du hook typé

	const handleEmotionSelect = (index: number) => {
		setSelectedEmotion(emotions[index].label);
		navigation.navigate("ResultatScreen", {
			emotion: emotions[index].label
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choisissez une émotion :</Text>
			<EmotionsPieChart
				emotions={emotions}
				onEmotionSelect={handleEmotionSelect}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 0,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#fff"
	},
	selectedText: {
		fontSize: 18,
		marginTop: 20,
		color: "#fff"
	}
});

export default RecommendationScreen;
