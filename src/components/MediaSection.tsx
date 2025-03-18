import { View, Text, Image, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import PopularStyle from "../styles/PopularStyle";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

type MediaSectionProps = {
	emotion: string;
	mediaType: "movie" | "tv";
	title: string;
};

type MediaItem = {
	id: number;
	title?: string;
	name?: string;
	poster_path: string;
	vote_average: number;
	release_date?: string;
	first_air_date?: string;
};

export default function MediaSection({
	emotion,
	mediaType,
	title
}: MediaSectionProps) {
	const [media, setMedia] = useState<MediaItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const emotionToGenre = {
		JOIE: {
			genres: [35, 10751],
			keywords: "feel-good,happy,comedy,fun"
		},
		TRISTE: {
			genres: [18, 10749],
			keywords: "sad,tearjerker,melancholy,emotional"
		},
		COLERE: {
			genres: [28, 53],
			keywords: "revenge,angry,intense,violence"
		},
		PEUR: {
			genres: [27, 9648],
			keywords: "scary,horror,suspense,thriller"
		}
	};

	useEffect(() => {
		const fetchMedia = async () => {
			setLoading(true);
			try {
				const emotionData =
					emotionToGenre[emotion as keyof typeof emotionToGenre];
				const selectedGenre =
					emotionData.genres[
						Math.floor(Math.random() * emotionData.genres.length)
					];
				const keywords = emotionData.keywords;

				const tmdbApi = axios.create({
					baseURL: "https://api.themoviedb.org/3",
					params: {
						api_key: API_KEY,
						language: "fr-FR"
					}
				});

				const genreResponse = await tmdbApi.get(
					`/discover/${mediaType}`,
					{
						params: {
							with_genres: selectedGenre,
							sort_by: "popularity.desc",
							page: 1
						}
					}
				);

				const keywordResponse = await tmdbApi.get(
					`/search/${mediaType}`,
					{
						params: {
							query: keywords,
							page: 1
						}
					}
				);

				let allMedia = [
					...genreResponse.data.results,
					...keywordResponse.data.results
				];

				const uniqueMedia = Array.from(
					new Map(allMedia.map((item) => [item.id, item])).values()
				);

				const shuffled = uniqueMedia
					.sort(() => 0.5 - Math.random())
					.slice(0, 10);

				setMedia(shuffled);
			} catch (error) {
				console.error(
					`Erreur lors de la récupération des ${mediaType === "movie" ? "films" : "séries"}:`,
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchMedia();
	}, [emotion, mediaType]);

	const getTitle = (item: MediaItem) => {
		return mediaType === "movie" ? item.title : item.name;
	};

	const renderMediaItem = ({ item }: { item: MediaItem }) => (
		<Pressable style={PopularStyle.movieItemContainer}>
			{item.poster_path ? (
				<Image
					source={{
						uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
					}}
					style={PopularStyle.posterImage}
					resizeMode="cover"
				/>
			) : (
				<View style={PopularStyle.noPosterContainer}>
					<Text style={PopularStyle.noPosterText}>
						Aucune affiche
					</Text>
				</View>
			)}

			<Text style={PopularStyle.movieTitle} numberOfLines={2}>
				{getTitle(item)}
			</Text>
		</Pressable>
	);

	return (
		<View style={PopularStyle.sectionContainer}>
			<Text style={PopularStyle.sectionTitle}>{title}</Text>
			{loading ? (
				<View style={PopularStyle.loadingContainer}>
					<Text style={PopularStyle.loadingText}>
						Chargement{" "}
						{mediaType === "movie" ? "des films" : "des séries"}...
					</Text>
				</View>
			) : (
				<View style={PopularStyle.flatListContainer}>
					<FlatList
						data={media}
						renderItem={renderMediaItem}
						keyExtractor={(item) =>
							`${mediaType}-${item.id.toString()}`
						}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={PopularStyle.flatListContent}
						snapToAlignment="start"
						decelerationRate="fast"
						snapToInterval={112.5}
					/>
				</View>
			)}
		</View>
	);
}
