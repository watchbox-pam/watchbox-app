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
import { useState, useEffect, useCallback, useRef, use } from "react";
import { searchService } from "@/src/services/SearchService";
import { providerService } from "@/src/services/ProviderService";
import styles from "@/src/styles/SearchStyle";
import StyledText from "../components/StyledText";
import Header from "../components/Header";
import CadrePublicitaire from "../components/CadrePublicitaire";
import Movie from "@/src/models/Movie";
import Person from "@/src/models/Person";
import Provider from "@/src/models/Provider";
import useFiltersStore from "@/src/zustand/filtersStore";
import { ErrorMessage } from "../components/ErrorMessage";
import Entypo from "@expo/vector-icons/Entypo";
import MovieSearchResult from "@/src/components/search/MovieSearchResult";
import PersonSearchResult from "@/src/components/search/PersonSearchResult";
import UserSearchResultModel from "@/src/models/UserSearchResultModel";
import UserSearchResult from "@/src/components/search/UserSearchResult";

export default function SearchScreen() {
	// State variables for search input, loading state, results and filter
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [actors, setActors] = useState<Person[]>([]);
	const [users, setUsers] = useState<UserSearchResultModel[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [error, setError] = useState(false);
	const [searchError, setSearchError] = useState(false);
	const [suggestions, setSuggestions] = useState<(Movie | Person)[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

	// State variables for providers
	const [allProviders, setAllProviders] = useState<Provider[]>([]);
	const [showProviderFilter, setShowProviderFilter] =
		useState<boolean>(false);
	const {
		selectedProviders,
		isLoaded,
		loadProviders,
		toggleProvider,
		clearProviders
	} = useFiltersStore();

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
		{ key: "actors", label: "Personnes" },
		{ key: "users", label: "Utilisateurs" }
	];

	// Load providers and selected providers when component mounts
	useEffect(() => {
		fetchProviders();
		if (!isLoaded) loadProviders();
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
		const title =
			item.media_type === "movie"
				? (item as Movie).title
				: (item as Person).name;
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
							const sortedActors = actorResults.data.sort(
								(a: Person, b: Person) =>
									(b.popularity ?? 0) - (a.popularity ?? 0)
							);
							setActors(sortedActors);
							setMovies([]);
						}
						break;

					case "users":
						const userResults =
							await searchService.searchUsers(term);
						if (userResults.success) {
							setUsers(userResults.data);
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
							setUsers(allResults.data.users || []);
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

	const applyProviders = () => {
		setShowProviderFilter(false);
		if (searchTerm.trim()) {
			search();
		}
	};

	// Trigger search when the filter changes and searchTerm is not empty
	useEffect(() => {
		if (searchTerm.trim()) {
			search();
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilter]);

	const renderSuggestionItem = (item: Movie | Person) => {
		const isMovie = item.media_type === "movie";
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
					{/* Bouton Clear */}
					{searchTerm.length > 0 && (
						<TouchableOpacity
							style={styles.clearButton}
							onPress={() => {
								setSearchTerm("");
								setSuggestions([]);
								setShowSuggestions(false);
								hasInteracted.current = false;
								setMovies([]);
								setActors([]);
								setUsers([]);
							}}>
							<Entypo name="cross" size={20} color="black" />
						</TouchableOpacity>
					)}
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
					<Entypo name="magnifying-glass" size={20} color="#000" />
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
						<TouchableOpacity onPress={clearProviders}>
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
							onPress={applyProviders}>
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
										<MovieSearchResult movie={movie} />
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
										Personnes
									</StyledText>
								)}
								<View style={styles.actorsGrid}>
									{actors.map((actor) => (
										<View
											key={`actor-${actor.id}`}
											style={styles.actorGridItem}>
											<PersonSearchResult
												person={actor}
											/>
										</View>
									))}
								</View>
							</View>
						)}

						{users.length > 0 && (
							<View>
								{/* Show section title only if filter is not strictly movies */}
								{selectedFilter !== "users" && (
									<StyledText style={styles.sectionTitle}>
										Utilisateurs
									</StyledText>
								)}
								{users.map((user, index) => (
									<View key={`user-${user.id}`}>
										<UserSearchResult user={user} />
									</View>
								))}
							</View>
						)}

						{/* No results message */}
						{!isLoading &&
							searchTerm.trim() &&
							movies.length === 0 &&
							actors.length === 0 &&
							users.length === 0 && (
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
