import CarouselCasting from "@/components/CarouselCasting";
import CarouselProviders from "@/components/CarouselProviders";
import StyledText from "@/components/StyledText";
import Tag from "@/components/Tag";
import TagList from "@/components/TagList";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const { id } = useLocalSearchParams();

  const [media, setMedia] = useState({
    banner: "",
    poster: "",
    title: "",
    ageRestriction: null as string | null,
    duration: "",
    date: null as null | number,
    director: "",
    genres: [] as string[],
    providers: [] as string[],
    description: "",
    casts: [] as any[],
    directors: [] as any[],
    composer: [] as any[],
    writers: [] as any[],
    video: "",
  });

  useEffect(() => {
    console.log(id);

    fetch(`nothing`);
    /* .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMedia(data);
      }); */

    setMedia({
      banner: "/vgnoBSVzWAV9sNQUORaDGvDp7wx.jpg",
      poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      title: "Interstellar",
      ageRestriction: "12 ans",
      duration: "2h49min",
      date: 2014,
      director: "Christopher Nolan",
      genres: ["Aventure", "Drame", "Science-fiction"],
      providers: [
        "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
        "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
        "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
        "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
        "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
        "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
        "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
        "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
        "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
        "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
      ],
      description: `Dans un futur proche, face à une Terre qui se meurt, un groupe
          d’explorateurs utilise un vaisseau interstellaire pour franchir un
          trou de ver permettant de parcourir des distances jusque‐là
          infranchissables. Leur but : trouver un nouveau foyer pour l’humanité.`,
      casts: [
        {
          id: 1,
          name: "Matthew McConaughey",
          character: "Cooper",
          picture: "/lCySuYjhXix3FzQdS4oceDDrXKI.jpg",
        },
        {
          id: 2,
          name: "Anne Hathaway",
          character: "Brand",
          picture: "/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg",
        },
        {
          id: 3,
          name: "Anne Hathaway",
          character: "Brand",
          picture: "/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg",
        },
        {
          id: 4,
          name: "Anne Hathaway",
          character: "Brand",
          picture: "/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg",
        },
      ],
      directors: [
        {
          id: 1,
          name: "Christopher Nolan",
          character: "",
          picture: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg",
        },
      ],
      composer: [
        {
          id: 1,
          name: "Hans Zimmer",
          character: "",
          picture: "/tpQnDeHY15szIXvpnhlprufz4d.jpg",
        },
      ],
      writers: [
        {
          id: 1,
          name: "Christopher Nolan",
        },
        {
          id: 2,
          name: "Jonathan Nolan",
        },
      ],
      video: "VaOijhK3CRU",
    });
  }, [id]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      overScrollMode="never"
    >
      <View style={styles.imageBannerContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#0A1E38", "transparent"]}
          style={styles.shadowBottom}
        />
        <Image
          source={{ uri: "https://image.tmdb.org/t/p/original" + media.banner }}
          style={styles.imageBanner}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.imagePosterContainer}>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/original" + media.poster,
            }}
            style={styles.imagePoster}
          />
        </View>
        <View style={styles.infoDiv}>
          <Tag style={styles.tagContainer}>
            <StyledText style={styles.textTag}>
              {media.ageRestriction}
            </StyledText>
          </Tag>
          <StyledText style={styles.title}>{media.title}</StyledText>

          <StyledText style={styles.text}>
            <StyledText>{media.date}</StyledText> •{" "}
            <StyledText>{media.duration}</StyledText>
          </StyledText>
          <StyledText style={styles.text}>
            par{" "}
            <StyledText style={styles.textBold}>{media.director}</StyledText>
          </StyledText>

          <TagList tags={media.genres} />
        </View>
      </View>

      <View style={styles.providersContainer}>
        <StyledText>ou regarder ?</StyledText>
        <CarouselProviders providers={media.providers} />
      </View>

      <View>
        <StyledText style={styles.description}>
          Dans un futur proche, face à une Terre qui se meurt, un groupe
          d’explorateurs utilise un vaisseau interstellaire pour franchir un
          trou de ver permettant de parcourir des distances jusque‐là
          infranchissables. Leur but : trouver un nouveau foyer pour l’humanité.
        </StyledText>
      </View>

      <View style={styles.videoContainer}>
        <StyledText style={styles.textCasting}>Bande annonce</StyledText>
        <YoutubePlayer height={275} play={false} videoId="VaOijhK3CRU" />
      </View>

      <View style={styles.castingContainer}>
        <StyledText style={styles.textCasting}>Casting</StyledText>
        <CarouselCasting cast={media.casts} />

        <View style={styles.directorContainer}>
          <View>
            <StyledText style={styles.textCasting}>Réalisateur</StyledText>
            <CarouselCasting cast={media.directors} />
          </View>

          <View>
            <StyledText style={styles.textCasting}>Compositeur</StyledText>
            <CarouselCasting cast={media.composer} />
          </View>
        </View>

        <StyledText style={styles.textCasting}>Scénaristes</StyledText>
        <View>
          {media.writers.map((writer) => (
            <StyledText key={writer.id}>{writer.name}</StyledText>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A1E38",
    height: "100%",
    width: "100%",
    fontFamily: "wght",
  },
  contentContainer: {
    alignItems: "center",
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
    width: "30%",
    marginRight: 20,
    zIndex: 1,
  },
  imagePoster: {
    aspectRatio: 2 / 3,
  },
  title: {
    fontSize: 40,
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
  providersContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  providerTag: {
    backgroundColor: "none",
  },
  castingContainer: {
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
  textCasting: {
    fontSize: 25,
  },
  directorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 30,
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
