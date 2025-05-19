import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { searchService } from "@/src/services/SearchService";
import styles from "@/src/styles/SearchStyle";
import { router } from "expo-router";
import StyledText from "../components/StyledText";
import Movie from "@/src/models/Movie";
import Person from "@/src/models/Person";

export default function SearchScreen() {
	// State variables for search input, loading state, results and filter
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [results, setResults] = useState<Movie[]>([]);
	const [category, setCategory] = useState("all");
	const [selectedFilter, setSelectedFilter] = useState("all"); // État pour suivre l'élément sélectionné

	const filters = [
		{ key: "all", label: "Tous" },
		{ key: "films", label: "Films" },
		{ key: "actors", label: "Acteurs" }
	];

	// Perform search based on current filter and search term
	const search = async () => {
		if (searchTerm.trim()) {
			setIsLoading(true);
			try {
				switch (selectedFilter) {
					case "films":
						const movieResults =
							await searchService.searchMovies(searchTerm);
						if (movieResults.success) {
							setMovies(movieResults.data);
							setActors([]); // Clear actors when filtering movies
						}
						break;

					case "actors":
						const actorResults =
							await searchService.searchActors(searchTerm);
						if (actorResults.success) {
							setActors(actorResults.data);
							setMovies([]); // Clear movies when filtering actors
						}
						break;

					case "all":
					default:
						const allResults =
							await searchService.searchAll(searchTerm);
						if (allResults.success) {
							setMovies(allResults.data.movies || []);
							setActors(allResults.data.people || []);
						}
						break;
				}
			} catch (error) {
				console.error("Search error:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	// Trigger search when the filter changes and searchTerm is not empty
	useEffect(() => {
		if (searchTerm.trim()) {
			search();
		}
	}, [selectedFilter]);

	// Render single movie item
	const renderMovieItem = (item: Movie) => (
		<View key={item.id} style={styles.viewResult}>
			<TouchableOpacity
				onPress={() => router.push(`/movie/${item.id}`)}
				style={styles.resultatInfo}>
				<Image
					source={{
						uri: item.poster_path
							? `https://image.tmdb.org/t/p/w500${item.poster_path}`
							: "https://via.placeholder.com/500x750?text=No+Image"
					}}
					style={styles.image}
					resizeMode="cover"
				/>
				<View style={styles.resultInfo}>
					<Text style={styles.resultTitle} numberOfLines={2}>
						{item.title}
					</Text>
					<Text style={styles.resultYear}>
						{item.release_date
							? new Date(item.release_date).getFullYear()
							: "N/A"}
					</Text>
				</View>
			</TouchableOpacity>
			<View style={styles.separator}></View>
		</View>
	);

	// Render single actor item
	const renderActorItem = (item: Person) => (
		<View key={item.id} style={styles.viewResult}>
			<TouchableOpacity
				onPress={() => router.push(`/person/${item.id}`)}
				style={styles.resultatInfo}>
				<Image
					source={{
						uri: item.profile_path
							? `https://image.tmdb.org/t/p/w500${item.profile_path}`
							: "https://via.placeholder.com/500x750?text=No+Image"
					}}
					style={styles.image}
					resizeMode="cover"
				/>
				<View style={styles.resultInfo}>
					<Text style={styles.resultTitle} numberOfLines={2}>
						{item.name}
					</Text>
					<Text style={styles.resultYear}>
						{item.known_for_department || "Actor/Actress"}
					</Text>
				</View>
			</TouchableOpacity>
			<View style={styles.separator}></View>
		</View>
	);

	// Update selected filter state
	const handleFilterSelect = (filterKey: string) => {
		setSelectedFilter(filterKey);
	};

	return (
		<View style={styles.container}>
			{/* Search input and button */}
			<View style={styles.topSection}>
				<TextInput
					style={styles.input}
					onChangeText={setSearchTerm}
					value={searchTerm}
					placeholder="Rechercher..."
					placeholderTextColor="#888"
				/>
				<TouchableOpacity onPress={search} style={styles.BtnSearch}>
					<Text style={styles.TextSearch}>Rechercher</Text>
				</TouchableOpacity>
			</View>

			{/* Filter selection horizontal list */}
			<View>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.listFilters}
					data={filters}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => handleFilterSelect(item.key)}
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
			</View>

			{/* Loading indicator */}
			{isLoading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}

			{/* Search results display */}
			{!isLoading && (
				<ScrollView>
					{movies.length > 0 && (
						<View>
							{/* Show section title only if filter is not strictly movies */}
							{selectedFilter !== "films" && (
								<StyledText style={styles.sectionTitle}>
									Films
								</StyledText>
							)}
							{movies.map(renderMovieItem)}
						</View>
					)}

					{actors.length > 0 && (
						<View>
							{/* Show section title only if filter is not strictly actors */}
							{selectedFilter !== "actors" && (
								<StyledText style={styles.sectionTitle}>
									Acteurs
								</StyledText>
							)}
							{actors.map(renderActorItem)}
						</View>
					)}

					{/* No results message */}
					{!isLoading &&
						searchTerm.trim() &&
						movies.length === 0 &&
						actors.length === 0 && (
							<StyledText style={styles.NoResult}>
								Aucun résultat
							</StyledText>
						)}
				</ScrollView>
			)}
		</View>
	);
}
