import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Animated
} from "react-native";

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

	return (
		<Animated.View
			style={[
				styles.wheelContainer,
				{
					opacity: wheelOpacity
				}
			]}>
			<TouchableWithoutFeedback onPress={handlePiePress}>
				<View
					style={[
						styles.circle,
						{
							width: size,
							height: size,
							backgroundColor: darkBlue,
							borderWidth: 2,
							borderColor: "white"
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
										{ rotate: `${emotion.startAngle}deg` }
									]
								}
							]}
						/>
					))}

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
									!selectedEmotion && onSelectEmotion(emotion)
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
												{ rotate: `${textRotation}deg` }
											]
										}
									]}>
									<Text
										style={[
											styles.text,
											selectedEmotion &&
											selectedEmotion.id === emotion.id
												? {
														color: selectedEmotion.color,
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
