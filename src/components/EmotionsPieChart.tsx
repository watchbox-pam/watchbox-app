import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Alert
} from "react-native";

const EmotionsPieChart = () => {
	// Liste des 8 émotions avec leurs angles de début et de fin précis
	const emotions = [
		{ id: 1, label: "ROMANTISME", startAngle: -22.5, endAngle: 22.5 },
		{ id: 2, label: "ÉMERVEILLEMENT", startAngle: 22.5, endAngle: 67.5 },
		{ id: 3, label: "ÉMOTION", startAngle: 67.5, endAngle: 112.5 },
		{ id: 4, label: "FRISSON", startAngle: 112.5, endAngle: 157.5 },
		{ id: 5, label: "NOSTALGIE", startAngle: 157.5, endAngle: 202.5 },
		{ id: 6, label: "RÉFLEXION", startAngle: 202.5, endAngle: 247.5 },
		{ id: 7, label: "MÉLANCOLIE", startAngle: 247.5, endAngle: 292.5 },
		{ id: 8, label: "RIRE", startAngle: 292.5, endAngle: 337.5 }
	];

	// État pour suivre l'émotion sélectionnée
	const [selectedEmotion, setSelectedEmotion] = useState(null);

	// Taille du diagramme
	const size = 300;
	const radius = size / 2;
	const darkBlue = "#0a1a2a";
	const highlightBlue = "#1a3a5a";

	// Fonction pour sélectionner une émotion
	const selectEmotion = (emotion) => {
		setSelectedEmotion(emotion);
		Alert.alert(
			`${emotion.label}`,
			`Émotion sélectionnée: ${emotion.label}`
		);
	};

	// Fonction pour déterminer quelle émotion a été cliquée
	const handlePiePress = (event) => {
		// Récupérer les coordonnées du clic par rapport au conteneur
		const { locationX, locationY } = event.nativeEvent;

		// Calculer les coordonnées par rapport au centre
		const x = locationX - radius;
		const y = locationY - radius;

		// Calculer la distance par rapport au centre
		const distanceFromCenter = Math.sqrt(x * x + y * y);

		// Si le clic est hors du cercle, ignorer
		if (distanceFromCenter > radius) {
			return;
		}

		// Calculer l'angle du clic (en degrés)
		// Math.atan2 prend (y, x) et donne un angle où 0° est à l'est, et l'angle augmente dans le sens anti-horaire
		let angle = Math.atan2(y, x) * (180 / Math.PI);

		// Convertir en angle positif (0-360)
		if (angle < 0) {
			angle += 360;
		}

		// Trouver l'émotion correspondant à cet angle
		let foundEmotion = null;

		for (const emotion of emotions) {
			// Récupérer directement les angles de début et de fin de la section
			let startAngle = emotion.startAngle;
			let endAngle = emotion.endAngle;

			// Normaliser les angles (0-360)
			if (startAngle < 0) startAngle += 360;
			if (endAngle < 0) endAngle += 360;

			// Vérifier si l'angle du clic est dans cette section
			// Cas spécial pour la section qui traverse 0°
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
			selectEmotion(foundEmotion);
		}
	};

	// Fonction pour créer un chemin SVG pour un secteur
	const createSectorPath = (emotion) => {
		const startAngle = emotion.startAngle;
		const endAngle = emotion.endAngle;

		// Convertir en radians, avec rotation de -90° car dans SVG 0° est au nord
		const startRad = ((startAngle - 90) * Math.PI) / 180;
		const endRad = ((endAngle - 90) * Math.PI) / 180;

		// Calculer les coordonnées du secteur
		const x1 = radius + radius * Math.cos(startRad);
		const y1 = radius + radius * Math.sin(startRad);
		const x2 = radius + radius * Math.cos(endRad);
		const y2 = radius + radius * Math.sin(endRad);

		// Un secteur de cercle est défini par un arc
		const sectorSize = endAngle - startAngle;
		const largeArcFlag = sectorSize <= 180 ? "0" : "1";
		return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
	};

	return (
		<View style={styles.container}>
			{/* Cercle principal avec gestionnaire de toucher global */}
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
					{/* Dessin des lignes de division (8 lignes) */}
					{emotions.map((emotion) => {
						// Calculer l'angle de la ligne de division (sur le bord de chaque section)
						const dividerAngle = emotion.startAngle;

						return (
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
											{ rotate: `${dividerAngle}deg` }
										]
									}
								]}
							/>
						);
					})}

					{/* Dessin du secteur pour la sélection actuelle */}
					{selectedEmotion && (
						<View
							style={[
								styles.selectedSector,
								{
									width: size,
									height: size,
									backgroundColor: highlightBlue,
									clipPath: `path('${createSectorPath(selectedEmotion)}')`
								}
							]}
						/>
					)}

					{/* Textes des émotions - rendus cliquables */}
					{emotions.map((emotion) => {
						// Calculer l'angle central du secteur (qui est précisément entre startAngle et endAngle)
						const centerAngle =
							(emotion.startAngle + emotion.endAngle) / 2;

						// Convertir en radians pour le calcul de position
						const angleRad = (centerAngle * Math.PI) / 180;

						// Positionner le texte à 60% du rayon
						const textRadius = radius * 0.6;
						const x = radius + textRadius * Math.cos(angleRad);
						const y = radius + textRadius * Math.sin(angleRad);

						// Ajuster la rotation du texte pour qu'il soit lisible
						let textRotation = centerAngle;
						// Si le texte est dans la moitié gauche, le pivoter pour qu'il soit à l'endroit
						if (textRotation > 90 && textRotation < 270) {
							textRotation += 180;
						}

						return (
							// Rendre le texte cliquable
							<TouchableWithoutFeedback
								key={`text-touch-${emotion.id}`}
								onPress={() => selectEmotion(emotion)}>
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
									<Text style={styles.text}>
										{emotion.label}
									</Text>
								</View>
							</TouchableWithoutFeedback>
						);
					})}
				</View>
			</TouchableWithoutFeedback>

			{/* Indication textuelle de l'émotion sélectionnée - en blanc */}
			{selectedEmotion && (
				<Text style={styles.selectionLabel}>
					Émotion sélectionnée: {selectedEmotion.label}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16
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
		opacity: 0.3
	},
	textContainer: {
		position: "absolute",
		width: 100,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10,
		padding: 5 // Agrandir la zone tactile
	},
	text: {
		color: "white",
		fontSize: 9,
		fontWeight: "bold",
		textAlign: "center"
	},
	selectionLabel: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: "bold",
		color: "white"
	}
});

export default EmotionsPieChart;
