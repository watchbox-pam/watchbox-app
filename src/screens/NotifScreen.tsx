import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView
} from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import styles from "@/src/styles/NotifScreenStyle";

// Notification data type
interface Notification {
	id: number;
	message: string;
	read: boolean;
}

const NotifScreen: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([
		{ id: 1, message: "Nouveau message reçu", read: false },
		{ id: 2, message: "Mise à jour disponible", read: false },
		{ id: 3, message: "Votre ami a commenté votre post", read: true }
	]);

	// Mark a notification as read
	const markAsRead = (id: number) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === id ? { ...notif, read: true } : notif
			)
		);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.NotifTitle}>Notifications</Text>
				<Logo />
			</View>
			<FlatList
				data={notifications}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.notification,
							item.read && styles.readNotification
						]}
						onPress={() => markAsRead(item.id)}>
						<Text style={styles.message}>{item.message}</Text>
					</TouchableOpacity>
				)}
			/>
		</ScrollView>
	);
};

export default NotifScreen;
