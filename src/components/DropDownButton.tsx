import React, { useState } from "react";
import { View, Platform } from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import { router } from "expo-router"; // Ajoute cet import
import useSessionStore from "@/src/zustand/sessionStore";
import * as SecureStore from "expo-secure-store";
import styles from "../styles/DropDownButtonStyle";

const DropDownButton = () => {
	const [visible, setVisible] = useState(false);
	const signOut = useSessionStore((state) => state.signOut);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	// Décommente et corrige cette fonction
	const handleNavigate = (screen: string) => {
		router.push(`/${screen.toLowerCase()}`); // ou router.replace si tu préfères
		closeMenu();
	};

	// Logout and clear stored user session
	const handleLogout = async () => {
		if (Platform.OS === "ios" || Platform.OS === "android") {
			await SecureStore.deleteItemAsync("id");
			await SecureStore.deleteItemAsync("identifier");
			await SecureStore.deleteItemAsync("token");
		} else {
			localStorage.removeItem("id");
			localStorage.removeItem("identifier");
			localStorage.removeItem("token");
		}

		signOut();
		closeMenu();
	};

	return (
		<Provider>
			<View style={styles.container}>
				<IconButton
					icon="dots-vertical"
					size={24}
					onPress={openMenu}
					iconColor="#FFFFFF"
				/>

				<Portal>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={{ x: 50, y: 50 }}
						style={styles.menu}>
						<Menu.Item
							onPress={() => handleNavigate("commentary")}
							title="Commentaires"
							leadingIcon="comment"
						/>
						<Menu.Item
							onPress={() => handleNavigate("notifs")}
							title="Notifications"
							leadingIcon="bell"
						/>
						<Menu.Item
							onPress={() => handleNavigate("friends")}
							title="Amis"
							leadingIcon="account-group"
						/>
						<Menu.Item
							onPress={() => handleNavigate("param")}
							title="Paramètres"
							leadingIcon="cog"
						/>
						<Menu.Item
							onPress={handleLogout}
							title="Déconnexion"
							leadingIcon="logout"
							titleStyle={styles.logoutText}
						/>
					</Menu>
				</Portal>
			</View>
		</Provider>
	);
};

export default DropDownButton;
