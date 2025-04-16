import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RadialMenu = () => {
	const [open, setOpen] = useState(false);
	const animations = [0, 1, 2, 3, 4, 5, 6, 7].map(
		() => new Animated.Value(0)
	);

	const toggleMenu = () => {
		const toValue = open ? 0 : 1;
		Animated.stagger(
			100,
			animations.map((anim) =>
				Animated.timing(anim, {
					toValue,
					duration: 300,
					useNativeDriver: true
				})
			)
		).start();
		setOpen(!open);
	};

	const positions = [
		{ x: 0, y: -80 }, // Haut
		{ x: 70, y: -40 }, // Haut droite
		{ x: 70, y: 40 }, // Bas droite
		{ x: 0, y: 80 }, // Bas
		{ x: -70, y: 0 } // Gauche
	];

	const icons = [
		"Frisson",
		"Excitation",
		"Émerveillement",
		"Rire",
		"Romantisme",
		"Mélancolie",
		"Réflexion",
		"Nostalgie"
	];

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#000"
			}}>
			{animations.map((anim, index) => {
				const translateX = anim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, positions[index].x]
				});
				const translateY = anim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, positions[index].y]
				});
				return (
					<Animated.View
						key={index}
						style={{
							position: "absolute",
							transform: [{ translateX }, { translateY }]
						}}>
						<TouchableOpacity style={styles.button}>
							<Ionicons
								na
								me={icons[index]}
								size={24}
								color="#fff"
							/>
						</TouchableOpacity>
					</Animated.View>
				);
			})}
			<TouchableOpacity style={styles.centerButton} onPress={toggleMenu}>
				<Ionicons
					name={open ? "close" : "add"}
					size={30}
					color="#fff"
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = {
	button: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#444",
		justifyContent: "center",
		alignItems: "center",
		margin: 5
	},
	centerButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#666",
		justifyContent: "center",
		alignItems: "center"
	}
};

export default RadialMenu;
