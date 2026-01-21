import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from "react-native";
import StyledText from "../StyledText";
import styles from "../../styles/ParamStyle";

type Provider = {
	id: number;
	name: string;
	logo_path: string;
};

type PlatformsSectionProps = {
	providers: Provider[];
	selectedProviders: number[];
	isLoading: boolean;
	onToggleProvider: (providerId: number) => void;
};

const MAX_VISIBLE_PROVIDERS = 8;

const ProvidersSection: React.FC<PlatformsSectionProps> = ({
	providers,
	selectedProviders,
	isLoading,
	onToggleProvider
}) => {
	const [showAll, setShowAll] = useState(false);
	const displayedProviders = showAll
		? providers
		: providers.slice(0, MAX_VISIBLE_PROVIDERS);

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
					<Text style={styles.text}>Plateformes</Text>
					<Text style={styles.desc}>
						Plateforme que vous utilisez
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
								style={[
									styles.providerButton,
									selectedProviders.includes(provider.id) &&
										styles.selectedProvider
								]}
								onPress={() => onToggleProvider(provider.id)}>
								{provider.logo_path ? (
									<Image
										source={{
											uri: `https://image.tmdb.org/t/p/original${provider.logo_path}`
										}}
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

					{providers.length > MAX_VISIBLE_PROVIDERS && (
						<TouchableOpacity
							style={styles.readMoreButton}
							onPress={() => setShowAll(!showAll)}>
							<StyledText style={styles.readMoreText}>
								{showAll
									? "Voir moins"
									: `Voir plus (${providers.length - MAX_VISIBLE_PROVIDERS} autres)`}
							</StyledText>
						</TouchableOpacity>
					)}
				</>
			)}
		</View>
	);
};

export default ProvidersSection;
