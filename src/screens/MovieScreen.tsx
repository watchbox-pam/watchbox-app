import {useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {Image, ScrollView, View} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";

import BackButton from "@/src/components/BackButton";
import Tag from "@/src/components/Tag";
import StyledText from "@/src/components/StyledText";
import TagList from "@/src/components/TagList";
import CarouselProviders from "@/src/components/CarouselProviders";
import CarouselCasting from "@/src/components/CarouselCasting";

import styles from "@/src/styles/MovieDetailStyle"

export default function MovieScreen() {
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
            <View style={styles.headers}>
                <BackButton />
            </View>

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