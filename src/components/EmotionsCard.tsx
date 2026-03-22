import { Text, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
			style={[styles.card, isSelected && styles.selectedCard]}
			onPress={() => onPress(emotion)}
			activeOpacity={0.7}>
			<ImageBackground
				source={emotion.image}
				style={styles.imageBackground}
				imageStyle={styles.image}>
				<LinearGradient
					colors={[
						emotion.gradient[0] + "00",
						emotion.gradient[1] + "80"
					]}
					style={styles.gradient}>
					<Text style={styles.title}>{emotion.label}</Text>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}
