import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommentSection from "../components/CommentSection";
import SwitchButton from "../components/SwitchButton";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";

const CommentaryScreen = () => {
	const [isMyComments, setIsMyComments] = useState(true);

	const handleSwitch = () => {
		setIsMyComments((prevState) => !prevState);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.CommentTitle}>Commentaires</Text>
				<Logo />
			</View>
			<SwitchButton isOn={isMyComments} onToggle={handleSwitch} />
			<CommentSection isMyComments={isMyComments} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20
	},
	CommentTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	}
});

export default CommentaryScreen;
