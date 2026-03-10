import { useState } from "react";
import { View, TouchableOpacity, Alert, Share } from "react-native";
import { Menu, IconButton, Provider, Portal } from "react-native-paper";
import styles from "@/src/styles/DropDownSharePeopleStyle";

const DropDownShare = () => {
	const [visible, setVisible] = useState(false);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const onShare = async () => {
		try {
			const result = await Share.share({
				message:
					"React Native | A framework for building native apps using React"
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message);
		}
	};

	return (
		<Provider>
			<View style={styles.container}>
				<TouchableOpacity style={styles.button}>
					<IconButton
						icon="dots-vertical"
						size={24}
						onPress={openMenu}
						iconColor="#FFFFFF"
					/>
				</TouchableOpacity>

				<Portal>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={{ x: 50, y: 50 }}
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
				</Portal>
			</View>
		</Provider>
	);
};

export default DropDownShare;
