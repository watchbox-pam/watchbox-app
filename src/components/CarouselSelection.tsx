import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/src/styles/CarouselSelectionStyle";

// Radial animated menu with icon buttons
const RadialMenu = () => {
	const [open, setOpen] = useState(false);
	const animations = [0, 1, 2, 3, 4, 5, 6, 7].map(
		() => new Animated.Value(0)
	);

	// Toggle menu open/close with staggered animations
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

	// Button positions around the center (in a circle shape)
	const positions = [
		{ x: 0, y: -80 },
		{ x: 70, y: -40 },
		{ x: 70, y: 40 },
		{ x: 0, y: 80 },
		{ x: -70, y: 0 }
	];

	// Icon names (intended to be emotion labels or icons)
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
			{/* Render animated buttons */}
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
								name={icons[index]}
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

export default RadialMenu;
