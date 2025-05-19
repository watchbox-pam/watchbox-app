import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EmotionCard from "../src/components/EmotionsCard";
import styles from "@/src/styles/HomeStyle";

describe("EmotionCard Component", () => {
	// Données de test
	const mockEmotion = {
		id: 1,
		label: "Heureux",
		value: "happy",
		startAngle: 0,
		endAngle: 60,
		color: "#FFD700",
		emoji: "😊"
	};

	// Mock de la fonction onPress
	const mockOnPress = jest.fn();

	beforeEach(() => {
		// Réinitialiser le mock avant chaque test
		mockOnPress.mockClear();
	});

	it("rend correctement avec les propriétés fournies", () => {
		const { getByText } = render(
			<EmotionCard emotion={mockEmotion} onPress={mockOnPress} />
		);

		// Vérifier que le label et l'emoji sont affichés
		const labelElement = getByText("Heureux");
		const emojiElement = getByText("😊");

		expect(labelElement).toBeTruthy();
		expect(emojiElement).toBeTruthy();
	});

	it("applique la couleur de l'émotion au style de la carte", () => {
		const { getByTestId } = render(
			<EmotionCard
				emotion={mockEmotion}
				onPress={mockOnPress}
				testID="emotion-card"
			/>
		);

		// Pour tester les styles, nous devons ajouter un testID au composant
		// et modifier le composant original pour inclure ce testID
		const card = getByTestId("emotion-card");
		expect(card.props.style).toContainEqual(
			expect.objectContaining({ backgroundColor: "#FFD700" })
		);
	});

	it("appelle la fonction onPress avec l'émotion correspondante lorsqu'elle est pressée", () => {
		const { getByText } = render(
			<EmotionCard emotion={mockEmotion} onPress={mockOnPress} />
		);

		// Simuler un clic sur la carte
		fireEvent.press(getByText("Heureux").parent);

		// Vérifier que onPress a été appelé avec la bonne émotion
		expect(mockOnPress).toHaveBeenCalledTimes(1);
		expect(mockOnPress).toHaveBeenCalledWith(mockEmotion);
	});

	it("applique le style de carte sélectionnée lorsque isSelected est true", () => {
		const { getByTestId } = render(
			<EmotionCard
				emotion={mockEmotion}
				onPress={mockOnPress}
				isSelected={true}
				testID="emotion-card"
			/>
		);

		const card = getByTestId("emotion-card");

		// Vérifier que les styles de carte sélectionnée sont appliqués
		const cardStyles = card.props.style;
		expect(cardStyles).toEqual(
			expect.arrayContaining([
				expect.any(Object), // styles.card
				expect.objectContaining({ backgroundColor: "#FFD700" }),
				expect.any(Object) // styles.selectedCard
			])
		);
	});

	it("n'applique pas le style de carte sélectionnée lorsque isSelected est false", () => {
		const { getByTestId } = render(
			<EmotionCard
				emotion={mockEmotion}
				onPress={mockOnPress}
				isSelected={false}
				testID="emotion-card"
			/>
		);

		const card = getByTestId("emotion-card");

		// Vérifier que les styles de carte sélectionnée ne sont pas appliqués
		const cardStyles = card.props.style;
		expect(cardStyles).not.toEqual(
			expect.arrayContaining([
				expect.objectContaining(styles.selectedCard)
			])
		);
	});

	it("utilise la valeur par défaut isSelected=false quand non spécifié", () => {
		const { getByTestId } = render(
			<EmotionCard
				emotion={mockEmotion}
				onPress={mockOnPress}
				testID="emotion-card"
			/>
		);

		const card = getByTestId("emotion-card");

		// Vérifier que les styles de carte sélectionnée ne sont pas appliqués par défaut
		const cardStyles = card.props.style;
		expect(cardStyles).not.toEqual(
			expect.arrayContaining([
				expect.objectContaining(styles.selectedCard)
			])
		);
	});
});
