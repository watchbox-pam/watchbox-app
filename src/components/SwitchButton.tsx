import { Pressable, Text, View } from "react-native";
import styles from "@/src/styles/SwitchButtonStyle";

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
					Tous les commentaires
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

export default SwitchButton;
