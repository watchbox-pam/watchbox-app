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
import { providerService } from "@/src/services/ProviderService";
import styles from "@/src/styles/SearchStyle";
import { router } from "expo-router";
import StyledText from "../components/StyledText";
import Movie from "@/src/models/Movie";
import Person from "@/src/models/Person";
import Provider from "@/src/models/Provider";
import * as SecureStore from "expo-secure-store";

export default function SearchScreen() {
	// State variables for search input, loading state, results and filter
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [actors, setActors] = useState<Person[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");

	// State variables for providers
	const [allProviders, setAllProviders] = useState<Provider[]>([]);
	const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
	const [showProviderFilter, setShowProviderFilter] =
		useState<boolean>(false);

	// Available search filters
	const filters = [
		{ key: "all", label: "Tous" },
		{ key: "films", label: "Films" },
		{ key: "actors", label: "Acteurs" }
	];

	// Load providers and selected providers when component mounts
	useEffect(() => {
		fetchProviders();
		loadSelectedProviders();
	}, []);

	// Fetch all providers from API
	const fetchProviders = async () => {
		try {
			const response = await providerService.getProviders();
			if (response.success) {
				setAllProviders(response.data);
			}
		} catch (error) {
			console.error("Error fetching providers:", error);
		}
	};

	// Load selected providers from AsyncStorage
	const loadSelectedProviders = async () => {
		try {
			const savedProviders =
				await SecureStore.getItemAsync("selectedProviders");
			if (savedProviders) {
				const parsedProviders = JSON.parse(savedProviders);
				setSelectedProviders(parsedProviders);
			}
		} catch (error) {
			console.error("Error loading selected providers:", error);
		}
	};

	// Perform search based on current filter, search term, and selected providers
	const search = async () => {
		if (searchTerm.trim()) {
			setIsLoading(true);
			try {
				switch (selectedFilter) {
					case "films":
						const movieResults = await searchService.searchMovies(
							searchTerm,
							selectedProviders.length > 0
								? selectedProviders
								: undefined
						);
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
						const allResults = await searchService.searchAll(
							searchTerm,
							selectedProviders.length > 0
								? selectedProviders
								: undefined
						);
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

	// Toggle provider selection
	const toggleProvider = (providerId: number) => {
		setSelectedProviders((prev) =>
			prev.includes(providerId)
				? prev.filter((id) => id !== providerId)
				: [...prev, providerId]
		);
	};

	// Save selected providers to AsyncStorage
	const saveSelectedProviders = async () => {
		try {
			await SecureStore.setItemAsync(
				"selectedProviders",
				JSON.stringify(selectedProviders)
			);
			setShowProviderFilter(false);
			// Trigger search again with new providers
			if (searchTerm.trim()) {
				search();
			}
		} catch (error) {
			console.error("Error saving selected providers:", error);
		}
	};

	// Clear all selected providers
	const clearSelectedProviders = () => {
		setSelectedProviders([]);
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
			<View style={styles.filterSection}>
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

				{/* Provider filter button */}
				<TouchableOpacity
					style={[
						styles.providerFilterButton,
						selectedProviders.length > 0 &&
							styles.activeProviderFilterButton
					]}
					onPress={() => setShowProviderFilter(!showProviderFilter)}>
					<Text style={styles.providerFilterText}>
						{selectedProviders.length > 0
							? `Filtres (${selectedProviders.length})`
							: "Filtres"}
					</Text>
				</TouchableOpacity>
			</View>

			{/* Provider filter modal */}
			{showProviderFilter && (
				<View style={styles.providerFilterContainer}>
					<View style={styles.providerFilterHeader}>
						<Text style={styles.providerFilterTitle}>
							Plateformes
						</Text>
						<TouchableOpacity onPress={clearSelectedProviders}>
							<Text style={styles.clearText}>Effacer tout</Text>
						</TouchableOpacity>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.providerList}>
						{allProviders.map((provider) => (
							<TouchableOpacity
								key={provider.id}
								style={[
									styles.providerItem,
									selectedProviders.includes(provider.id) &&
										styles.selectedProviderItem
								]}
								onPress={() => toggleProvider(provider.id)}>
								{provider.logo_path ? (
									<Image
										source={{
											uri: `https://image.tmdb.org/t/p/original${provider.logo_path}`
										}}
										style={styles.providerLogo}
									/>
								) : (
									<Text style={styles.providerName}>
										{provider.name}
									</Text>
								)}
							</TouchableOpacity>
						))}
					</ScrollView>

					<View style={styles.providerFilterActions}>
						<TouchableOpacity
							style={styles.providerFilterApplyButton}
							onPress={saveSelectedProviders}>
							<Text style={styles.providerFilterApplyText}>
								Appliquer
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}

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
