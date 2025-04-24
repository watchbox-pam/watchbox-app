import {
	FlatList,
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
	const [selectedFilter, setSelectedFilter] = useState("all"); // État pour suivre l'élément sélectionné

	const filters = [
		{ key: "all", label: "Tous" },
		{ key: "films", label: "Films" },
		{ key: "series", label: "Séries" },
		{ key: "actors", label: "Acteurs" },
		{ key: "users", label: "Utilisateurs" },
		{ key: "years", label: "Année" },
		{ key: "score+", label: "Mieux noté" },
		{ key: "score-", label: "Mal noté" }
	];

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
				<TouchableOpacity onPress={search} style={styles.BtnSearch}>
					<Text style={styles.TextSearch}>Rechercher</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.listFilters}
				data={filters}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => setSelectedFilter(item.key)}
						style={[
							styles.filterContainer,
							selectedFilter === item.key &&
								styles.selectedFilterContainer
						]}>
						<Text
							style={[
								styles.filter,
								selectedFilter === item.key &&
									styles.selectedFilter
							]}>
							{item.label}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<ScrollView>
				{results !== null && results?.length > 0 ? (
					results.map((result) => {
						return (
							<View key={result.id} style={styles.viewResult}>
								<TouchableOpacity
									onPress={() =>
										router.push(`/movie/${result.id}`)
									}
									style={styles.resultatInfo}>
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
					<StyledText style={styles.NoResult}>
						Aucun résultat
					</StyledText>
				)}
			</ScrollView>
		</View>
	);
}
