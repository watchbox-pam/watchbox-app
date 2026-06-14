import { FlatList, View, Image, Pressable } from "react-native";
import { router } from "expo-router";
import StyledText from "@/src/components/StyledText";
import styles from "@/src/styles/CarouselBigPosterStyle";

export default function CarouselBigPoster({ data }: any) {
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
							styles.itemContainer,
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
						<StyledText style={styles.title} ellipsizeMode="tail">
							{item.title}
						</StyledText>
						<StyledText style={styles.overview} numberOfLines={2}>
							{item.overview}
						</StyledText>
					</Pressable>
				)}
			/>
		</View>
	);
}
