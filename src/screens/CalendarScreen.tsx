import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Animated,
	PanResponder,
	Image
} from "react-native";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import IconProfil from "../components/IconProfile";
import styles from "@/src/styles/CalendarScreenStyle";

const CalendarScreen: React.FC = () => {
	const router = useRouter();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const pan = useRef(new Animated.Value(0)).current;

	// Mois précédent
	const goToPreviousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		);
	};

	// Mois suivant
	const goToNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		);
	};

	// PanResponder pour le swipe
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => false,
			onMoveShouldSetPanResponder: (_, gestureState) => {
				// Active le swipe seulement si mouvement horizontal significatif
				return (
					Math.abs(gestureState.dx) > 20 &&
					Math.abs(gestureState.dy) < Math.abs(gestureState.dx)
				);
			},
			onPanResponderMove: (_, gestureState) => {
				// Limite le mouvement pour un meilleur effet visuel
				pan.setValue(gestureState.dx * 0.5);
			},
			onPanResponderRelease: (_, gestureState) => {
				// Détection du swipe avec seuil plus bas
				if (gestureState.dx > 80) {
					// Swipe vers la droite = mois précédent
					Animated.timing(pan, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true
					}).start(() => {
						goToPreviousMonth();
					});
				} else if (gestureState.dx < -80) {
					// Swipe vers la gauche = mois suivant
					Animated.timing(pan, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true
					}).start(() => {
						goToNextMonth();
					});
				} else {
					// Retour à la position initiale si swipe incomplet
					Animated.spring(pan, {
						toValue: 0,
						useNativeDriver: true,
						friction: 7
					}).start();
				}
			},
			onPanResponderTerminate: () => {
				// Réinitialise en cas d'interruption
				Animated.spring(pan, {
					toValue: 0,
					useNativeDriver: true
				}).start();
			}
		})
	).current;

	// Obtenir le nombre de jours dans un mois
	const getDaysInMonth = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date: Date) => {
		const firstDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			1
		).getDay();
		return firstDay === 0 ? 6 : firstDay - 1;
	};

	// Sélectionner une date
	const selectDate = (day: number) => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day
		);
		setSelectedDate(newDate);
	};

	// Vérifier si c'est aujourd'hui
	const isToday = (day: number) => {
		const today = new Date();
		return (
			day === today.getDate() &&
			currentDate.getMonth() === today.getMonth() &&
			currentDate.getFullYear() === today.getFullYear()
		);
	};

	// Vérifier si c'est la date sélectionnée
	const isSelected = (day: number) => {
		if (!selectedDate) return false;
		return (
			day === selectedDate.getDate() &&
			currentDate.getMonth() === selectedDate.getMonth() &&
			currentDate.getFullYear() === selectedDate.getFullYear()
		);
	};

	// Générer le calendrier
	const renderCalendar = () => {
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDay = getFirstDayOfMonth(currentDate);
		const days = [];

		// Cellules vides avant le premier jour du mois
		for (let i = 0; i < firstDay; i++) {
			days.push(
				<View key={`empty-${i}`} style={styles.emptyDay}>
					<Text></Text>
				</View>
			);
		}

		// Jours du mois
		for (let day = 1; day <= daysInMonth; day++) {
			const isCurrentDay = isToday(day);
			const isSelectedDay = isSelected(day);

			days.push(
				<TouchableOpacity
					key={day}
					style={[
						styles.dayCell,
						isCurrentDay && styles.today,
						isSelectedDay && styles.selectedDay
					]}
					onPress={() => selectDate(day)}>
					<Text
						style={[
							styles.dayText,
							isCurrentDay && styles.todayText,
							isSelectedDay && styles.selectedDayText
						]}>
						{day}
					</Text>
					{/* Indicateur d'événement (optionnel) */}
					{day % 5 === 0 && <View style={styles.eventDot} />}
				</TouchableOpacity>
			);
		}

		return days;
	};

	// Noms des mois
	const monthNames = [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre"
	];

	// Noms des jours
	const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

	const movie = {
		id: 1,
		title: "Avengers 5",
		poster_path: "/path/to/poster.jpg",
		vote_average: 8.5
	};

	function addToWatchlist(id: number): void {
		throw new Error("Function not implemented.");
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.CalendarTitle}>Calendrier</Text>
				<IconProfil />
			</View>

			<TouchableOpacity
				style={styles.todayButton}
				onPress={() => {
					setCurrentDate(new Date());
					setSelectedDate(new Date());
				}}>
				<Text style={styles.todayButtonText}>Aujourd'hui</Text>
			</TouchableOpacity>

			{/* Navigation du mois */}
			<View style={styles.monthNavigation}>
				<IconButton
					icon="chevron-left"
					size={28}
					iconColor="#FFFFFF"
					onPress={goToPreviousMonth}
				/>
				<Text style={styles.monthYearText}>
					{monthNames[currentDate.getMonth()]}{" "}
					{currentDate.getFullYear()}
				</Text>
				<IconButton
					icon="chevron-right"
					size={28}
					iconColor="#FFFFFF"
					onPress={goToNextMonth}
				/>
			</View>

			{/* Calendrier avec swipe */}
			<Animated.View
				{...panResponder.panHandlers}
				style={[
					styles.calendarContainer,
					{
						transform: [{ translateX: pan }]
					}
				]}>
				{/* En-têtes des jours */}
				<View style={styles.weekDaysContainer}>
					{dayNames.map((day) => (
						<View key={day} style={styles.weekDayCell}>
							<Text style={styles.weekDayText}>{day}</Text>
						</View>
					))}
				</View>

				{/* Grille du calendrier */}
				<View style={styles.daysGrid}>{renderCalendar()}</View>
			</Animated.View>

			{/* Section des événements pour le jour sélectionné */}
			{selectedDate && (
				<View style={styles.eventsSection}>
					<Text style={styles.eventsSectionTitle}>
						Événements du{" "}
						{selectedDate.toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
							year: "numeric"
						})}
					</Text>

					{/* Liste des événements (exemple) */}
					<View style={styles.eventCard}>
						<Text style={styles.eventTime}>20:00</Text>
						<View style={styles.eventDetails}>
							<Text style={styles.eventTitle}>
								Sortie de "Avengers 5"
							</Text>
							<Text style={styles.eventDescription}>
								Au cinéma
							</Text>
						</View>
						<TouchableOpacity
							onPress={() => addToWatchlist(movie.id)}>
							<IconButton
								icon="bookmark-plus"
								size={20}
								iconColor="#FFD700"
							/>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={styles.eventCard}
						onPress={() => router.push(`/movie/${movie.id}`)}>
						<Image
							source={{
								uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}`
							}}
							style={styles.eventPoster}
						/>
						<View style={styles.eventDetails}>
							<Text style={styles.eventTitle}>{movie.title}</Text>
							<View style={styles.eventMeta}>
								<Text style={styles.eventRating}>
									⭐ {movie.vote_average.toFixed(1)}
								</Text>
								<Text style={styles.eventGenre}>
									Action • Aventure
								</Text>
							</View>
						</View>
						<IconButton
							icon="chevron-right"
							size={20}
							iconColor="#888"
						/>
					</TouchableOpacity>

					<View style={styles.eventCard}>
						<Text style={styles.eventTime}>21:30</Text>
						<View style={styles.eventDetails}>
							<Text style={styles.eventTitle}>
								Nouvelle saison de "Stranger Things"
							</Text>
							<Text style={styles.eventDescription}>
								Sur Netflix
							</Text>
						</View>
					</View>

					{/* Message si aucun événement */}
					<View style={styles.noEvents}>
						<Text style={styles.noEventsText}>
							Aucun événement ce jour
						</Text>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default CalendarScreen;
