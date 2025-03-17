import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	Dimensions
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import PopularStyle from "../styles/PopularStyle";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

type PopularProps = {
	emotion: string;
	onBackToEmotions: () => void;
};

type Movie = {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	release_date: string;
};

export default function Popular({ emotion, onBackToEmotions }: PopularProps) {
	const [movies, setMovies] = useState<Movie[]>([]);
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
		const fetchMovies = async () => {
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

				const genreResponse = await tmdbApi.get("/discover/movie", {
					params: {
						with_genres: selectedGenre,
						sort_by: "popularity.desc",
						page: 1
					}
				});

				const keywordResponse = await tmdbApi.get("/search/movie", {
					params: {
						query: keywords,
						page: 1
					}
				});

				let allMovies = [
					...genreResponse.data.results,
					...keywordResponse.data.results
				];

				const uniqueMovies = Array.from(
					new Map(
						allMovies.map((movie) => [movie.id, movie])
					).values()
				);

				const shuffled = uniqueMovies
					.sort(() => 0.5 - Math.random())
					.slice(0, 10);

				setMovies(shuffled);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des films:",
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [emotion]);

	const renderMovie = ({ item }: { item: Movie }) => (
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
				{item.title}
			</Text>
		</Pressable>
	);

	return (
		<View style={PopularStyle.container}>
			<View style={PopularStyle.headerContainer}>
				<View style={PopularStyle.titleContainer}>
					<Text style={PopularStyle.mainTitleText}>
						Popular this week
					</Text>
					<Text style={PopularStyle.subTitleText}>films</Text>
				</View>

				{emotion && (
					<Pressable
						onPress={onBackToEmotions}
						style={PopularStyle.emotionButton}>
						<Text style={PopularStyle.emotionButtonText}>
							{emotion} • Changer l'émotion
						</Text>
					</Pressable>
				)}
			</View>

			{loading ? (
				<View style={PopularStyle.loadingContainer}>
					<Text style={PopularStyle.loadingText}>
						Chargement des films...
					</Text>
				</View>
			) : (
				<View style={PopularStyle.flatListContainer}>
					<FlatList
						data={movies}
						renderItem={renderMovie}
						keyExtractor={(item) => item.id.toString()}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={PopularStyle.flatListContent}
						snapToAlignment="start"
						decelerationRate="fast"
						snapToInterval={165}
					/>
				</View>
			)}
		</View>
	);
}
