import CarouselPoster from "@/components/CarouselPoster";
// import BackButton from "@/components/BackButton";
// import LogoButton from "@/components/Logo";
import React, { useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import StyledText from "@/components/StyledText";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import DropDownButton from "@/components/DropDownButton";
import TraitGradiant from "@/components/TraitGradiant";

export default function Index() {
  const providers = [
    "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
    "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
    "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
    "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
    "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
  ];

  const { id } = useLocalSearchParams();

  useEffect(() => {
    console.log(id);

    fetch(`nothing`);
    /* .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMedia(data);
      }); */
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* <View style={styles.header}>
        <BackButton />
        <LogoButton />
      </View> */}

      <View style={styles.imageBannerContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#0A1E38", "transparent"]}
          style={styles.shadowBottom}
        />
        <Image
          source={require("@/assets/images/banner-interstellar.png")}
          style={styles.imageBanner}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.imagePosterContainer}>
          <Image
            source={require("@/assets/images/Interstellar-film1.png")}
            style={styles.ProfilPicture}
          />
          <Text style={styles.title}>Julien-QTX</Text>
        </View>
        <DropDownButton />
      </View>

      <View>
        <StyledText style={styles.description}>
          Dans un futur proche, face à une Terre qui se meurt, un groupe
          d’explorateurs utilise un vaisseau interstellaire pour franchir un
          trou de ver permettant de parcourir des distances jusque‐là
          infranchissables. Leur but : trouver un nouveau foyer pour l’humanité.
        </StyledText>
      </View>

      <TraitGradiant />

      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>WatchList Film</Text>
        <CarouselPoster providers={providers} />
      </View>

      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>Historique Film</Text>
        <CarouselPoster providers={providers} />
      </View>

      <TraitGradiant />

      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>WatchList Séries</Text>
        <CarouselPoster providers={providers} />
      </View>

      <View style={styles.WatchList}>
        <Text style={styles.TitleWatchList}>Historique Séries</Text>
        <CarouselPoster providers={providers} />
      </View>

      <TraitGradiant />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // header: {
  //   width: "100%",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 25,
  // },
  container: {
    flex: 1,
    backgroundColor: "#0A1E38",
    margin: 0,
    padding: 0,
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  imageBannerContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  imageBanner: {
    width: "100%",
    height: "100%",
  },
  imagePosterContainer: {
    flexDirection: "row",
    width: "70%",
    marginRight: 20,
  },
  ProfilPicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#ffffff",
    zIndex: 1,
  },
  title: {
    fontSize: 40,
    color: "#ffffff",
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: 15,
  },
  text: {
    fontSize: 15,
  },
  textBold: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
    zIndex: -1,
  },
  Trait: {
    marginTop: 20,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    top: -20,
  },
  infoDiv: {
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  tagContainer: {
    marginBottom: -10,
  },
  textTag: {
    fontSize: 10,
  },
  WatchList: {
    width: 350,
    marginBottom: 10,
  },
  TitleWatchList: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  shadowBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    transform: [{ rotate: "180deg" }],
    zIndex: 1,
  },
});
