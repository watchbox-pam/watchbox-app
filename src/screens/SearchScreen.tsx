import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ActivityIndicator,
	RefreshControl,
	Keyboard
} from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { searchService } from "@/src/services/SearchService";
import { providerService } from "@/src/services/ProviderService";
import styles from "@/src/styles/SearchStyle";
import { router } from "expo-router";
import StyledText from "../components/StyledText";
import Header from "../components/Header";
import CadrePublicitaire from "../components/CadrePublicitaire";
import Movie from "@/src/models/Movie";
import Person from "@/src/models/Person";
import Provider from "@/src/models/Provider";
import * as SecureStore from "expo-secure-store";
import { ErrorMessage } from "../components/ErrorMessage";
import FallbackImage from "../components/FallbackImage";

export default function SearchScreen() {
	// State variables for search input, loading state, results and filter
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [actors, setActors] = useState<Person[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [error, setError] = useState(false);
	const [searchError, setSearchError] = useState(false);
	const [suggestions, setSuggestions] = useState<(Movie | Person)[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

	// State variables for providers
	const [allProviders, setAllProviders] = useState<Provider[]>([]);
	const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
	const [showProviderFilter, setShowProviderFilter] =
		useState<boolean>(false);

	const hasInteracted = useRef(false);

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!hasInteracted.current) return;
			if (searchTerm.trim().length >= 2) {
				fetchSuggestions();
			} else {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		}, 400);

		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm, selectedFilter]);

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
		if (refreshing) {
			setRefreshing(false);
		}
	}, [refreshing]);

	// Fetch all providers from API
	const fetchProviders = async () => {
		try {
			const response = await providerService.getProviders();
			if (response.success) {
				setAllProviders(response.data);
			}
		} catch (error) {
			setError(true);
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

	const fetchSuggestions = async () => {
		setIsLoadingSuggestions(true);
		try {
			const results = await searchService.getSuggestions(
				searchTerm,
				selectedProviders.length > 0 ? selectedProviders : undefined
			);
			if (results.success) {
				const seenTitles = new Set<string>();
				const unique = results.data.filter((item: any) => {
					const title = item.title || item.name;
					if (seenTitles.has(title)) return false;
					seenTitles.add(title);
					return true;
				});

				setSuggestions(unique);
				if (hasInteracted.current) {
					setShowSuggestions(unique.length > 0);
				}
			}
		} catch (error) {
			console.error("Error fetching suggestions:", error);
			setSuggestions([]);
		} finally {
			setIsLoadingSuggestions(false);
		}
	};

	const handleSuggestionSelect = (item: Movie | Person) => {
		const title = "title" in item ? item.title : item.name;
		hasInteracted.current = false;
		setShowSuggestions(false);
		setSearchTerm(title);
		Keyboard.dismiss();
		search(title);
	};

	// Perform search based on current filter, search term, and selected providers
	const search = async (termOverride?: string) => {
		const term = termOverride ?? searchTerm;
		hasInteracted.current = false;
		if (term.trim()) {
			setShowSuggestions(false);
			Keyboard.dismiss();
			setIsLoading(true);
			try {
				switch (selectedFilter) {
					case "films":
						const movieResults = await searchService.searchMovies(
							term,
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
							await searchService.searchActors(term);
						if (actorResults.success) {
							setActors(actorResults.data);
							setMovies([]); // Clear movies when filtering actors
						}
						break;

					case "all":
					default:
						const allResults = await searchService.searchAll(
							term,
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
				setSearchError(true);
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
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilter]);

	// Render single movie item
	const renderMovieItem = (item: Movie) => (
		<View key={item.id} style={styles.viewResult}>
			<TouchableOpacity
				onPress={() => router.push(`/(app)/(tabs)/movie/${item.id}`)}
				style={styles.resultatInfo}>
				<FallbackImage
					uri={
						item.poster_path
							? `https://image.tmdb.org/t/p/w500${item.poster_path}`
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
						{item.title}
					</Text>
					<Text style={styles.resultDetails}>
						{item.original_title
							? `${item.original_title}`
							: "Titre original inconnue"}
					</Text>
					<Text style={styles.resultDetails}>
						{item.release_date
							? new Date(item.release_date).getFullYear()
							: "N/A"}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);

	// Render single actor item
	// const renderActorItem = (item: Person) => (
	// 	<View key={item.id} style={styles.viewResult}>
	// 		<TouchableOpacity
	// 			onPress={() => router.push(`/(app)/(tabs)/person/${item.id}`)}
	// 			style={styles.resultatInfo}>
	// 			<Image
	// 				source={{
	// 					uri: item.profile_path
	// 						? `https://image.tmdb.org/t/p/w500${item.profile_path}`
	// 						: "https://via.placeholder.com/500x750?text=No+Image"
	// 				}}
	// 				style={styles.image}
	// 				resizeMode="cover"
	// 			/>
	// 			<View style={styles.resultInfo}>
	// 				<Text style={styles.resultTitle} numberOfLines={2}>
	// 					{item.name}
	// 				</Text>
	// 				<Text style={styles.resultDetails}>
	// 					{item.known_for_department || "Actor/Actress"}
	// 				</Text>
	// 			</View>
	// 		</TouchableOpacity>
	// 	</View>
	// );

	const renderActorItem = (item: Person) => (
		<TouchableOpacity
			key={item.id}
			onPress={() => router.push(`/(app)/(tabs)/person/${item.id}`)}
			style={styles.actorCard}>
			<FallbackImage
				uri={
					item.profile_path
						? `https://image.tmdb.org/t/p/w500${item.profile_path}`
						: null
				}
				style={styles.actorImage}
				resizeMode="cover"
			/>
			<Text style={styles.actorName} numberOfLines={2}>
				{item.name}
			</Text>
			<Text style={styles.actorDepartment} numberOfLines={1}>
				{item.known_for_department || "Actor/Actress"}
			</Text>
		</TouchableOpacity>
	);
	const renderSuggestionItem = (item: Movie | Person) => {
		const isMovie = "title" in item;
		const title = isMovie ? (item as Movie).title : (item as Person).name;
		const uniqueKey = `${item.media_type}-${item.id}`;

		return (
			<TouchableOpacity
				key={uniqueKey}
				style={styles.suggestionItem}
				onPress={() => handleSuggestionSelect(item)}>
				<Text style={styles.suggestionText} numberOfLines={1}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	};

	// Update selected filter state
	const handleFilterSelect = (filterKey: string) => {
		hasInteracted.current = false;
		setSelectedFilter(filterKey);
	};

	if (error) {
		return <ErrorMessage onRetry={() => setRefreshing(!refreshing)} />;
	}

	return (
		<View style={styles.container}>
			<Header title="Recherche" />
			{/* Search input and button */}
			<View style={styles.topSection}>
				<View style={styles.searchInputContainer}>
					<TextInput
						style={styles.input}
						onChangeText={(text) => {
							hasInteracted.current = true;
							setSearchTerm(text);
						}}
						value={searchTerm}
						placeholder="Rechercher..."
						placeholderTextColor="#888"
						onSubmitEditing={() => search()}
						returnKeyType="search"
						onFocus={() => {
							if (
								searchTerm.trim().length > 0 &&
								suggestions.length > 0
							) {
								setShowSuggestions(true);
							}
						}}
					/>
					{/* Suggestions dropdown */}
					{showSuggestions && (
						<View style={styles.suggestionsContainer}>
							{isLoadingSuggestions ? (
								<View style={styles.suggestionLoadingContainer}>
									<ActivityIndicator
										size="small"
										color="#fff"
									/>
								</View>
							) : (
								suggestions.map(renderSuggestionItem)
							)}
						</View>
					)}
				</View>

				<TouchableOpacity
					onPress={() => search()}
					style={styles.BtnSearch}>
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
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}>
				{/* Error message */}
				{searchError && (
					<ErrorMessage message="Erreur lors du chargement des résultats de recherche." />
				)}

				{/* No search term message */}
				{!searchTerm.trim() && (
					<StyledText style={styles.NoResult}>
						Veuillez entrer une recherche
					</StyledText>
				)}

				{/* Loading indicator */}
				{isLoading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#fff" />
					</View>
				)}

				{/* Search results display */}
				{!isLoading && !searchError && (
					<View>
						{movies.length > 0 && (
							<View>
								{/* Show section title only if filter is not strictly movies */}
								{selectedFilter !== "films" && (
									<StyledText style={styles.sectionTitle}>
										Films
									</StyledText>
								)}
								{movies.map((movie, index) => (
									<View key={`movie-${movie.id}`}>
										{renderMovieItem(movie)}
										{/* {((index + 1) % 11 === 5 ||
											(index + 1) % 11 === 0) && (
											<CadrePublicitaire
												title="🎬 Streaming Premium"
												description="Profitez de 30 jours gratuits sur toutes les plateformes"
												imageUrl="https://via.placeholder.com/150"
												link="https://example.com"
											/>
										)} */}
									</View>
								))}
							</View>
						)}

						{/* {actors.length > 0 && (
							<View key={`actors-section`}> 
								{selectedFilter !== "actors" && (
									<StyledText style={styles.sectionTitle}>
										Acteurs
									</StyledText>
								)}
								{actors.map((actor, index) => (
									<View key={`actor-${actor.id}`}>
										{renderActorItem(actor)}
										{((index + 1) % 11 === 5 ||
											(index + 1) % 11 === 0) && (
											<CadrePublicitaire
												title="🎬 Streaming Premium"
												description="Profitez de 30 jours gratuits sur toutes les plateformes"
												imageUrl="https://via.placeholder.com/150"
												link="https://example.com"
											/>
										)}
									</View>
								))}
							</View>
						)} */}

						{actors.length > 0 && (
							<View key={`actors-section`}>
								{selectedFilter !== "actors" && (
									<StyledText style={styles.sectionTitle}>
										Acteurs
									</StyledText>
								)}
								<View style={styles.actorsGrid}>
									{actors.map((actor) => (
										<View
											key={`actor-${actor.id}`}
											style={styles.actorGridItem}>
											{renderActorItem(actor)}
										</View>
									))}
								</View>
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
					</View>
				)}
			</ScrollView>
		</View>
	);
}
