import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Menu, Provider, Portal } from "react-native-paper";
import { router } from "expo-router";
import useSessionStore from "@/src/zustand/sessionStore";
import styles from "../styles/DropDownButtonStyle";
import Entypo from "@expo/vector-icons/Entypo";

const DropDownButton = () => {
	const [visible, setVisible] = useState(false);
	const signOut = useSessionStore((state) => state.signOut);

	const handleNavigate = (screen: string) => {
		router.push(`/${screen.toLowerCase()}` as any);
		setVisible(false);
	};

	const handleLogout = async () => {
		await signOut();
		setVisible(false);
	};

	return (
		<Menu
			visible={visible}
			onDismiss={() => setVisible(false)}
			style={styles.menu}
			anchor={
				<TouchableOpacity
					style={styles.trigger}
					onPress={() => setVisible(true)}>
					<Entypo
						name="dots-three-vertical"
						size={16}
						color="white"
					/>
				</TouchableOpacity>
			}>
			<Menu.Item
				onPress={() => handleNavigate("commentary")}
				title="Commentaires"
				leadingIcon="comment"
				titleStyle={styles.menuItem}
			/>
			<Menu.Item
				onPress={() => handleNavigate("notifs")}
				title="Notifications"
				leadingIcon="bell"
				titleStyle={styles.menuItem}
			/>
			<Menu.Item
				onPress={() => handleNavigate("friends")}
				title="Amis"
				leadingIcon="account-group"
				titleStyle={styles.menuItem}
			/>
			<Menu.Item
				onPress={() => handleNavigate("param")}
				title="Paramètres"
				leadingIcon="cog"
				titleStyle={styles.menuItem}
			/>
			<Menu.Item
				onPress={handleLogout}
				title="Déconnexion"
				leadingIcon="logout"
				titleStyle={styles.logoutText}
			/>
		</Menu>
	);
};

export default DropDownButton;
