import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DropDownButton = () => {
	const [visible, setVisible] = useState(false);
	const navigation = useNavigation();

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const handleNavigate = (screen: string) => {
		//navigation.navigate(screen);
		closeMenu();
	};

	return (
		<Provider>
			<View style={styles.container}>
				{/* Bouton déclencheur */}
				<IconButton icon="dots-vertical" size={24} onPress={openMenu} />

				{/* Le menu s'affiche en haut de tout */}
				<Portal>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={{ x: 50, y: 50 }} // Position fixe en haut
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
		zIndex: 3
	},
	menu: {
		position: "absolute",
		backgroundColor: "#313131",
		top: 10,
		left: -110,
		zIndex: 4
	}
});

export default DropDownButton;
