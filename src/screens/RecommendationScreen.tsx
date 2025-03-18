// RecommendationScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChartComponent from "../components/PieChartComponent";
import { RootStackParamList } from "../navigation/types"; // Importer les types
import { StackNavigationProp } from "@react-navigation/stack";

// Typage du hook useNavigation
type RecommendationScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"RecommendationScreen"
>;

const emotions = [
	{ key: 1, label: "Joie", color: "#FFD700" },
	{ key: 2, label: "Tristesse", color: "#1E90FF" },
	{ key: 3, label: "Colère", color: "#FF4500" },
	{ key: 4, label: "Peur", color: "#800080" },
	{ key: 5, label: "Surprise", color: "#00FF00" },
	{ key: 6, label: "Dégoût", color: "#8B4513" },
	{ key: 7, label: "Amour", color: "#FF69B4" },
	{ key: 8, label: "Excitation", color: "#FF6347" }
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
			<PieChartComponent
				emotions={emotions}
				onEmotionSelect={handleEmotionSelect}
			/>
			{selectedEmotion && (
				<Text style={styles.selectedText}>
					Émotion sélectionnée : {selectedEmotion}
				</Text>
			)}
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
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20
	},
	selectedText: {
		fontSize: 18,
		marginTop: 20,
		color: "#333"
	}
});

export default RecommendationScreen;
