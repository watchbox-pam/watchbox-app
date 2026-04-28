import { TouchableOpacity, View, Text } from "react-native";
import { router } from "expo-router";

import Movie from "@/src/models/Movie";
import FallbackImage from "@/src/components/FallbackImage";
import styles from "@/src/styles/SearchStyle";

export default function MovieSearchResult({ movie }: { movie: Movie }) {
	return (
		<View key={movie.id} style={styles.viewResult}>
			<TouchableOpacity
				onPress={() => router.push(`/(app)/(tabs)/movie/${movie.id}`)}
				style={styles.resultatInfo}>
				<FallbackImage
					uri={
						movie.poster_path
							? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
							: null
					}
					style={styles.image}
					fallbackStyle={{
						borderWidth: 1,
						borderColor: "#AC2821",
						borderRadius: 10,
						aspectRatio: 2 / 3
					}}
				/>
				<View style={styles.resultInfo}>
					<Text style={styles.resultTitle} numberOfLines={2}>
						{movie.title}
					</Text>
					<Text style={styles.resultDetails}>
						{movie.original_title
							? `${movie.original_title}`
							: "Titre original inconnu"}
					</Text>
					<Text style={styles.resultDetails}>
						{movie.release_date
							? new Date(movie.release_date).getFullYear()
							: "N/A"}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
