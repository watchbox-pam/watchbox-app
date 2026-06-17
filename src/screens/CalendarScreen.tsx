import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Modal,
	TextInput,
	Pressable
} from "react-native";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	runOnJS
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import CadrePublicitaire from "../components/CadrePublicitaire";
import styles from "@/src/styles/CalendarScreenStyle";
import Toast from "react-native-toast-message";

const STORAGE_KEY = "calendar_events";

const MONTH_NAMES = [
	"Janvier ",
	"Février ",
	"Mars ",
	"Avril ",
	"Mai ",
	"Juin ",
	"Juillet ",
	"Août ",
	"Septembre ",
	"Octobre ",
	"Novembre ",
	"Décembre "
];
const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface Event {
	id: string;
	date: string;
	time: string;
	title: string;
	description: string;
	// type?: "movie" | "show" | "custom";
	// movieData?: {
	// 	id: number;
	// 	title: string;
	// 	poster_path: string;
	// 	vote_average: number;
	// };
}

function formatDate(date: Date): string {
	return `${String(date.getDate()).padStart(2, "0")}-${String(
		date.getMonth() + 1
	).padStart(2, "0")}-${date.getFullYear()}`;
}

export default function CalendarScreen() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [events, setEvents] = useState<Event[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [newEvent, setNewEvent] = useState({
		time: "",
		title: "",
		description: ""
	});

	const translateX = useSharedValue(0);

	// Chargement AsyncStorage
	useEffect(() => {
		AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
			if (raw) setEvents(JSON.parse(raw));
		});
	}, []);

	const saveEvents = useCallback(async (updated: Event[]) => {
		setEvents(updated);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	}, []);

	// Mois précédent
	const goToPrev = useCallback(() => {
		setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
	}, []);

	// Mois suivant
	const goToNext = useCallback(() => {
		setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
	}, []);

	const SwipeGesture = useMemo(
		() =>
			Gesture.Pan()
				.activeOffsetX([-20, 20])
				.failOffsetY([-10, 10])
				.onUpdate((e) => {
					translateX.value = e.translationX * 0.2;
				})
				.onEnd((e) => {
					if (e.translationX < -50) {
						runOnJS(goToNext)();
					} else if (e.translationX > 50) {
						runOnJS(goToPrev)();
					}
					translateX.value = withSpring(0, { damping: 20 });
				}),
		[goToNext, goToPrev]
	);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }]
	}));

	// helpers calendrier
	const getDaysInMonth = (d: Date) =>
		new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
	const getFirstDay = (d: Date) => {
		const fd = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
		return fd === 0 ? 6 : fd - 1;
	};

	const isToday = (day: number) => {
		const t = new Date();
		return (
			day === t.getDate() &&
			currentDate.getMonth() === t.getMonth() &&
			currentDate.getFullYear() === t.getFullYear()
		);
	};

	// Sélectionner une date
	const isSelected = (day: number) =>
		!!selectedDate &&
		day === selectedDate.getDate() &&
		currentDate.getMonth() === selectedDate.getMonth() &&
		currentDate.getFullYear() === selectedDate.getFullYear();

	const hasEvents = (day: number) => {
		const str = formatDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
		);
		return events.some((e) => e.date === str);
	};

	const getEventsForDay = (date: Date) =>
		events.filter((e) => e.date === formatDate(date));

	// Créer un nouvel événement
	const createEvent = async () => {
		if (!selectedDate || !newEvent.title.trim()) {
			Toast.show({
				type: "error",
				text1: "Titre requis"
			});
			return;
		}
		const updated = [
			...events,
			{
				id: Date.now().toString(),
				date: formatDate(selectedDate),
				time: newEvent.time,
				title: newEvent.title,
				description: newEvent.description
			}
		];
		await saveEvents(updated);
		setModalVisible(false);
		setNewEvent({ time: "", title: "", description: "" });
	};

	// supprimer un événement
	const deleteEvent = async (id: string) => {
		await saveEvents(events.filter((e) => e.id !== id));
	};

	// Générer le calendrier
	const renderDays = () => {
		const days = [];
		const total = getDaysInMonth(currentDate);
		const first = getFirstDay(currentDate);

		// Cellules vides avant le premier jour du mois
		for (let i = 0; i < first; i++) {
			days.push(<View key={`e-${i}`} style={styles.dayCell} />);
		}

		// Jours du mois
		for (let day = 1; day <= total; day++) {
			const today = isToday(day);
			const selected = isSelected(day);
			const dot = hasEvents(day);
			days.push(
				<TouchableOpacity
					key={day}
					style={[
						styles.dayCell,
						today && styles.today,
						selected && styles.selectedDay
					]}
					onPress={() =>
						setSelectedDate(
							new Date(
								currentDate.getFullYear(),
								currentDate.getMonth(),
								day
							)
						)
					}>
					<Text
						style={[
							styles.dayText,
							today && styles.todayText,
							selected && !today && styles.selectedDayText
						]}>
						{day}
					</Text>
					{/* Indicateur d'événement (optionnel) */}
					{dot && (
						<View
							style={[
								styles.eventDot,
								today && { backgroundColor: "#ffffff" }
							]}
						/>
					)}
				</TouchableOpacity>
			);
		}
		return days;
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}>
				{/* Navigation du mois */}
				<View style={styles.monthNavigation}>
					<TouchableOpacity onPress={goToPrev} style={styles.navBtn}>
						<Ionicons name="chevron-back" size={20} color="#fff" />
					</TouchableOpacity>
					<Text style={styles.monthYearText}>
						{MONTH_NAMES[currentDate.getMonth()]}
						{currentDate.getFullYear()}
					</Text>
					<TouchableOpacity onPress={goToNext} style={styles.navBtn}>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#fff"
						/>
					</TouchableOpacity>
				</View>

				{/* Calendrier avec swipe */}
				<GestureDetector gesture={SwipeGesture}>
					<Animated.View
						style={[styles.calendarContainer, animatedStyle]}>
						{/* En-têtes des jours */}
						<View style={styles.weekDaysContainer}>
							{DAY_NAMES.map((d) => (
								<View key={d} style={styles.weekDayCell}>
									<Text style={styles.weekDayText}>{d}</Text>
								</View>
							))}
						</View>
						{/* Grille du calendrier */}
						<View style={styles.daysGrid}>{renderDays()}</View>
					</Animated.View>
				</GestureDetector>

				{/* <CadrePublicitaire
				title="🎬 Streaming Premium"
				description="Profitez de 30 jours gratuits sur toutes les plateformes"
				imageUrl="https://via.placeholder.com/150"
				link="https://example.com"
			/> */}

				{/* Bouton Aujourd'hui */}
				<TouchableOpacity
					style={styles.todayButton}
					onPress={() => {
						setCurrentDate(new Date());
						setSelectedDate(new Date());
					}}>
					<Text style={styles.todayButtonText}>Aujourd'hui</Text>
				</TouchableOpacity>

				{/* Section des événements pour le jour sélectionné */}
				{selectedDate && (
					<View style={styles.eventsSection}>
						<View style={styles.eventsSectionHeader}>
							<Text style={styles.eventsSectionTitle}>
								{selectedDate.toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "long",
									year: "numeric"
								})}
							</Text>
							<TouchableOpacity
								style={styles.addEventButton}
								onPress={() => {
									if (!selectedDate) {
										Toast.show({
											type: "error",
											text1: "Veuillez sélectionner une date"
										});
										return;
									}
									setModalVisible(true);
								}}>
								<Ionicons
									name="add"
									size={20}
									color="#1E90FF"
								/>
							</TouchableOpacity>
						</View>

						{/* Liste des événements */}
						{getEventsForDay(selectedDate).length === 0 ? (
							<Text style={styles.noEventsText}>
								Aucun événement ce jour
							</Text>
						) : (
							getEventsForDay(selectedDate).map((event) => (
								<View key={event.id} style={styles.eventCard}>
									<View style={styles.eventLeftBar} />
									<View style={styles.eventDetails}>
										{event.time ? (
											<Text style={styles.eventTime}>
												{event.time}
											</Text>
										) : null}
										<Text style={styles.eventTitle}>
											{event.title}
										</Text>
										{event.description ? (
											<Text
												style={styles.eventDescription}>
												{event.description}
											</Text>
										) : null}
									</View>
									<TouchableOpacity
										onPress={() => deleteEvent(event.id)}
										style={styles.deleteBtn}>
										<Ionicons
											name="trash-outline"
											size={16}
											color="#FF4444"
										/>
									</TouchableOpacity>
								</View>
							))
						)}
					</View>
				)}
			</ScrollView>

			{/* Modal de création d'événement */}
			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setModalVisible(false)}>
					<Pressable
						style={styles.modalSheet}
						onPress={(e) => e.stopPropagation()}>
						<View style={styles.modalHandle} />
						<Text style={styles.modalTitle}>Nouvel événement</Text>
						<Text style={styles.inputLabel}>Heure (HH:MM)</Text>
						<TextInput
							style={styles.input}
							placeholder="Ex: 14:30"
							placeholderTextColor="rgba(255,255,255,0.25)"
							value={newEvent.time}
							onChangeText={(t) =>
								setNewEvent({ ...newEvent, time: t })
							}
							keyboardType="numbers-and-punctuation"
						/>
						<Text style={styles.inputLabel}>Titre</Text>
						<TextInput
							style={styles.input}
							placeholder="Titre de l'événement"
							placeholderTextColor="rgba(255,255,255,0.25)"
							value={newEvent.title}
							onChangeText={(t) =>
								setNewEvent({ ...newEvent, title: t })
							}
							autoFocus
						/>
						<Text style={styles.inputLabel}>Description</Text>
						<TextInput
							style={[styles.input, { height: 80 }]}
							placeholder="Description (optionnelle)"
							placeholderTextColor="rgba(255,255,255,0.25)"
							value={newEvent.description}
							onChangeText={(t) =>
								setNewEvent({ ...newEvent, description: t })
							}
							multiline
						/>
						<View style={styles.modalButtons}>
							<Pressable
								style={styles.btnCancel}
								onPress={() => setModalVisible(false)}>
								<Text style={styles.btnCancelText}>
									Annuler
								</Text>
							</Pressable>
							<Pressable
								style={styles.btnConfirm}
								onPress={createEvent}>
								<Text style={styles.btnConfirmText}>Créer</Text>
							</Pressable>
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</GestureHandlerRootView>
	);
}
