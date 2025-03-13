import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";

export default function CarouselProviders({
  providers,
}: {
  providers: any;
  tagStyle?: any;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        overScrollMode="never"
        data={providers}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://image.tmdb.org/t/p/original" + item }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1 / 1,
    width: 40,
  },
  imageContainer: {
    margin: 5,
  },
  container: {
    height: 50,
  },
});
