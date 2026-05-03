import { View, ScrollView, ActivityIndicator } from "react-native";
import EmotionCard from "./EmotionsCard";
import styles from "@/src/styles/EmotionListStyle";
import Emotion from "@/src/models/Emotion";

interface EmotionsListProps {
	emotions: Emotion[];
	selectedEmotion: Emotion | null;
	onSelectEmotion: (emotion: Emotion) => void;
	isTransitioning?: boolean;
}

export default function EmotionList({
	emotions,
	selectedEmotion,
	onSelectEmotion,
	isTransitioning = false
}: EmotionsListProps) {
	return (
		<View style={[styles.container, { position: "relative" }]}>
			<ScrollView
				style={{ flex: 1, width: "100%" }}
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
				// Désactive le scroll pendant la transition pour éviter les interactions parasites
				scrollEnabled={!isTransitioning}>
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

			{/* Overlay de chargement pendant la transition */}
			{isTransitioning && (
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(10, 30, 56, 0.65)",
						justifyContent: "center",
						alignItems: "center"
					}}>
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
			)}
		</View>
	);
}
