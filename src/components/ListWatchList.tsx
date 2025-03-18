import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";

export default function ListWatchList({ providers }: { providers: string[] }) {
	return (
		<View style={styles.container}>
			<FlatList
				data={providers}
				style={styles.listContainer}
				numColumns={4}
				keyExtractor={(item, index) => index.toString()}
				columnWrapperStyle={styles.row} // Ajout pour contrôler l'alignement des rangées
				renderItem={({ item }) => (
					<View style={styles.imageContainer}>
						<Link
							style={styles.linkStyle}
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
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	listContainer: {
		paddingVertical: 10,
		paddingHorizontal: 5,
		width: "100%"
	},
	row: {
		justifyContent: "flex-start" // Cela force les éléments à se coller à gauche
	},
	imageContainer: {
		width: 80, // Largeur fixe au lieu de flex
		margin: 5
		// Suppression de flex: 1 pour éviter l'étirement
	},
	linkStyle: {
		// Style séparé pour le Link
	},
	image: {
		width: 80, // Ajusté pour correspondre à la largeur du conteneur
		height: 150,
		borderRadius: 10
	}
});
