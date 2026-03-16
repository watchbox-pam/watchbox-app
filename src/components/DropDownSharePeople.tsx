import React, { useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import styles from "@/src/styles/DropDownSharePeopleStyle";

const DropDownPlaylist = () => {
	const [visible, setVisible] = useState(false);
	const buttonRef = useRef<View>(null);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const onShare = async () => {
		// try {
		// 	const shareMessage = movieTitle
		// 		? `Je te recommande de regarder "${movieTitle}" sur WatchBox!`
		// 		: "Découvre ce film sur WatchBox!";
		// 	const result = await Share.share({
		// 		message: shareMessage
		// 		//  + `\n\nRegarde-le ici: https://watchbox.com/movies/${movieId}`
		// 	});
		// 	if (result.action === Share.sharedAction) {
		// 		// Partage réussi
		// 	} else if (result.action === Share.dismissedAction) {
		// 		// Partage annulé
		// 	}
		// } catch (error: any) {
		// 	Alert.alert("Erreur", error.message);
		// }
	};

	return (
		<View style={styles.container}>
			<View ref={buttonRef}>
				<TouchableOpacity style={styles.button}>
					<IconButton
						icon="dots-vertical"
						size={24}
						onPress={openMenu}
						iconColor="#FFFFFF"
					/>
				</TouchableOpacity>
			</View>

			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={{ x: 0, y: 0 }}
				contentStyle={styles.menuContent}>
				<Menu.Item
					onPress={() => {
						closeMenu();
						onShare();
					}}
					title="Partager"
					leadingIcon="share-variant"
					style={styles.menuItem}
					titleStyle={styles.menuItemTitle}
					contentStyle={styles.menuItemContent}
				/>
			</Menu>
		</View>
	);
};

export default DropDownPlaylist;
