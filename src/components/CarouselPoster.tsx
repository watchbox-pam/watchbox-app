import { FlatList, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";

export default function CarouselPoster({ data }: any) {
	// Vérifier si les données sont disponibles
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

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 150,
		borderRadius: 5
	},
	imageContainer: {
		marginRight: 5,
		alignItems: "center"
	},
	container: {
		height: 160,
		paddingLeft: 10
	}
});
