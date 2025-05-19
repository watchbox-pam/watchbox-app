import { Text, TouchableOpacity } from "react-native";
import styles from "@/src/styles/EmotionCardStyle";
import Emotion from "@/src/models/Emotion";

interface EmotionCardProps {
	emotion: Emotion;
	onPress: (emotion: Emotion) => void;
	isSelected?: boolean;
}

export default function EmotionCard({
	emotion,
	onPress,
	isSelected = false
}: EmotionCardProps) {
	return (
		<TouchableOpacity
			style={[
				styles.card,
				{ backgroundColor: emotion.color },
				isSelected && styles.selectedCard
			]}
			onPress={() => onPress(emotion)}
			activeOpacity={0.7}>
			<Text style={styles.emoji}>{emotion.emoji}</Text>
			<Text style={styles.title}>{emotion.label}</Text>
		</TouchableOpacity>
	);
}
