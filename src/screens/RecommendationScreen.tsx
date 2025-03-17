import { Text, View } from "react-native";
import { useState } from "react";
import EmotionCircle from "../components/EmotionCircle";
import Popular from "../components/Popular";

export default function RecommendationScreen() {
	const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

	const handleBackToEmotions = () => {
		setSelectedEmotion(null);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#0A1E38"
			}}>
			{!selectedEmotion ? (
				<EmotionCircle onEmotionSelect={setSelectedEmotion} />
			) : (
				<Popular
					emotion={selectedEmotion}
					onBackToEmotions={handleBackToEmotions}
				/>
			)}
		</View>
	);
}
