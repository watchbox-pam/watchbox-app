import { FlatList, View, Image, Pressable } from "react-native";
import { router } from "expo-router";
import styles from "@/src/styles/CarouselPosterStyle";

// Horizontal poster carousel component
export default function CarouselPoster({ data }: any) {
	// Return empty container if there's no data
	if (!data || data.length === 0) {
		return <View style={styles.container} />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<Pressable
						style={({ pressed }) => [
							styles.imageContainer,
							pressed && { opacity: 0.8 }
						]}
						onPress={() =>
							router.push({
								pathname: "/(app)/(tabs)/movie/[id]",
								params: { id: item.id.toString() }
							})
						}>
						<Image
							source={{
								uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
							}}
							style={styles.image}
							resizeMode="cover"
						/>
					</Pressable>
				)}
			/>
		</View>
	);
}
