import React, { useEffect, useState } from "react";
import { FlatList, View, Image, Text } from "react-native";
import { Link } from "expo-router";
import { getMediaInPlaylist } from "../services/PlaylistService";
import GradientDivider from "./TraitGradiant";
import styles from "@/src/styles/CarouselWatchListStyle";

// Component displaying a horizontal carousel of movies from a playlist
export default function CarouselWatchList({
	providers,
	showDivider = true
}: {
	providers: any;
	showDivider?: boolean;
}) {
	interface Movie {
		image?: string;
	}

	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		// Fetch movies for the given playlist (providers.id)
		const fetchMoviesForPlaylist = async () => {
			if (providers && providers.id) {
				try {
					const result = await getMediaInPlaylist(providers.id);
					if (result.success && Array.isArray(result.data)) {
						setMovies(result.data);
					} else {
						console.error(
							"Error fetching movies for playlist or invalid data format:",
							result.message
						);
						setMovies([]);
					}
				} catch (error) {
					console.error("Error in fetchMoviesForPlaylist:", error);
					setMovies([]);
				}
			}
		};
		fetchMoviesForPlaylist();
	}, [providers]);

	// Filter out movies without images
	const filteredMovies = movies.filter((movie) => movie && movie.image);

	return (
		<View>
			<View style={styles.container}>
				{filteredMovies.length > 0 ? (
					<FlatList
						data={filteredMovies}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }: { item: Movie }) => (
							<Link
								href={{
									pathname: "/watchList/[id]",
									params: { id: providers.id }
								}}
								style={styles.imageContainer}>
								<Image
									source={
										item.image
											? {
													uri: `https://image.tmdb.org/t/p/w500${item.image}`
												}
											: require("../assets/images/watchbox-logo.png")
									}
									style={styles.image}
									resizeMode="cover"
								/>
							</Link>
						)}
					/>
				) : (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>Playlist vide</Text>
						<Text style={styles.emptySubText}>
							Commencez par ajouter vos{" "}
							<Text style={styles.emptyHighlight}>
								films préférés
							</Text>{" "}
							à cette collection !
						</Text>
					</View>
				)}
			</View>

			{showDivider && <GradientDivider />}
		</View>
	);
}
