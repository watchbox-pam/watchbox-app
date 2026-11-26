import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import Toast from "react-native-toast-message";
import styles from "@/src/styles/OnboardingStyle";
import Provider from "@/src/models/Provider";
import { providerService } from "@/src/services/ProviderService";
import useFiltersStore from "@/src/zustand/filtersStore";
import useSessionStore from "@/src/zustand/sessionStore";

const COLUMNS = 3;

// Écran suivant de l'onboarding
const NEXT_ROUTE = "/onboarding/swipe";

export default function OnboardingProvidersScreen() {
	const isLoggedIn = useSessionStore((state) => state.isLoggedIn);
	const { selectedProviders, isLoaded, loadProviders, saveProviders } =
		useFiltersStore();

	const [providers, setProviders] = useState<Provider[]>([]);
	const [loadingProviders, setLoadingProviders] = useState(true);
	const [loadError, setLoadError] = useState(false);
	const [selection, setSelection] = useState<number[]>([]);
	const [saving, setSaving] = useState(false);

	const fetchProviders = useCallback(async () => {
		setLoadingProviders(true);
		setLoadError(false);
		const response = await providerService.getProviders();
		if (response.success && response.data.length > 0) {
			setProviders(response.data);
		} else {
			setLoadError(true);
		}
		setLoadingProviders(false);
	}, []);

	useEffect(() => {
		fetchProviders();
		if (!isLoaded) loadProviders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Pré-coche ce que l'utilisateur avait déjà choisi (ancienne sélection locale)
	useEffect(() => {
		if (isLoaded) setSelection(selectedProviders);
	}, [isLoaded, selectedProviders]);

	if (!isLoggedIn) {
		return <Redirect href="/base" />;
	}

	const toggle = (id: number) =>
		setSelection((current) =>
			current.includes(id)
				? current.filter((p) => p !== id)
				: [...current, id]
		);

	const handleContinue = async () => {
		if (saving) return;
		setSaving(true);
		const saved = await saveProviders(selection);
		setSaving(false);

		if (!saved) {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: "Impossible d'enregistrer vos plateformes. Réessayez."
			});
			return;
		}
		router.replace(NEXT_ROUTE);
	};

	// Complète la dernière ligne pour garder des tuiles de même taille
	const rows = [...providers];
	while (rows.length % COLUMNS !== 0) rows.push(null as unknown as Provider);

	const renderTile = ({ item }: { item: Provider | null }) => {
		if (!item) return <View style={styles.emptySlot} />;
		const selected = selection.includes(item.id);
		return (
			<Pressable
				testID={`provider-${item.id}`}
				accessibilityRole="checkbox"
				accessibilityState={{ checked: selected }}
				accessibilityLabel={item.name}
				style={[styles.tile, selected && styles.tileSelected]}
				onPress={() => toggle(item.id)}>
				{item.logo_path ? (
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w154${item.logo_path}`
						}}
						style={styles.tileLogo}
					/>
				) : null}
				<Text style={styles.tileName} numberOfLines={2}>
					{item.name}
				</Text>
				{selected && (
					<View style={styles.tileCheck}>
						<Ionicons name="checkmark" size={15} color="#fff" />
					</View>
				)}
			</Pressable>
		);
	};

	const count = selection.length;

	return (
		<View style={styles.container}>
			<Text style={styles.step}>Étape 1 sur 2</Text>
			<Text style={styles.title}>Vos plateformes</Text>
			<Text style={styles.subtitle}>
				Sélectionnez les plateformes de streaming que vous utilisez.
				Nous vous proposerons en priorité des films que vous pouvez
				regarder.
			</Text>

			{loadingProviders ? (
				<View style={styles.center}>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			) : loadError ? (
				<View style={styles.center}>
					<Text style={styles.message}>
						Impossible de charger la liste des plateformes.
					</Text>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={fetchProviders}>
						<Text style={styles.secondaryButtonText}>
							Réessayer
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<FlatList
					data={rows}
					keyExtractor={(item, index) =>
						item ? String(item.id) : `empty-${index}`
					}
					numColumns={COLUMNS}
					columnWrapperStyle={styles.row}
					contentContainerStyle={styles.grid}
					renderItem={renderTile}
					showsVerticalScrollIndicator={false}
				/>
			)}

			<View style={styles.footer}>
				<Text style={styles.counter}>
					{count === 0
						? "Aucune plateforme sélectionnée"
						: `${count} plateforme${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`}
				</Text>
				<TouchableOpacity
					testID="onboarding-providers-continue"
					style={[styles.button, saving && styles.buttonDisabled]}
					disabled={saving || loadingProviders}
					onPress={handleContinue}>
					{saving ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.buttonText}>
							{count === 0
								? "Continuer sans plateforme"
								: "Continuer"}
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}
