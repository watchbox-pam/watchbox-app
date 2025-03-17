import { View, Pressable, Text, Image } from "react-native";
import { useState } from "react";
import styles from "../styles/EmotionCircleStyle";

type EmotionCircleProps = {
	onEmotionSelect: (emotion: string) => void;
};

export default function EmotionCircle({ onEmotionSelect }: EmotionCircleProps) {
	const [pressedQuarters, setPressedQuarters] = useState({
		topLeft: false,
		topRight: false,
		bottomLeft: false,
		bottomRight: false
	});
	const [currentEmotion, setCurrentEmotion] = useState<string>("");

	const emotions = {
		topLeft: "JOIE",
		topRight: "TRISTE",
		bottomLeft: "COLERE",
		bottomRight: "PEUR"
	};

	const getQuarterStyle = (isPressed: boolean) => ({
		...styles.quarterBase,
		backgroundColor: isPressed ? "#143B6F" : "transparent",
		transform: [{ scale: isPressed ? 1.1 : 1 }],
		zIndex: isPressed ? 1 : 0
	});

	const handlePressIn = (emotion: keyof typeof emotions) => {
		setPressedQuarters((prev) => ({ ...prev, [emotion]: true }));
		setCurrentEmotion(emotions[emotion]);
	};

	const handlePressOut = (emotion: keyof typeof emotions) => {
		setPressedQuarters((prev) => ({ ...prev, [emotion]: false }));
		setCurrentEmotion("");
		onEmotionSelect(emotions[emotion]);
	};

	return (
		<View style={styles.container}>
			<Pressable
				onPressIn={() => handlePressIn("topLeft")}
				onPressOut={() => handlePressOut("topLeft")}
				style={{
					...styles.topLeft,
					...getQuarterStyle(pressedQuarters.topLeft)
				}}>
				<Image
					source={require("../assets/images/Sourire.png")}
					style={styles.emotionIcon}
				/>
			</Pressable>

			<Pressable
				onPressIn={() => handlePressIn("topRight")}
				onPressOut={() => handlePressOut("topRight")}
				style={{
					...styles.topRight,
					...getQuarterStyle(pressedQuarters.topRight)
				}}>
				<Image
					source={require("../assets/images/Triste.png")}
					style={styles.emotionIcon}
				/>
			</Pressable>

			<Pressable
				onPressIn={() => handlePressIn("bottomLeft")}
				onPressOut={() => handlePressOut("bottomLeft")}
				style={{
					...styles.bottomLeft,
					...getQuarterStyle(pressedQuarters.bottomLeft)
				}}>
				<Image
					source={require("../assets/images/Colere.png")}
					style={styles.emotionIcon}
				/>
			</Pressable>

			<Pressable
				onPressIn={() => handlePressIn("bottomRight")}
				onPressOut={() => handlePressOut("bottomRight")}
				style={{
					...styles.bottomRight,
					...getQuarterStyle(pressedQuarters.bottomRight)
				}}>
				<Image
					source={require("../assets/images/Peur.png")}
					style={styles.emotionIcon}
				/>
			</Pressable>

			<View style={styles.centerCircle}>
				<Text style={styles.centerText}>{currentEmotion}</Text>
			</View>
		</View>
	);
}
