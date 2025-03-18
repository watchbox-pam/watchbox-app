import { useState } from "react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { VictoryPie } from "victory-native";

interface EmotionPieChartProps {
	onSelectEmotion: (emotion: string) => void;
}

const emotions = [
	{ label: "Joie", color: "#FFD700" },
	{ label: "Tristesse", color: "#1E90FF" },
	{ label: "Colère", color: "#FF4500" },
	{ label: "Surprise", color: "#8A2BE2" },
	{ label: "Peur", color: "#A52A2A" },
	{ label: "Dégoût", color: "#228B22" },
	{ label: "Amour", color: "#FF1493" },
	{ label: "Excitation", color: "#FF8C00" }
];

const EmotionPieChart: React.FC<EmotionPieChartProps> = ({
	onSelectEmotion
}) => {
	const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

	const handlePress = ({ nativeEvent }: any) => {
		if (nativeEvent.index !== undefined) {
			const emotion = emotions[nativeEvent.index].label;
			setSelectedEmotion(emotion);
			setTimeout(() => {
				onSelectEmotion(emotion);
			}, 500);
		}
	};

	return (
		<View style={styles.container}>
			<VictoryPie
				data={emotions.map((item) => ({ x: item.label, y: 1 }))}
				colorScale={emotions.map((item) => item.color)}
				innerRadius={50}
				labelRadius={80}
				style={{ labels: { fontSize: 14, fill: "white" } }}
				events={[
					{
						target: "data",
						eventHandlers: {
							onPressIn: handlePress
						}
					}
				]}
			/>
			{selectedEmotion && (
				<View style={styles.selectedEmotion}>
					<Text style={styles.selectedText}>
						Émotion choisie : {selectedEmotion}
					</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center"
	},
	selectedEmotion: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#333",
		borderRadius: 10
	},
	selectedText: {
		color: "white",
		fontSize: 18
	}
});

export default EmotionPieChart;
