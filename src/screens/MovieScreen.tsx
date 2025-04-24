import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";

import BackButton from "@/src/components/BackButton";
import Tag from "@/src/components/Tag";
import StyledText from "@/src/components/StyledText";
import TagList from "@/src/components/TagList";
import CarouselProviders from "@/src/components/CarouselProviders";
import CarouselCasting from "@/src/components/CarouselCasting";

import styles from "@/src/styles/MovieDetailStyle";
import { ActivityIndicator } from "react-native-paper";
import CommentaryScreen from "@/src/screens/CommentaryScreen";
import { fetchMovieDetails } from "@/src/services/MovieDetailService";

export default function MovieScreen() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id } = useLocalSearchParams();

	const [media, setMedia] = useState<undefined | MovieProps>();

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetchMovieDetails(+id);
			if (response.success) {
				setMedia(response.data);
			} else {
				setError(true);
			}
			setLoading(false);
		} catch (e) {
			console.error(e);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const convertMinutesToHours = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}min`;
	};

	if (loading) {
		return (
			<View style={styles.loading} testID="loading">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer} testID="error">
				<StyledText style={styles.errorText}>
					Erreur lors du chargement des données.
				</StyledText>
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			overScrollMode="never">
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
					testID="movie-banner"
					source={{
						uri:
							"https://image.tmdb.org/t/p/original" +
							media?.backdrop_path
					}}
					style={styles.imageBanner}
				/>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.imagePosterContainer}>
					{!media?.poster_path ? (
						<View style={styles.noImage}></View>
					) : (
						<Image
							testID="movie-poster"
							source={{
								uri:
									"https://image.tmdb.org/t/p/original" +
									media?.poster_path
							}}
							style={styles.imagePoster}
						/>
					)}
				</View>
				<View style={styles.infoDiv} testID="movie-info">
					{media?.age_restriction && (
						<Tag style={styles.tagContainer}>
							<StyledText style={styles.textTag}>
								{media?.age_restriction}
							</StyledText>
						</Tag>
					)}

					<StyledText style={styles.title}>{media?.title}</StyledText>

					<StyledText style={styles.text}>
						{media?.release_date ? `${media.release_date} • ` : ""}
						{media?.runtime
							? convertMinutesToHours(Number(media?.runtime))
							: "duration inconnue"}
					</StyledText>

					{media?.director?.name && (
						<StyledText style={styles.text}>
							par {media?.director.name}
						</StyledText>
					)}

					<TagList
						testID="movie-tags"
						tags={
							media?.genres
								? media.genres.map((genre: any) => genre.name)
								: []
						}
					/>
				</View>
			</View>

			{!media?.providers || media?.providers.length <= 0 ? null : (
				<View style={styles.providersContainer}>
					<StyledText>ou regarder ?</StyledText>
					<CarouselProviders
						providers={media?.providers}
						testID="carousel-providers"
					/>
				</View>
			)}

			<View testID="movie-overview">
				<StyledText style={styles.description}>
					{media?.overview
						? media.overview
						: "Aucune description disponible pour ce film."}
				</StyledText>
			</View>

			<View style={styles.videoContainer} testID="movie-video">
				<StyledText style={styles.textCasting}>
					Bande annonce
				</StyledText>
				<YoutubePlayer
					height={275}
					play={false}
					videoId={media?.video_key}
				/>
			</View>

			<View style={styles.castingContainer}>
				<StyledText style={styles.textCasting}>Casting</StyledText>
				<CarouselCasting
					cast={media?.casting}
					testID="carousel-casting"
				/>

				<View style={styles.directorContainer}>
					{media?.director && (
						<View testID="movie-director">
							<StyledText style={styles.textCasting}>
								Réalisateur
							</StyledText>
							<CarouselCasting cast={[media?.director]} />
						</View>
					)}

					{media?.composer && (
						<View testID="movie-composer">
							<StyledText style={styles.textCasting}>
								Compositeur
							</StyledText>
							<CarouselCasting cast={[media?.composer]} />
						</View>
					)}
				</View>
			</View>
			<CommentaryScreen />
		</ScrollView>
	);
}

export type MovieProps = {
	backdrop_path: string;
	poster_path: string;
	title: string;
	age_restriction: string;
	runtime: string;
	release_date: number;
	genres: string[];
	providers: string[];
	overview: string;
	casting: {
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
		cast_id: number;
		character: string;
		credit_id: string;
		order: number;
	}[];
	director: {
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
		credit_id: string;
		department: number;
		job: string;
	};
	composer: {
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
		credit_id: string;
		department: number;
		job: string;
	};
	video: string;
	video_key: string;
};
