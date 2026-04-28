import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import styles from "@/src/styles/SearchStyle";
import FallbackImage from "@/src/components/FallbackImage";
import Person from "@/src/models/Person";

export default function PersonSearchResult({ person }: { person: Person }) {
	return (
		<TouchableOpacity
			key={person.id}
			onPress={() => router.push(`/(app)/(tabs)/person/${person.id}`)}
			style={styles.actorCard}>
			<FallbackImage
				uri={
					person.profile_path
						? `https://image.tmdb.org/t/p/w500${person.profile_path}`
						: null
				}
				style={styles.actorImage}
				resizeMode="cover"
			/>
			<Text style={styles.actorName} numberOfLines={2}>
				{person.name}
			</Text>
			<Text style={styles.actorDepartment} numberOfLines={1}>
				{person.known_for_department || "Actor/Actress"}
			</Text>
		</TouchableOpacity>
	);
}
