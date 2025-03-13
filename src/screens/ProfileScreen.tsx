import {useLocalSearchParams} from "expo-router";
import React, {useEffect} from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import DropDownButton from "@/src/components/DropDownButton";
import StyledText from "@/src/components/StyledText";
import CarouselPoster from "@/src/components/CarouselPoster";

import styles from "@/src/styles/ProfileStyle";

export default function ProfileScreen() {
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
            <View style={styles.imageBannerContainer}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={["#0A1E38", "transparent"]}
                    style={styles.shadowBottom}
                />
                <Image
                    source={require("@/src/assets/images/banner-interstellar.png")}
                    style={styles.imageBanner}
                />
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.imagePosterContainer}>
                    <Image
                        source={require("@/src/assets/images/Interstellar-film1.png")}
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