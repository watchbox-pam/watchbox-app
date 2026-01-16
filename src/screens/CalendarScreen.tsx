import React, { useState, useRef, useMemo, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Animated,
	PanResponder,
	Modal,
	TextInput,
	Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import IconProfil from "../components/IconProfile";
import styles from "@/src/styles/CalendarScreenStyle";

interface TimePickerModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: (time: string) => void;
	initialTime?: string;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
	visible,
	onClose,
	onConfirm,
	initialTime = ""
}) => {
	const [time, setTime] = useState(new Date());

	const handleConfirm = () => {
		const hours = String(time.getHours()).padStart(2, "0");
		const minutes = String(time.getMinutes()).padStart(2, "0");
		onConfirm(`${hours}:${minutes}`);
		onClose();
	};

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Sélectionner l'heure</Text>
					<DateTimePicker
						value={time}
						mode="time"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						onChange={(event, selectedTime) => {
							if (selectedTime) setTime(selectedTime);
						}}
					/>
					<TouchableOpacity
						style={styles.createButton}
						onPress={handleConfirm}>
						<Text style={styles.createButtonText}>Confirmer</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.createButton,
							{ backgroundColor: "#666" }
						]}
						onPress={onClose}>
						<Text style={styles.createButtonText}>Annuler</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

interface Event {
	id: string;
	date: string;
	time: string;
	title: string;
	description: string;
	type?: "movie" | "show" | "custom";
	movieData?: {
		id: number;
		title: string;
		poster_path: string;
		vote_average: number;
	};
}

