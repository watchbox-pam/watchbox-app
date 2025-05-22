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
			</View>

			<View>
				<View style={styles.personInfoRow}>
					<View style={styles.imageContainer}>
						{!person?.profile_path ? (
							<View style={styles.noImage}></View>
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
						{person?.birthday && (
							<StyledText style={styles.birthPlaceLabel}>
								{person?.place_of_birth && (
									<StyledText>
										lieu de naissance{" "}
										<StyledText
											style={styles.birthPlaceValue}>
											{person?.place_of_birth}
										</StyledText>
									</StyledText>
								)}
							</StyledText>
						)}
						{person?.birthday && (
							<StyledText style={styles.ageText}>
								{person?.deathday
									? person?.deathday
									: convertDateToAge(
											person?.birthday
												? person?.birthday
												: ""
										)}{" "}
								<StyledText style={styles.ageUnit}>
									ans
								</StyledText>
							</StyledText>
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
