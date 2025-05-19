import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import { router } from "expo-router";
import useSessionStore from "@/src/zustand/sessionStore";
import * as SecureStore from "expo-secure-store";

const DropDownButton = () => {
	const [visible, setVisible] = useState(false);
	const signOut = useSessionStore((state) => state.signOut);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const handleNavigate = (screen: string) => {
		//navigation.navigate(screen);
		closeMenu();
	};

	const handleLogout = async () => {
		if (Platform.OS === "ios" || Platform.OS === "android") {
			await SecureStore.deleteItemAsync("currentUser");
		} else {
			localStorage.removeItem("currentUser");
		}

		signOut();
		closeMenu();
	};

	return (
		<Provider>
			<View style={styles.container}>
				{/* Bouton déclencheur */}
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
							onPress={() => handleNavigate("Commentary")}
							title="Commentaires"
							leadingIcon="comment"
						/>
						<Menu.Item
							onPress={() => handleNavigate("Notifications")}
							title="Notifications"
							leadingIcon="bell"
						/>
						<Menu.Item
							onPress={() => handleNavigate("Amis")}
							title="Amis"
							leadingIcon="account-group"
						/>
						<Menu.Item
							onPress={() => handleNavigate("Parametre")}
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

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 20,
		left: 40,
		zIndex: 200
	},
	menu: {
		position: "absolute",
		backgroundColor: "#313131",
		top: 10,
		left: -110,
		zIndex: 500
	},
	logoutText: {
		color: "#FF6B6B"
	}
});

export default DropDownButton;
