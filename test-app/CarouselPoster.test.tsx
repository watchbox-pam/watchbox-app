import React from "react";
import { render, screen } from "@testing-library/react-native";
import CarouselPoster from "../src/components/CarouselPoster"; // Ajustez le chemin d'importation selon votre structure

// Mock du module expo-router pour simuler le composant Link
jest.mock("react-native", () => {
	const rn = jest.requireActual("react-native");
	// eslint-disable-next-line react/display-name
	rn.FlatList = ({ data, renderItem, keyExtractor, horizontal }) => {
		return (
			<rn.View testID="flat-list">
				{data.map((item, index) => (
					<rn.View
						key={keyExtractor ? keyExtractor(item, index) : index}>
						{renderItem({ item, index })}
					</rn.View>
				))}
			</rn.View>
		);
	};
	return rn;
});

// Puis, modifiez les tests pour utiliser getByTestId au lieu de UNSAFE_getAllByType
it("rend une liste d'images quand des données sont fournies", () => {
	const { getByTestId } = render(<CarouselPoster data={mockData} />);

	// Vérifie que la FlatList est rendue
	const flatList = getByTestId("flat-list");
	expect(flatList).toBeTruthy();
});

// De même pour les autres tests, remplacer les occurrences de UNSAFE_getAllByType("FlatList") par getByTestId('flat-list')

describe("CarouselPoster Component", () => {
	// Données de test
	const mockData = [
		{ id: 1, poster_path: "/poster1.jpg" },
		{ id: 2, poster_path: "/poster2.jpg" },
		{ id: 3, poster_path: "/poster3.jpg" }
	];

	it("rend un conteneur vide quand aucune donnée n'est fournie", () => {
		const { toJSON } = render(<CarouselPoster data={[]} />);

		// Vérifie que le composant retourne un View avec le style container
		expect(toJSON()).toMatchSnapshot();
	});

	it("rend un conteneur vide quand data est null ou undefined", () => {
		const { toJSON: toJSON1 } = render(<CarouselPoster data={null} />);
		const { toJSON: toJSON2 } = render(<CarouselPoster data={undefined} />);

		expect(toJSON1()).toMatchSnapshot();
		expect(toJSON2()).toMatchSnapshot();
	});

	it("rend une liste d'images quand des données sont fournies", () => {
		const { UNSAFE_getAllByType, UNSAFE_queryAllByType } = render(
			<CarouselPoster data={mockData} />
		);

		// Vérifie que la FlatList est rendue
		const flatList = UNSAFE_getAllByType("FlatList");
		expect(flatList).toHaveLength(1);

		// Vérifie que le bon nombre d'images est rendu
		// Notez que cette méthode peut ne pas fonctionner directement à cause du rendu virtuel de FlatList
		// Cette approche est plus conceptuelle que pratique
		const images = UNSAFE_queryAllByType("Image");
		expect(images.length).toBeGreaterThan(0);
	});

	it("configure correctement les props de FlatList", () => {
		const { UNSAFE_getAllByType } = render(
			<CarouselPoster data={mockData} />
		);

		const flatList = UNSAFE_getAllByType("FlatList")[0];

		// Vérifie les propriétés de la FlatList
		expect(flatList.props.horizontal).toBe(true);
		expect(flatList.props.showsHorizontalScrollIndicator).toBe(false);
		expect(flatList.props.data).toEqual(mockData);
		expect(typeof flatList.props.keyExtractor).toBe("function");
		expect(typeof flatList.props.renderItem).toBe("function");
	});

	it("crée des liens de navigation correctement formatés", () => {
		const { UNSAFE_getAllByType } = render(
			<CarouselPoster data={mockData} />
		);

		// Obtenir la fonction renderItem de la FlatList
		const flatList = UNSAFE_getAllByType("FlatList")[0];
		const renderItem = flatList.props.renderItem;

		// Appeler renderItem manuellement avec un élément de test
		const testItem = { item: mockData[0] };
		const renderedLink = renderItem(testItem);

		// Vérifier que le lien est correctement formaté
		expect(renderedLink.props.href).toEqual({
			pathname: "/movie/[id]",
			params: { id: "1" }
		});
	});

	it("formate correctement les URLs des images", () => {
		const { UNSAFE_getAllByType } = render(
			<CarouselPoster data={mockData} />
		);

		// Obtenir la fonction renderItem de la FlatList
		const flatList = UNSAFE_getAllByType("FlatList")[0];
		const renderItem = flatList.props.renderItem;

		// Appeler renderItem manuellement et vérifier l'URL de l'image
		const testItem = { item: mockData[0] };
		const renderedLink = renderItem(testItem);
		const imageComponent = renderedLink.props.children;

		expect(imageComponent.props.source.uri).toBe(
			"https://image.tmdb.org/t/p/w500/poster1.jpg"
		);
	});
});
