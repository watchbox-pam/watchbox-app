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
              params: { id: "1" },
            }}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item}` }} // 🛠️ Correction URL
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
    width: "100%", // 🛠️ Corrigé pour afficher l'image
    aspectRatio: 2 / 3, // Format poster 2:3
    borderRadius: 10,
  },
  imageContainer: {
    marginRight: 10,
    width: 100, // Largeur fixe pour chaque poster
    margin: 10,
  },
  container: {
    height: 200, // Ajuste selon le design
    paddingLeft: 10,
  },
});
