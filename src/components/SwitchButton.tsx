import React = require("react");
import { Pressable, Text, View, StyleSheet } from "react-native";

interface SwitchButtonProps {
	isOn: boolean;
	onToggle: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ isOn, onToggle }) => {
	return (
		<View style={styles.switchContainer}>
			<Pressable
				onPress={onToggle}
				style={[
					styles.toggleButton,
					isOn ? styles.active : styles.inactive
				]}>
				<Text style={[styles.toggleText, isOn && styles.activeText]}>
					Mes Commentaires
				</Text>
			</Pressable>
			<Pressable
				onPress={onToggle}
				style={[
					styles.toggleButton,
					!isOn ? styles.active : styles.inactive
				]}>
				<Text style={[styles.toggleText, !isOn && styles.activeText]}>
					Commentaire de mes amis
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	switchContainer: {
		flexDirection: "row",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#143b71",
		width: "95%",
		marginHorizontal: "auto",
		alignItems: "center",
		paddingVertical: 7
	},
	toggleButton: {
		paddingVertical: 10,
		padding: 15,
		alignItems: "center",
		width: "45%",
		margin: "auto"
	},
	active: {
		backgroundColor: "#0A1E38",
		marginHorizontal: 10,
		borderRadius: 8
	},
	inactive: {
		backgroundColor: "#143b71"
	},
	toggleText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold"
	},
	activeText: {
		color: "#fff"
	}
});

export default SwitchButton;
