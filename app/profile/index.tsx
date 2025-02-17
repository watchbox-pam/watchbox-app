import CarouselPoster from "@/components/CarouselPoster";
import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function Index() {
  const providers = [
    "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
    "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
    "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
    "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
    "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>WatchList Film</Text>
        <CarouselPoster providers={providers} />
      </View>
      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>Historique Film</Text>
        <CarouselPoster providers={providers} />
      </View>
      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>WatchList Séries</Text>
        <CarouselPoster providers={providers} />
      </View>
      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>Historique Séries</Text>
        <CarouselPoster providers={providers} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1E38",
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  WatchList: {
    width: 350,
    marginBottom: 30,
  },
  TitleWatchList: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
