import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";

export default function CarouselPoster({ providers }: { providers: any }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={providers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item}` }} // 🛠️ Correction URL
              style={styles.image}
              resizeMode="cover"
            />
          </View>
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
    width: 120, // Largeur fixe pour chaque poster
  },
  container: {
    height: 200, // Ajuste selon le design
    paddingLeft: 10,
  },
});
