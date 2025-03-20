import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { searchInfos } from "@/src/services/SearchService";
import styles from "@/src/styles/SearchStyle";
import { Link } from "expo-router";
import Movie from "@/src/models/Movie";

export default function SearchScreen() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [results, setResults] = useState<Movie[]>([]);
	const [category, setCategory] = useState("all");

	const search = async () => {
		const searchResults = await searchInfos(searchTerm);
		setResults(searchResults);
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
				{results !== null &&
					results?.length > 0 &&
					results.map((result) => {
						return (
							<View style={styles.resContainer} key={result.id}>
								<Link
									style={styles.link}
									href={{
										pathname: "/movie/[id]",
										params: { id: result.id }
									}}>
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
								</Link>
								<View style={styles.separator}></View>
							</View>
						);
					})}
			</ScrollView>
		</View>
	);
}
