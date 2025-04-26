import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { styles } from "../styles/PersonStyle";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import StyledText from "../components/StyledText";
import ReadMore from "../components/ReadMore";
import PersonMediaList from "../components/PersonMediaList";
import { fetchPerson } from "@/src/services/PersonService";
import { convertDateToAge, processCreditData } from "./utils/utils";

export default function PersonScreen() {
	const [loading, setLoading] = useState(true);
	const [person, setPerson] = useState<Person | undefined>(undefined);
	const [moviesCast, setMoviesCast] = useState<Media[] | undefined>(
		undefined
	);
	const [tvCast, setTvCast] = useState<Media[] | undefined>(undefined);
	const [moviesCrew, setMoviesCrew] = useState<Media[] | undefined>(
		undefined
	);
	const [tvCrew, setTvCrew] = useState<Media[] | undefined>(undefined);
	const { id }: { id: string } = useLocalSearchParams();

	useEffect(() => {
		(async () => {
			setLoading(true);
			let response = await fetchPerson(id);

			if (!response) {
				setLoading(false);
				return;
			}

			setPerson(response.data.person);

			const mediaTypes = [
				{ type: "movie", role: "cast", setter: setMoviesCast },
				{ type: "tv", role: "cast", setter: setTvCast },
				{ type: "movie", role: "crew", setter: setMoviesCrew },
				{ type: "tv", role: "crew", setter: setTvCrew }
			];

			// separates the media data into different categories
			processCreditData(response.data, mediaTypes);

			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (loading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	if (!person) {
		return (
			<View style={styles.loading}>
				<StyledText style={styles.noDataText}>
					Aucune donnée trouvée
				</StyledText>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} overScrollMode="never">
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
								lieu de naissance{" "}
								<StyledText style={styles.birthPlaceValue}>
									{person?.place_of_birth}
								</StyledText>
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
