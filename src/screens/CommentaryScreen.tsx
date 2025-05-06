import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CommentSection from "../components/CommentSection";
import SwitchButton from "../components/SwitchButton";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import styles from "@/src/styles/CommentaryStyle";
import { Link } from "expo-router";

const CommentaryScreen = ({ mediaId }: { mediaId: string }) => {
	const [isMyComments, setIsMyComments] = useState(true);

	const handleSwitch = () => {
		setIsMyComments((prevState) => !prevState);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{/*<BackButton />*/}
				<Text style={styles.CommentTitle}>Commentaires</Text>
				{/*<Logo />*/}
			</View>
			<Link
				style={styles.addComment}
				href={`/movie/${mediaId}/review`}></Link>
			<SwitchButton isOn={isMyComments} onToggle={handleSwitch} />
			<CommentSection isMyComments={isMyComments} />
		</View>
	);
};

export default CommentaryScreen;
