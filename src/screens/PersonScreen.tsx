import { useLocalSearchParams } from "expo-router";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import styles from "@/src/styles/PersonStyle";
import BackButton from "../components/BackButton";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import StyledText from "../components/StyledText";
import ReadMore from "../components/ReadMore";
import PersonMediaList from "../components/PersonMediaList";
import { fetchPerson } from "@/src/services/PersonService";
import { ErrorMessage } from "../components/ErrorMessage";
import DropDownSharePeople from "../components/DropDownSharePeople";
import countries from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";
import en from "i18n-iso-countries/langs/en.json";
import es from "i18n-iso-countries/langs/es.json";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function PersonScreen() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [person, setPerson] = useState<Person | undefined>(undefined);
	const [moviesCast, setMoviesCast] = useState<Media[] | undefined>(
		undefined
	);
	const [tvCast, setTvCast] = useState<Media[] | undefined>(undefined);
	const [moviesCrew, setMoviesCrew] = useState<Media[] | undefined>(
		undefined
	);
	const [tvCrew, setTvCrew] = useState<Media[] | undefined>(undefined);

	// Get person ID from route parameters
	const { id }: { id: string } = useLocalSearchParams();

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	// Create explicit retry function that properly resets error state and triggers a new fetch
	const handleRetry = useCallback(() => {
		// Reset error state
		setError(false);
		// Trigger refresh
		setRefreshing(true);
	}, []);

	const removeDuplicates = (arr: Media[]) => {
		return arr.filter(
			(item: Media, index: number, self: Media[]) =>
				index === self.findIndex((t: Media) => t.title === item.title)
		);
	};

	// Fetch person data and credits on mount
	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				setLoading(true);
				let response = await fetchPerson(id);

				if (!response) {
					setError(true);
					setLoading(false);
					return;
				}

				setPerson(response.data.person);

				// Separate cast and crew by media type
				setMoviesCast(
					removeDuplicates(
						response.data.combined_credits.cast.filter(
							(item: Media) => item.media_type === "movie"
						)
					)
				);
				setTvCast(
					removeDuplicates(
						response.data.combined_credits.cast.filter(
							(item: Media) => item.media_type === "tv"
						)
					)
				);
				setMoviesCrew(
					removeDuplicates(
						response.data.combined_credits.crew.filter(
							(item: Media) => item.media_type === "movie"
						)
					)
				);
				setTvCrew(
					removeDuplicates(
						response.data.combined_credits.crew.filter(
							(item: Media) => item.media_type === "tv"
						)
					)
				);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching person data:", error);
				setError(true);
				setLoading(false);
			}
		})();
		if (refreshing) {
			setRefreshing(false);
		}
	}, [id, refreshing]);

	// Ensure all required data is present
	const checkData = () => {
		return person && moviesCast && tvCast && moviesCrew && tvCrew
			? true
			: false;
	};

	const formatDateFR = (dateStr: string) => {
		const [year, month, day] = dateStr.split("-");
		const months = [
			"janvier",
			"février",
			"mars",
			"avril",
			"mai",
			"juin",
			"juillet",
			"août",
			"septembre",
			"octobre",
			"novembre",
			"décembre"
		];
		return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
	};

	// Convert birthday to age
	const convertDateToAge = (date: string) => {
		const today = new Date();
		const birthDate = new Date(date);
		let age = today.getFullYear() - birthDate.getFullYear();

		const monthDiff = today.getMonth() - birthDate.getMonth();
		const dayDiff = today.getDate() - birthDate.getDate();

		if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
			age--;
		}

		return age;
	};
	const convertDateToAgeAtDeath = (birthday: string, deathday: string) => {
		const birth = new Date(birthday);
		const death = new Date(deathday);
		let age = death.getFullYear() - birth.getFullYear();
		const m = death.getMonth() - birth.getMonth();
		if (m < 0 || (m === 0 && death.getDate() < birth.getDate())) {
			age--;
		}
		return age;
	};

	countries.registerLocale(fr);
	countries.registerLocale(en);
	countries.registerLocale(es);

	const REGION_TRANSLATIONS: Record<string, Record<string, string>> = {
		fr: {
			// États américains
			Alabama: "Alabama",
			Alaska: "Alaska",
			Arizona: "Arizona",
			Arkansas: "Arkansas",
			California: "Californie",
			Colorado: "Colorado",
			Connecticut: "Connecticut",
			Delaware: "Delaware",
			Florida: "Floride",
			Georgia: "Géorgie",
			Hawaii: "Hawaï",
			Idaho: "Idaho",
			Illinois: "Illinois",
			Indiana: "Indiana",
			Iowa: "Iowa",
			Kansas: "Kansas",
			Kentucky: "Kentucky",
			Louisiana: "Louisiane",
			Maine: "Maine",
			Maryland: "Maryland",
			Massachusetts: "Massachusetts",
			Michigan: "Michigan",
			Minnesota: "Minnesota",
			Mississippi: "Mississippi",
			Missouri: "Missouri",
			Montana: "Montana",
			Nebraska: "Nebraska",
			Nevada: "Nevada",
			"New Hampshire": "New Hampshire",
			"New Jersey": "New Jersey",
			"New Mexico": "Nouveau-Mexique",
			"New York": "New York",
			"North Carolina": "Caroline du Nord",
			"North Dakota": "Dakota du Nord",
			Ohio: "Ohio",
			Oklahoma: "Oklahoma",
			Oregon: "Oregon",
			Pennsylvania: "Pennsylvanie",
			"Rhode Island": "Rhode Island",
			"South Carolina": "Caroline du Sud",
			"South Dakota": "Dakota du Sud",
			Tennessee: "Tennessee",
			Texas: "Texas",
			Utah: "Utah",
			Vermont: "Vermont",
			Virginia: "Virginie",
			Washington: "Washington",
			"West Virginia": "Virginie-Occidentale",
			Wisconsin: "Wisconsin",
			Wyoming: "Wyoming",
			"District of Columbia": "District de Columbia",
			// Provinces canadiennes
			"British Columbia": "Colombie-Britannique",
			Ontario: "Ontario",
			Quebec: "Québec",
			Alberta: "Alberta",
			Manitoba: "Manitoba",
			Saskatchewan: "Saskatchewan",
			"Nova Scotia": "Nouvelle-Écosse",
			"New Brunswick": "Nouveau-Brunswick",
			"Newfoundland and Labrador": "Terre-Neuve-et-Labrador",
			"Prince Edward Island": "Île-du-Prince-Édouard"
		}
	};

	const translateRegion = (region: string, lang: string) => {
		return REGION_TRANSLATIONS[lang]?.[region] ?? region;
	};

	const translateCountry = (name: string, lang: string) => {
		const code = countries.getAlpha2Code(name, "en");
		return code ? (countries.getName(code, lang) ?? name) : name;
	};

	const formatBirthPlace = (place?: string | null): string => {
		if (!place) return "";

		const locale = Intl.DateTimeFormat().resolvedOptions().locale ?? "en";
		const localeLanguage = locale.split("-")[0].toLowerCase();
		const lang = ["fr", "en"].includes(localeLanguage)
			? localeLanguage
			: "en";

		const parts = place.split(", ");

		if (parts.length === 3) {
			const [city, region, country] = parts;
			return `${city}, ${translateRegion(region, lang)}, ${translateCountry(country, lang)}, `;
		}
		if (parts.length === 2) {
			const [city, country] = parts;
			return `${city}, ${translateCountry(country, lang)}`;
		}
		return place;
	};

	if (loading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	if (!checkData() || error) {
		return <ErrorMessage onRetry={handleRetry} />;
	}

	return (
		<ScrollView
			style={styles.container}
			overScrollMode="never"
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<View style={styles.headers}>
				<BackButton />
				<DropDownSharePeople />
			</View>

			<View>
				<View style={styles.personInfoRow}>
					<View style={styles.imageContainer}>
						{!person?.profile_path ? (
							<View style={styles.noImage} />
						) : (
							<Image
								style={styles.image}
								source={{
									uri: `https://image.tmdb.org/t/p/original${person?.profile_path}`
								}}
							/>
						)}
					</View>

					<View style={styles.personInfoContainer}>
						<StyledText style={styles.personName}>
							{person?.name}
						</StyledText>
						{/* Lieu de naissance */}
						{person?.place_of_birth && (
							<View style={styles.infoRow}>
								<Ionicons
									name="location"
									size={20}
									color="#7EB8D4"
								/>
								<StyledText style={styles.infoText}>
									{formatBirthPlace(person.place_of_birth)}
								</StyledText>
							</View>
						)}
						{/* Naissance */}
						{person?.birthday && (
							<View style={styles.infoRow}>
								<Ionicons
									name="gift"
									size={20}
									color="#7EB8D4"
								/>
								<StyledText style={styles.infoText}>
									{formatDateFR(person.birthday)}
								</StyledText>
							</View>
						)}

						{/* Décès */}
						{person?.deathday && (
							<View style={styles.infoRow}>
								<MaterialCommunityIcons
									name="cross"
									size={20}
									color="#7EB8D4"
								/>
								<StyledText style={styles.infoText}>
									{formatDateFR(person.deathday)}
								</StyledText>
							</View>
						)}

						{/* Age */}
						{person?.birthday && (
							<View style={styles.ageBadge}>
								<StyledText style={styles.ageBadgeText}>
									{person.deathday
										? convertDateToAgeAtDeath(
												person.birthday,
												person.deathday
											)
										: convertDateToAge(person.birthday)}
									{" ans"}
								</StyledText>
							</View>
						)}
					</View>
				</View>
				<ReadMore data={person?.biography} />
				{moviesCast && moviesCast.length > 0 && (
					<View style={styles.mediaSection}>
						<StyledText style={styles.mediaSectionTitle}>
							Acteur dans les films
						</StyledText>
						<PersonMediaList data={moviesCast} />
					</View>
				)}

				{tvCast && tvCast.length > 0 && (
					<View style={styles.mediaSection}>
						<StyledText style={styles.mediaSectionTitle}>
							Acteur dans les séries
						</StyledText>
						<PersonMediaList data={tvCast} />
					</View>
				)}

				{moviesCrew && moviesCrew.length > 0 && (
					<View style={styles.mediaSection}>
						<StyledText style={styles.mediaSectionTitle}>
							Membre de l'équipe du film
						</StyledText>
						<PersonMediaList data={moviesCrew} />
					</View>
				)}

				{tvCrew && tvCrew.length > 0 && (
					<View style={styles.mediaSection}>
						<StyledText style={styles.mediaSectionTitle}>
							Membre de l'équipe de la série
						</StyledText>
						<PersonMediaList data={tvCrew} />
					</View>
				)}
			</View>
		</ScrollView>
	);
}

// Types for person and media items
export type Media = {
	id: string;
	poster_path: string;
	media_type: string;
	title: string;
};

export type Person = {
	id: string;
	biography: string;
	birthday: string;
	name: string;
	place_of_birth: string;
	profile_path: string;
	deathday: string;
};
