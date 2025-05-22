import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import { getMediaInPlaylist } from "../services/PlaylistService";

export default function CarouselWatchList({ providers }: { providers: any }) {
	interface Movie {
		image?: string;
	}

	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
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

	const filteredMovies = movies.filter((movie) => movie && movie.image);

	return (
		<View style={styles.container}>
			{filteredMovies.length > 0 ? (
				<FlatList
					data={filteredMovies}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }: { item: Movie }) => (
						<Link
							href={{
								pathname: "/watchList/[id]",
								params: {
									id: providers.id,
									movies: JSON.stringify(filteredMovies)
								}
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
					<Image
						source={require("../assets/images/watchbox-logo.png")}
						style={styles.emptyImage}
						resizeMode="contain"
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 150,
		borderRadius: 10
	},
	imageContainer: {
		marginRight: 10,
		height: 160,
		alignItems: "center"
	},
	container: {
		height: 160,
		paddingLeft: 10
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	emptyImage: {
		width: 100,
		height: 100
	},
	loading: {
		backgroundColor: "#0A1E38",
		height: "100%",
		width: "100%",
		justifyContent: "center"
	}
});
