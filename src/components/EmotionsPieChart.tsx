import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Emotion {
	id: number;
	label: string;
	value: string;
	startAngle: number;
	endAngle: number;
	color: string;
}

interface EmotionsPieChartProps {
	emotions: Emotion[];
	selectedEmotion: Emotion | null;
	onSelectEmotion: (emotion: Emotion) => void;
	size: number;
	wheelOpacity: Animated.Value;
}

const EmotionsPieChart: React.FC<EmotionsPieChartProps> = ({
	emotions,
	selectedEmotion,
	onSelectEmotion,
	size,
	wheelOpacity
}) => {
	const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);
	const radius = size / 2;
	const darkBlue = "#0a1a2a";

	const createSectorPath = (emotion: Emotion) => {
		const startAngle = emotion.startAngle;
		const endAngle = emotion.endAngle;

		const startRad = ((startAngle - 90) * Math.PI) / 180;
		const endRad = ((endAngle - 90) * Math.PI) / 180;

		const x1 = radius + radius * Math.cos(startRad);
		const y1 = radius + radius * Math.sin(startRad);
		const x2 = radius + radius * Math.cos(endRad);
		const y2 = radius + radius * Math.sin(endRad);

		const sectorSize = endAngle - startAngle;
		const largeArcFlag = sectorSize <= 180 ? "0" : "1";
		return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
	};

	const handlePiePress = (event: any) => {
		if (selectedEmotion) return;

		const { locationX, locationY } = event.nativeEvent;

		const x = locationX - radius;
		const y = locationY - radius;

		const distanceFromCenter = Math.sqrt(x * x + y * y);

		if (distanceFromCenter > radius) {
			return;
		}

		let angle = Math.atan2(y, x) * (180 / Math.PI);

		if (angle < 0) {
			angle += 360;
		}

		let foundEmotion = null;

		for (const emotion of emotions) {
			let startAngle = emotion.startAngle;
			let endAngle = emotion.endAngle;

			if (startAngle < 0) startAngle += 360;
			if (endAngle < 0) endAngle += 360;

			if (startAngle > endAngle) {
				if (angle >= startAngle || angle < endAngle) {
					foundEmotion = emotion;
					break;
				}
			} else {
				if (angle >= startAngle && angle < endAngle) {
					foundEmotion = emotion;
					break;
				}
			}
		}

		if (foundEmotion) {
			onSelectEmotion(foundEmotion);
		}
	};

	// Fonction pour détecter le secteur survolé
	const handleTouchMove = (event: any) => {
		if (selectedEmotion) return;

		const { locationX, locationY } = event.nativeEvent;

		const x = locationX - radius;
		const y = locationY - radius;

		const distanceFromCenter = Math.sqrt(x * x + y * y);

		// Si le doigt est en dehors du cercle, on annule le survol
		if (distanceFromCenter > radius) {
			setHoveredEmotion(null);
			return;
		}

		let angle = Math.atan2(y, x) * (180 / Math.PI);

		if (angle < 0) {
			angle += 360;
		}

		let foundEmotion = null;

		for (const emotion of emotions) {
			let startAngle = emotion.startAngle;
			let endAngle = emotion.endAngle;

			if (startAngle < 0) startAngle += 360;
			if (endAngle < 0) endAngle += 360;

			if (startAngle > endAngle) {
				if (angle >= startAngle || angle < endAngle) {
					foundEmotion = emotion;
					break;
				}
			} else {
				if (angle >= startAngle && angle < endAngle) {
					foundEmotion = emotion;
					break;
				}
			}
		}

		setHoveredEmotion(foundEmotion);
	};

	// Annuler le survol quand on quitte le composant
	const handleTouchEnd = () => {
		setHoveredEmotion(null);
	};

	// Calculer les positions pour le gradient du contour
	const getGradientPositions = (emotion: Emotion | null) => {
		if (!emotion) return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };

		const centerAngle = (emotion.startAngle + emotion.endAngle) / 2;
		const angleRad = (centerAngle * Math.PI) / 180;

		// Direction opposée au secteur survolé pour le gradient
		const endX = 0.5 + 0.5 * Math.cos(angleRad);
		const endY = 0.5 + 0.5 * Math.sin(angleRad);

		// Position de départ à l'opposé
		const startX = 0.5 - 0.5 * Math.cos(angleRad);
		const startY = 0.5 - 0.5 * Math.sin(angleRad);

		return {
			start: { x: startX, y: startY },
			end: { x: endX, y: endY }
		};
	};

	const gradientPositions = getGradientPositions(hoveredEmotion);

	return (
		<Animated.View
			style={[
				styles.wheelContainer,
				{
					opacity: wheelOpacity
				}
			]}>
			<TouchableWithoutFeedback
				onPress={handlePiePress}
				onPressIn={handleTouchMove}
				onPressOut={handleTouchEnd}
				delayPressIn={0}>
				<View
					style={[
						styles.circleWrapper,
						{
							width: size + 6, // Pour l'effet de bordure
							height: size + 6,
							borderRadius: (size + 6) / 2
						}
					]}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					onTouchCancel={handleTouchEnd}>
					{/* Bordure avec gradient */}
					{hoveredEmotion ? (
						<LinearGradient
							colors={[
								"rgba(255, 255, 255, 0.2)",
								"rgba(255, 255, 255, 0.2)",
								"rgba(255, 255, 255,1)"
							]}
							start={gradientPositions.start}
							end={gradientPositions.end}
							style={[
								styles.borderGradient,
								{
									width: size + 6,
									height: size + 6,
									borderRadius: (size + 6) / 2
								}
							]}
						/>
					) : (
						<View
							style={[
								styles.staticBorder,
								{
									width: size + 6,
									height: size + 6,
									borderRadius: (size + 6) / 2
								}
							]}
						/>
					)}

					{/* Cercle principal */}
					<View
						style={[
							styles.circle,
							{
								width: size,
								height: size,
								backgroundColor: darkBlue
							}
						]}>
						{emotions.map((emotion) => (
							<View
								key={`line-${emotion.id}`}
								style={[
									styles.divider,
									{
										width: radius,
										height: 1,
										left: radius,
										top: radius,
										transform: [
											{
												rotate: `${emotion.startAngle}deg`
											}
										]
									}
								]}
							/>
						))}

						{/* Secteur sélectionné */}
						{selectedEmotion && (
							<View
								style={[
									styles.selectedSector,
									{
										width: size,
										height: size,
										backgroundColor: selectedEmotion.color,
										clipPath: `path('${createSectorPath(selectedEmotion)}')`
									}
								]}
							/>
						)}

						{/* Secteur survolé */}
						{hoveredEmotion && !selectedEmotion && (
							<View
								style={[
									styles.hoveredSector,
									{
										width: size,
										height: size,
										backgroundColor: hoveredEmotion.color,
										clipPath: `path('${createSectorPath(hoveredEmotion)}')`
									}
								]}
							/>
						)}

						{emotions.map((emotion) => {
							const centerAngle =
								(emotion.startAngle + emotion.endAngle) / 2;
							const angleRad = (centerAngle * Math.PI) / 180;
							const textRadius = radius * 0.6;
							const x = radius + textRadius * Math.cos(angleRad);
							const y = radius + textRadius * Math.sin(angleRad);
							let textRotation = centerAngle;

							if (textRotation > 90 && textRotation < 270) {
								textRotation += 180;
							}

							return (
								<TouchableWithoutFeedback
									key={`text-touch-${emotion.id}`}
									onPress={() =>
										!selectedEmotion &&
										onSelectEmotion(emotion)
									}>
									<View
										style={[
											styles.textContainer,
											{
												left: x,
												top: y,
												transform: [
													{ translateX: -50 },
													{ translateY: -10 },
													{
														rotate: `${textRotation}deg`
													}
												]
											}
										]}>
										<Text
											style={[
												styles.text,
												(selectedEmotion &&
													selectedEmotion.id ===
														emotion.id) ||
												(hoveredEmotion &&
													hoveredEmotion.id ===
														emotion.id)
													? {
															color: emotion.color,
															fontWeight: "900"
														}
													: {}
											]}>
											{emotion.label}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							);
						})}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	wheelContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1
	},
	circleWrapper: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center"
	},
	borderGradient: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center"
	},
	staticBorder: {
		position: "absolute",
		borderWidth: 3,
		borderColor: "rgba(255, 255, 255, 0.5)"
	},
	circle: {
		borderRadius: 150,
		position: "relative",
		overflow: "hidden"
	},
	divider: {
		position: "absolute",
		backgroundColor: "white",
		transformOrigin: "left center"
	},
	selectedSector: {
		position: "absolute",
		opacity: 0.6
	},
	hoveredSector: {
		position: "absolute",
		opacity: 0.7
	},
	textContainer: {
		position: "absolute",
		width: 100,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10,
		padding: 5
	},
	text: {
		color: "white",
		fontSize: 9,
		fontWeight: "bold",
		textAlign: "center"
	}
});

export default EmotionsPieChart;
