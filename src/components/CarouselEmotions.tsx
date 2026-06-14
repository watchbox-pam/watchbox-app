import {
	FlatList,
	View,
	Text,
	TouchableOpacity,
	ImageBackground
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import styles from "@/src/styles/CarouselEmotionsStyle";

const emotions = [
	{
		id: 1,
		label: "ROMANTISME",
		value: "romantisme",
		image: require("../assets/images/Emotion/titanic.png"),
		gradient: ["#FF9AAA", "#FF6F91"]
	},
	{
		id: 2,
		label: "ÉMERVEILLEMENT",
		value: "emerveillement",
		image: require("../assets/images/Emotion/jurassic-park.jpg"),
		gradient: ["#A8E6CF", "#4CAF50"]
	},
	{
		id: 3,
		label: "ADRÉNALINE",
		value: "adrenaline",
		image: require("../assets/images/Emotion/avengers.jpg"),
		gradient: ["#FFD180", "#FF9800"]
	},
	{
		id: null,
		label: "Voir les autres émotions →",
		value: null,
		image: null,
		gradient: null
	}
];

export default function CarouselEmotions() {
	return (
		<View style={styles.container}>
			<FlatList
				data={emotions}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.card}
						onPress={() => {
							if (item.id === null) {
								router.push("/(app)/(tabs)/recommendation");
							} else {
								router.push({
									pathname: "/(app)/(tabs)/recommendation",
									params: { emotionId: item.id }
								});
							}
						}}
						activeOpacity={0.7}>
						{item.image ? (
							<ImageBackground
								source={item.image}
								style={styles.imageBackground}
								imageStyle={styles.image}>
								<LinearGradient
									colors={[
										item.gradient[0] + "00",
										item.gradient[1] + "80"
									]}
									style={styles.gradient}>
									<Text style={styles.title}>
										{item.label}
									</Text>
								</LinearGradient>
							</ImageBackground>
						) : (
							<View style={[styles.gradient, styles.buttonCard]}>
								<Text style={styles.title}>{item.label}</Text>
							</View>
						)}
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
