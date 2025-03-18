import { View, Pressable, Text, ScrollView } from "react-native";
import PopularStyle from "../styles/PopularStyle";
import MediaSection from "./MediaSection";

type PopularProps = {
	emotion: string;
	onBackToEmotions: () => void;
};

export default function Popular({ emotion, onBackToEmotions }: PopularProps) {
	return (
		<View style={PopularStyle.container}>
			<View style={PopularStyle.headerContainer}>
				{emotion && (
					<Pressable
						onPress={onBackToEmotions}
						style={PopularStyle.emotionButton}>
						<Text style={PopularStyle.emotionButtonText}>
							{emotion} • Changer l'émotion
						</Text>
					</Pressable>
				)}
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={PopularStyle.scrollViewContent}>
				<MediaSection
					emotion={emotion}
					mediaType="movie"
					title="Films"
				/>
				<MediaSection emotion={emotion} mediaType="tv" title="Séries" />
			</ScrollView>
		</View>
	);
}
