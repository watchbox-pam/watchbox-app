import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";

export default function CarouselPoster({ providers }: { providers: any }) {
	return (
		<View style={styles.container}>
			<FlatList
				data={providers}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Link
						style={styles.imageContainer}
						href={{
							pathname: "/movie/[id]",
							params: { id: "1" }
						}}>
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
		width: 100, // 🔥 Correction ici : largeur fixe au lieu de "100%"
		height: 150, // 🔥 Ajustement pour garder un ratio 2:3
		borderRadius: 10
	},
	imageContainer: {
		marginRight: 10,
		alignItems: "center" // ✅ Centrer l'image dans son conteneur
	},
	container: {
		height: 160, // ✅ Ajuste pour éviter tout dépassement
		paddingLeft: 10
	}
});
