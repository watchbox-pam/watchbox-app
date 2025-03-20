import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#0A1E38"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	NotifTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	notification: {
		padding: 15,
		marginVertical: 5,
		backgroundColor: "#64a2f9",
		borderRadius: 8
	},
	readNotification: {
		backgroundColor: "#326bbb"
	},
	message: {
		fontSize: 16
	}
});

export default NotifScreen;
