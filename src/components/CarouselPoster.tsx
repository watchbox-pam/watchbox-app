import { FlatList, View, Image } from "react-native";
import { Link } from "expo-router";
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
					<Link
						style={styles.imageContainer}
						href={{
							pathname: "/movie/[id]",
							params: { id: item.id.toString() }
						}}>
						<Image
							source={{
								uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
							}}
							style={styles.image}
							resizeMode="cover"
						/>
					</Link>
				)}
			/>
		</View>
	);
}
