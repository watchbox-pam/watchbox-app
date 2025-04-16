import {
	Button,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import React, { useState } from "react";
import { searchInfos } from "@/src/services/SearchService";
import styles from "@/src/styles/SearchStyle";
import { router } from "expo-router";
import Movie from "@/src/models/Movie";
import StyledText from "../components/StyledText";

export default function SearchScreen() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [results, setResults] = useState<Movie[]>([]);
	const [category, setCategory] = useState("all");

	const search = async () => {
		if (searchTerm.trim()) {
			const searchResults = await searchInfos(searchTerm);
			if (searchResults.success) {
				setResults(searchResults.data);
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.topSection}>
				<TextInput style={styles.input} onChangeText={setSearchTerm} />
				<Button title={"Rechercher"} onPress={search} />
			</View>
			<View style={styles.listFilters}>
				<Text style={styles.filter}>Films</Text>
				<Text style={styles.filter}>Séries</Text>
				<Text style={styles.filter}>Acteurs</Text>
			</View>
			<ScrollView contentContainerStyle={styles.resultsContainer}>
				{results !== null && results?.length > 0 ? (
					results.map((result) => {
						return (
							<View style={styles.resContainer} key={result.id}>
								<TouchableOpacity
									onPress={() =>
										router.push(`/movie/${result.id}`)
									}
									style={styles.link}>
									<Image
										source={{
											uri: `https://image.tmdb.org/t/p/w500${result.poster_path}`
										}}
										style={styles.image}
										resizeMode="cover"
									/>
									<View style={styles.resultInfo}>
										<Text
											style={styles.resultTitle}
											numberOfLines={2}>
											{result.title}
										</Text>
										<Text style={styles.resultYear}>
											{
												result.release_date
													.toString()
													.split("-")[0]
											}
										</Text>
									</View>
								</TouchableOpacity>
								<View style={styles.separator}></View>
							</View>
						);
					})
				) : (
					<StyledText>Aucun résultat</StyledText>
				)}
			</ScrollView>
		</View>
	);
}
