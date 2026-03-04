import { View, ScrollView } from "react-native";
import EmotionCard from "./EmotionsCard";
import CadrePublicitaire from "./CadrePublicitaire";
import styles from "@/src/styles/EmotionListStyle";
import Emotion from "@/src/models/Emotion";

interface EmotionsListProps {
	emotions: Emotion[];
	selectedEmotion: Emotion | null;
	onSelectEmotion: (emotion: Emotion) => void;
}

export default function EmotionList({
	emotions,
	selectedEmotion,
	onSelectEmotion
}: EmotionsListProps) {
	return (
		<View style={styles.container}>
			<ScrollView
				style={{ flex: 1, width: "100%" }}
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
					<View style={styles.ContainerAd}>
						<CadrePublicitaire
							title="🎬 Streaming Premium"
							description="Profitez de 30 jours gratuits sur toutes les plateformes"
							imageUrl="https://via.placeholder.com/150"
							link="https://example.com"
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
