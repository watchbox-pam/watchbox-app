import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	ImageSourcePropType
} from "react-native";
import StyledText from "../StyledText";
import styles from "../../styles/ParamStyle";

type Provider = {
	id: number;
	name: string;
	logo_path: string;
};

export enum ImportProvider {
	Netflix = 1,
	Letterboxd = 2
}

const providerImages: Record<number, ImageSourcePropType> = {
	[ImportProvider.Netflix]: require("../../assets/images/providerOptions/1.png"),
	[ImportProvider.Letterboxd]: require("../../assets/images/providerOptions/2.png")
};

const MAX_VISIBLE_IMPORTS = 8;

const ImportMovies = ({
	movieImports,
	onImportProvider,
	isLoading = false
}: {
	movieImports: Provider[];
	onImportProvider: (provider: ImportProvider) => void;
	isLoading?: boolean;
}) => {
	const [showAll, setShowAll] = useState(false);
	const importOptions = [...movieImports];
	const displayedProviders = showAll
		? importOptions
		: importOptions.slice(0, MAX_VISIBLE_IMPORTS);

	return (
		<View
			style={[
				styles.item,
				{
					height: "auto",
					flexDirection: "column",
					alignItems: "flex-start",
					paddingVertical: 15
				}
			]}>
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
					marginBottom: 10
				}}>
				<View>
					<Text style={styles.text}>Importer vos données</Text>
					<Text style={styles.desc}>
						Importer vos données depuis un de vos services de
						streaming / biblioteque préférés
					</Text>
				</View>
			</View>

			{isLoading ? (
				<ActivityIndicator size="small" color="#fff" />
			) : (
				<>
					<View style={styles.providersContainer}>
						{displayedProviders.map((provider) => (
							<Pressable
								key={provider.id}
								accessibilityRole="button"
								accessibilityLabel={`Importer depuis ${provider.name}`}
								style={[styles.providerButton]}
								onPress={() => onImportProvider(provider.id)}>
								{providerImages[provider.id] ? (
									<Image
										source={providerImages[provider.id]}
										style={styles.providerLogo}
									/>
								) : (
									<Text style={styles.providerText}>
										{provider.name}
									</Text>
								)}
							</Pressable>
						))}
					</View>

					{importOptions.length > MAX_VISIBLE_IMPORTS && (
						<TouchableOpacity
							style={styles.readMoreButton}
							onPress={() => setShowAll(!showAll)}>
							<StyledText style={styles.readMoreText}>
								{showAll
									? "Voir moins"
									: `Voir plus (${importOptions.length - MAX_VISIBLE_IMPORTS} autres)`}
							</StyledText>
						</TouchableOpacity>
					)}
				</>
			)}
		</View>
	);
};

export default ImportMovies;
