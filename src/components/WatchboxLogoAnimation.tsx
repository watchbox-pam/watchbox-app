import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing, Image } from "react-native";

export default function WatchboxLogoAnimation() {
	const scaleAnim = useRef(new Animated.Value(4)).current; // ← Commence ÉNORME
	const rotateAnim = useRef(new Animated.Value(0)).current;
	const opacityAnim = useRef(new Animated.Value(0)).current;
	const glowAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Phase 1 : Le logo géant apparaît et rétrécit en tournant
		Animated.sequence([
			Animated.parallel([
				// Apparition
				Animated.timing(opacityAnim, {
					toValue: 1,
					duration: 400,
					easing: Easing.out(Easing.ease),
					useNativeDriver: true
				}),
				// Rétrécissement + rotation simultanés
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 1500,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true
				}),
				Animated.timing(rotateAnim, {
					toValue: 1,
					duration: 1500,
					easing: Easing.out(Easing.cubic),
					useNativeDriver: true
				})
			])

			// 	// Petit effet de brillance
			// 	Animated.sequence([
			// 		Animated.timing(glowAnim, {
			// 			toValue: 1,
			// 			duration: 300,
			// 			useNativeDriver: true
			// 		}),
			// 		Animated.timing(glowAnim, {
			// 			toValue: 0.3,
			// 			duration: 300,
			// 			useNativeDriver: true
			// 		})
			// 	])
			// ]).start(() => {
			// 	// Phase 2 : Continue de tourner en boucle (rotation infinie)
			// 	Animated.loop(
			// 		Animated.timing(rotateAnim, {
			// 			toValue: 2,
			// 			duration: 2000,
			// 			easing: Easing.linear,
			// 			useNativeDriver: true
			// 		})
		]).start();
	}, []);

	const rotation = rotateAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: ["0deg", "360deg", "720deg"] // Continue après 360°
	});

	return (
		<View style={styles.container}>
			{/* Effet de glow en arrière-plan */}
			<Animated.View
				style={[
					styles.glowCircle,
					{
						opacity: Animated.multiply(glowAnim, 0.5),
						transform: [
							{ scale: Animated.multiply(scaleAnim, 1.2) }
						]
					}
				]}
			/>

			{/* Logo principal */}
			<Animated.View
				style={{
					opacity: opacityAnim,
					transform: [{ scale: scaleAnim }, { rotate: rotation }]
				}}>
				<Image
					source={require("@/src/assets/images/watchbox-logo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		width: 200,
		height: 200
	},
	logo: {
		width: 150,
		height: 150
	},
	glowCircle: {
		position: "absolute",
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: "#e74c3c",
		shadowColor: "#e74c3c",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.6,
		shadowRadius: 40,
		elevation: 20
	}
});