const CalendarScreen: React.FC = () => {
	const router = useRouter();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [events, setEvents] = useState<Event[]>([]);
	const [showEventModal, setShowEventModal] = useState(false);
	const [newEvent, setNewEvent] = useState({
		time: "",
		title: "",
		description: ""
	});
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [tempHour, setTempHour] = useState("12");
	const [tempMinute, setTempMinute] = useState("00");
	const pan = useRef(new Animated.Value(0)).current;
	const currentDateRef = useRef(currentDate);
	currentDateRef.current = currentDate;

	// Mois précédent
	const goToPreviousMonth = useCallback(() => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		);
	}, [currentDate]);

	// Mois suivant
	const goToNextMonth = useCallback(() => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		);
	}, [currentDate]);

	// PanResponder pour le swipe
	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => true,
				onStartShouldSetPanResponderCapture: () => false,
				onMoveShouldSetPanResponder: (_, gestureState) => {
					return (
						Math.abs(gestureState.dx) > 10 &&
						Math.abs(gestureState.dy) < Math.abs(gestureState.dx)
					);
				},
				onMoveShouldSetPanResponderCapture: (_, gestureState) => {
					return Math.abs(gestureState.dx) > 10;
				},
				onPanResponderMove: (_, gestureState) => {
					pan.setValue(gestureState.dx * 0.3);
				},
				onPanResponderRelease: (_, gestureState) => {
					if (
						gestureState.dx > 50 &&
						Math.abs(gestureState.vx) > 0.3
					) {
						// Swipe vers la droite = mois précédent
						Animated.timing(pan, {
							toValue: 400,
							duration: 300,
							useNativeDriver: true
						}).start(() => {
							pan.setValue(0);
							goToPreviousMonth();
						});
					} else if (
						gestureState.dx < -50 &&
						Math.abs(gestureState.vx) > 0.3
					) {
						// Swipe vers la gauche = mois suivant
						Animated.timing(pan, {
							toValue: -400,
							duration: 300,
							useNativeDriver: true
						}).start(() => {
							pan.setValue(0);
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
					Animated.spring(pan, {
						toValue: 0,
						useNativeDriver: true
					}).start();
				}
			}),
		[pan, goToPreviousMonth, goToNextMonth]
	);

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

	// Verifie si un jour a des événements
	const hasEvents = (day: number) => {
		const dateStr = formatDateToString(
			new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
		);
		return events.some((event) => event.date === dateStr);
	};

	// Formater une date string "YYYY-MM-DD" en "DD-MM-YYYY"
	const formatDateToString = (date: Date) => {
		return `${String(date.getDate()).padStart(2, "0")}-${String(
			date.getMonth() + 1
		).padStart(2, "0")}-${date.getFullYear()}`;
	};

	//Récuperer des evenements pour une date donnée
	const getEventsForDate = (date: Date) => {
		const dateStr = formatDateToString(date);
		return events.filter((event) => event.date === dateStr);
	};

	// ouvrir le modal pour créer un événement
	const openCreateEventModal = () => {
		if (!selectedDate) {
			alert("Veuillez sélectionner une date pour ajouter un événement.");
			return;
		}
		setNewEvent({ time: "", title: "", description: "" });
		setShowEventModal(true);
	};

	// Créer un nouvel événement
	const createEvent = () => {
		if (!selectedDate || !newEvent.title) {
			alert("Veuillez remplir au moins le titre");
			return;
		}
		const event: Event = {
			id: Date.now().toString(),
			date: formatDateToString(selectedDate),
			time: newEvent.time,
			title: newEvent.title,
			description: newEvent.description,
			type: "custom"
		};
		setEvents([...events, event]);
		setShowEventModal(false);
		setNewEvent({ time: "", title: "", description: "" });
	};

	// supprimer un événement
	const deleteEvent = (eventId: string) => {
		setEvents(events.filter((event) => event.id !== eventId));
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
					{hasEvents(day) ? <View style={styles.eventDot} /> : null}
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
					<View style={styles.eventsSectionHeader}>
						<Text style={styles.eventsSectionTitle}>
							Événements du{" "}
							{selectedDate.toLocaleDateString("fr-FR", {
								day: "numeric",
								month: "long",
								year: "numeric"
							})}
						</Text>
						<TouchableOpacity
							style={styles.addEventButton}
							onPress={openCreateEventModal}>
							<IconButton
								icon="plus"
								size={24}
								iconColor="#FFFFFF"
							/>
						</TouchableOpacity>
					</View>

					{/* Liste des événements */}
					{getEventsForDate(selectedDate).length > 0 ? (
						getEventsForDate(selectedDate).map((event) => (
							<View key={event.id} style={styles.eventCard}>
								{event.time && (
									<Text style={styles.eventTime}>
										{event.time}
									</Text>
								)}
								<View style={styles.eventDetails}>
									<Text style={styles.eventTitle}>
										{event.title}
									</Text>
									{event.description && (
										<Text style={styles.eventDescription}>
											{event.description}
										</Text>
									)}
								</View>
								<TouchableOpacity
									onPress={() => deleteEvent(event.id)}>
									<IconButton
										icon="delete"
										size={20}
										iconColor="#FF4444"
									/>
								</TouchableOpacity>
							</View>
						))
					) : (
						<View style={styles.noEvents}>
							<Text style={styles.noEventsText}>
								Aucun événement ce jour
							</Text>
						</View>
					)}
				</View>
			)}

			{/* Modal de création d'événement */}
			<Modal
				visible={showEventModal}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setShowEventModal(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>
								Créer un événement
							</Text>
							<TouchableOpacity
								onPress={() => setShowEventModal(false)}>
								<IconButton
									icon="close"
									size={24}
									iconColor="#FFFFFF"
								/>
							</TouchableOpacity>
						</View>

						<Text style={styles.inputLabel}>Heure (Optionnel)</Text>
						<TouchableOpacity
							style={styles.input}
							onPress={() => setShowTimePicker(true)}>
							<Text
								style={[
									styles.inputText,
									!newEvent.time && { color: "#888" }
								]}>
								{newEvent.time || "Choisir une heure"}
							</Text>
						</TouchableOpacity>

						{/* Modal Time Picker personnalisé */}
						<Modal
							visible={showTimePicker}
							animationType="fade"
							transparent={true}
							onRequestClose={() => setShowTimePicker(false)}>
							<View style={styles.timePickerOverlay}>
								<View style={styles.timePickerModal}>
									<Text style={styles.timePickerTitle}>
										Choisir l'heure
									</Text>

									<View style={styles.timePickerContainer}>
										{/* Heures */}
										<View style={styles.timeInputWrapper}>
											<TextInput
												style={styles.timeInput}
												value={tempHour}
												onChangeText={(text) => {
													const num =
														parseInt(text) || 0;
													if (num >= 0 && num <= 23) {
														setTempHour(
															String(
																num
															).padStart(2, "0")
														);
													}
												}}
												keyboardType="number-pad"
												maxLength={2}
												selectTextOnFocus
											/>
											<Text style={styles.timeLabel}>
												H
											</Text>
										</View>

										<Text style={styles.timeSeparator}>
											:
										</Text>

										{/* Minutes */}
										<View style={styles.timeInputWrapper}>
											<TextInput
												style={styles.timeInput}
												value={tempMinute}
												onChangeText={(text) => {
													const num =
														parseInt(text) || 0;
													if (num >= 0 && num <= 59) {
														setTempMinute(
															String(
																num
															).padStart(2, "0")
														);
													}
												}}
												keyboardType="number-pad"
												maxLength={2}
												selectTextOnFocus
											/>
											<Text style={styles.timeLabel}>
												M
											</Text>
										</View>
									</View>

									{/* Boutons de raccourci */}
									<View style={styles.quickTimeButtons}>
										<TouchableOpacity
											style={styles.quickTimeButton}
											onPress={() => {
												setTempHour("08");
												setTempMinute("00");
											}}>
											<Text style={styles.quickTimeText}>
												08:00
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.quickTimeButton}
											onPress={() => {
												setTempHour("12");
												setTempMinute("00");
											}}>
											<Text style={styles.quickTimeText}>
												12:00
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.quickTimeButton}
											onPress={() => {
												setTempHour("18");
												setTempMinute("00");
											}}>
											<Text style={styles.quickTimeText}>
												18:00
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.quickTimeButton}
											onPress={() => {
												setTempHour("20");
												setTempMinute("00");
											}}>
											<Text style={styles.quickTimeText}>
												20:00
											</Text>
										</TouchableOpacity>
									</View>

									{/* Boutons d'action */}
									<View style={styles.timePickerActions}>
										<TouchableOpacity
											style={
												styles.timePickerCancelButton
											}
											onPress={() =>
												setShowTimePicker(false)
											}>
											<Text
												style={
													styles.timePickerCancelText
												}>
												Annuler
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={
												styles.timePickerConfirmButton
											}
											onPress={() => {
												setNewEvent({
													...newEvent,
													time: `${tempHour}:${tempMinute}`
												});
												setShowTimePicker(false);
											}}>
											<Text
												style={
													styles.timePickerConfirmText
												}>
												Confirmer
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Modal>

						<Text style={styles.inputLabel}>Titre</Text>
						<TextInput
							style={styles.input}
							placeholder="Titre de l'événement"
							placeholderTextColor="#888"
							value={newEvent.title}
							onChangeText={(text) =>
								setNewEvent({ ...newEvent, title: text })
							}
						/>

						<Text style={styles.inputLabel}>
							Description (Optionnel)
						</Text>
						<TextInput
							style={styles.input}
							placeholder="Description de l'événement"
							placeholderTextColor="#888"
							value={newEvent.description}
							onChangeText={(text) =>
								setNewEvent({
									...newEvent,
									description: text
								})
							}
						/>
					</View>

					<TouchableOpacity
						style={styles.createButton}
						onPress={createEvent}>
						<Text style={styles.createButtonText}>
							Créer l'événement
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</ScrollView>
	);
};

export default CalendarScreen;
