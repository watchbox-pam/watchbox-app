import { View, StyleSheet, ScrollView, Animated } from "react-native";
import EmotionCard from "./EmotionsCard";

interface Emotion {
	id: number;
	label: string;
	value: string;
	startAngle: number;
	endAngle: number;
	color: string;
	emoji: string;
}

interface EmotionsListProps {
	emotions: Emotion[];
	selectedEmotion: Emotion | null;
	onSelectEmotion: (emotion: Emotion) => void;
	wheelOpacity: Animated.Value;
}

export default function EmotionList({
	emotions,
	selectedEmotion,
	onSelectEmotion,
	wheelOpacity
}: EmotionsListProps) {
	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}>
				<View style={styles.grid}>
					{emotions.map((emotion) => (
						<EmotionCard
							key={emotion.id}
							emotion={emotion}
							onPress={onSelectEmotion}
							isSelected={selectedEmotion?.id === emotion.id}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 16
	},
	scrollContainer: {
		paddingVertical: 20,
		paddingBottom: 40
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	}
});
