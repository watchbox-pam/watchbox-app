import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, View, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import { Provider } from "react-native-paper";

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
import useSessionStore from "../zustand/sessionStore";
import DropDownPlaylist from "../components/DropDownPlaylist";
import { ErrorMessage } from "../components/ErrorMessage";

export default function MovieScreen() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id }: { id: string } = useLocalSearchParams();

	const [media, setMedia] = useState<undefined | MovieProps>();

	const currentUser = useSessionStore((state: any) => state.user);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	const handleRetry = useCallback(() => {
		setError(false);
		setRefreshing(true);
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);

			const response = await fetchMovieDetails(+id);
			if (response.success && response.data) {
				setMedia(response.data);
			} else {
				setError(true);
			}
		} catch (e) {
			console.error(e);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const userId = currentUser && currentUser.id;

		if (userId && typeof userId === "string") {
			fetchData();
		} else {
			setError(true);
			setLoading(false);
		}
		if (refreshing) {
			setRefreshing(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, currentUser, refreshing]);

	const convertMinutesToHours = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}min`;
	};

	if (error) {
		return <ErrorMessage onRetry={handleRetry} />;
	}

	if (loading) {
		return (
			<View style={styles.loading} testID="loading">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return (
		<Provider>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				overScrollMode="never"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}>
				<View style={styles.headers}>
					<BackButton />
					<DropDownPlaylist movieId={Number(id)} />
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
						<Image
							testID="movie-poster"
							source={{
								uri:
									"https://image.tmdb.org/t/p/original" +
									media?.poster_path
							}}
							style={styles.imagePoster}
						/>
					</View>
					<View style={styles.infoDiv} testID="movie-info">
						<StyledText
							style={styles.title}
							numberOfLines={2}
							ellipsizeMode="tail"
							adjustsFontSizeToFit>
							{media?.title}
						</StyledText>

						<StyledText style={styles.text}>
							{media?.runtime
								? convertMinutesToHours(Number(media?.runtime))
								: "duration inconnue"}{" "}
							•
							{media?.release_date
								? ` ${new Date(media.release_date).toLocaleDateString("fr-FR")}`
								: ""}
						</StyledText>

						{media?.age_restriction && (
							<Tag style={styles.tagAgeContainer}>
								<StyledText style={styles.textTag}>
									{media?.age_restriction === "TP"
										? "Tout public"
										: `+${media?.age_restriction}`}
								</StyledText>
							</Tag>
						)}

						<TagList
							testID="movie-tags"
							tags={
								media?.genres
									? media.genres.map(
											(genre: any) => genre.name
										)
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
							link={media?.providers_link}
							testID="carousel-providers"
						/>
					</View>
				)}

				<View testID="movie-overview">
					<StyledText style={styles.description} ellipsizeMode="tail">
						{media?.overview
							? media.overview
							: "Aucune description disponible pour ce film."}
					</StyledText>
				</View>

				{media?.video_key ? (
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
				) : null}

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
				<CommentaryScreen mediaId={Array.isArray(id) ? id[0] : id} />
			</ScrollView>
		</Provider>
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
	providers:
		| {
				provider_id: number;
				provider_name: string;
				logo_path: string;
				display_priority: number;
		  }[]
		| null;
	providers_link: string | null;
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
