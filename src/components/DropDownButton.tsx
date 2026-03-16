import React, { useState } from "react";
import { View } from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import { router } from "expo-router";
import useSessionStore from "@/src/zustand/sessionStore";
import styles from "../styles/DropDownButtonStyle";

const DropDownButton = () => {
	const [visible, setVisible] = useState(false);
	const signOut = useSessionStore((state) => state.signOut);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const handleNavigate = (screen: string) => {
		router.push(`/${screen.toLowerCase()}`);
		closeMenu();
	};

	const handleLogout = async () => {
		await signOut();
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
