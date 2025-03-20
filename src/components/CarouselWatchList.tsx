import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";

export default function CarouselWatchList({ providers }: { providers: any }) {
	return (
		<View style={styles.container}>
			<FlatList
				data={providers}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Link
						href={{
							pathname: "/watchList/[id]",
							params: { id: index.toString() } // 🔥 Utilisation de l'index comme ID temporaire
						}}
						style={styles.imageContainer}>
						<Image
							source={{
								uri: `https://image.tmdb.org/t/p/w500${item}`
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
		borderRadius: 10
	},
	imageContainer: {
		marginRight: 10,
		height: 160,
		alignItems: "center"
	},
	container: {
		height: 160,
		paddingLeft: 10
	}
});
