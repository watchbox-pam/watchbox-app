import React, { useState, useEffect } from "react";
import { Checkbox, IconButton } from "react-native-paper";
import {
	View,
	Text,
	Pressable,
	ScrollView,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	Modal,
	Alert
} from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import { providerService } from "../services/ProviderService";
import { deleteAccount } from "../services/ProfileService";
import StyledText from "../components/StyledText";
import useSessionStore from "@/src/zustand/sessionStore";
import * as FileSystem from "expo-file-system";
import styles from "../styles/ParamStyle";

// Type for providers
type Provider = {
	id: number;
	name: string;
	logo_path: string;
};

const ParamScreen: React.FC = () => {
	const [notifications, setNotifications] = useState(false);
	const [publicProfile, setPublicProfile] = useState(false);
	const [history, setHistory] = useState(false);
	const [adultContent, setAdultContent] = useState(false);

	// State for providers
	const [providers, setProviders] = useState<Provider[]>([]);
	const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showAllProviders, setShowAllProviders] = useState(false);

	// Modal state
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showClearCacheModal, setShowClearCacheModal] = useState(false);
	const [cacheSize, setCacheSize] = useState<string>("0 MB");
	const [isCalculatingCache, setIsCalculatingCache] = useState(false);
	const [isDeletingAccount, setIsDeletingAccount] = useState(false);

	const MAX_VISIBLE_PROVIDERS = 8;
	const signOut = useSessionStore((state) => state.signOut);

	// Determine which providers to display
	const displayedProviders = showAllProviders
		? providers
		: providers.slice(0, MAX_VISIBLE_PROVIDERS);

	// Load providers on component mount
	useEffect(() => {
		fetchProviders();
		loadSelectedProviders();
	}, []);

	// Save selected providers when changed
	useEffect(() => {
		saveSelectedProviders();
	}, [selectedProviders]);

	const calculateCacheSize = async () => {
		setIsCalculatingCache(true);
		try {
			const cacheDir = FileSystem.cacheDirectory;
			if (cacheDir) {
				const info = await FileSystem.getInfoAsync(cacheDir);
				if (info.exists) {
					// Calculer la taille du cache
					const size = await getCacheSize(cacheDir);
					const sizeInMB = (size / (1024 * 1024)).toFixed(2);
					setCacheSize(`${sizeInMB} MB`);
				}
			}
		} catch (error) {
			console.error("Erreur calcul cache:", error);
			setCacheSize("0 MB");
		} finally {
			setIsCalculatingCache(false);
		}
	};

	// Fonction récursive pour calculer la taille du cache
	const getCacheSize = async (directory: string): Promise<number> => {
		try {
			const files = await FileSystem.readDirectoryAsync(directory);
			let totalSize = 0;

			for (const file of files) {
				const filePath = `${directory}${file}`;
				const info = await FileSystem.getInfoAsync(filePath);

				if (info.exists) {
					if (info.isDirectory) {
						totalSize += await getCacheSize(`${filePath}/`);
					} else {
						totalSize += info.size || 0;
					}
				}
			}

			return totalSize;
		} catch (error) {
			console.error("Erreur lecture dossier:", error);
			return 0;
		}
	};

	// Vider le cache
	const handleClearCache = async () => {
		try {
			const cacheDir = FileSystem.cacheDirectory;
			if (cacheDir) {
				// Supprimer tous les fichiers du cache
				const files = await FileSystem.readDirectoryAsync(cacheDir);

				for (const file of files) {
					try {
						await FileSystem.deleteAsync(`${cacheDir}${file}`, {
							idempotent: true
						});
					} catch (err) {
						console.error(`Erreur suppression ${file}:`, err);
					}
				}

				// Recalculer la taille du cache
				await calculateCacheSize();

				setShowClearCacheModal(false);

				// Afficher un message de succès
				Alert.alert("Cache vidé", "Le cache a été vidé avec succès !", [
					{ text: "OK" }
				]);
			}
		} catch (error) {
			console.error("Erreur lors du vidage du cache:", error);
			Alert.alert("Erreur", "Impossible de vider le cache", [
				{ text: "OK" }
			]);
		}
	};

	// Fetch providers from API
	const fetchProviders = async () => {
		setIsLoading(true);
		try {
			const response = await providerService.getProviders();
			if (response.success) {
				setProviders(response.data);
			}
		} catch (error) {
			console.error("Error loading providers:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Load selected providers from AsyncStorage
	const loadSelectedProviders = async () => {
		try {
			// Implémentation future si nécessaire
		} catch (error) {
			console.error("Error loading saved providers:", error);
		}
	};

	// Save selected providers to AsyncStorage
	const saveSelectedProviders = async () => {
		try {
			// Implémentation future si nécessaire
		} catch (error) {
			console.error("Error saving providers:", error);
		}
	};

	// Toggle provider selection
	const toggleProvider = (providerId: number) => {
		setSelectedProviders((prev) => {
			if (prev.includes(providerId)) {
				return prev.filter((id) => id !== providerId);
			} else {
				return [...prev, providerId];
			}
		});
	};

	const handleDeleteAccount = async () => {
		setIsDeletingAccount(true);
		try {
			const result = await deleteAccount();

			if (result.success) {
				await signOut();
				setShowDeleteModal(false);
				Alert.alert("Compte supprimé", result.message, [
					{ text: "OK" }
				]);
			} else {
				Alert.alert("Erreur", result.message, [{ text: "OK" }]);
			}
		} catch (error) {
			Alert.alert("Erreur", "Une erreur inattendue est survenue", [
				{ text: "OK" }
			]);
		} finally {
			setIsDeletingAccount(false);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.paramTitle}>Paramètres</Text>
				<Logo />
			</View>

			{/* Setting: Account Info */}
			<TouchableOpacity style={styles.item}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Compte</Text>
					<Text style={styles.desc}>julien@example.com</Text>
				</View>
				<IconButton icon="chevron-right" />
			</TouchableOpacity>

			{/* Setting: Language */}
			<View style={styles.item}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Langue</Text>
					<Text style={styles.desc}>Français</Text>
				</View>
				<IconButton icon="chevron-right" />
			</View>

			{/* Setting: Content Region */}
			<View style={styles.item}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Région</Text>
					<Text style={styles.desc}>
						Contenu disponible dans votre pays
					</Text>
				</View>
				<IconButton icon="chevron-right" />
			</View>

			{/* Setting: Platforms (Providers) */}
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
										selectedProviders.includes(
											provider.id
										) && styles.selectedProvider
									]}
									onPress={() => toggleProvider(provider.id)}>
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

						{/* Bouton Voir plus/moins */}
						{providers.length > MAX_VISIBLE_PROVIDERS && (
							<TouchableOpacity
								style={styles.readMoreButton}
								onPress={() =>
									setShowAllProviders(!showAllProviders)
								}>
								<StyledText style={styles.readMoreText}>
									{showAllProviders
										? "Voir moins"
										: `Voir plus (${providers.length - MAX_VISIBLE_PROVIDERS} autres)`}
								</StyledText>
							</TouchableOpacity>
						)}
					</>
				)}
			</View>

			{/* Setting: Notifications */}
			<View style={styles.CheckboxItem}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Notifications</Text>
					<Text style={styles.desc}>
						Cochez pour recevoir les notifications
					</Text>
				</View>
				<Checkbox
					status={notifications ? "checked" : "unchecked"}
					onPress={() => setNotifications(!notifications)}
					color="#007AFF"
				/>
			</View>

			{/* Setting: Public Profile */}
			<View style={styles.CheckboxItem}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Profile Public</Text>
					<Text style={styles.desc}>Profile visible à tous</Text>
				</View>
				<Checkbox
					status={publicProfile ? "checked" : "unchecked"}
					onPress={() => setPublicProfile(!publicProfile)}
					color="#007AFF"
				/>
			</View>

			{/* Setting: History */}
			<View style={styles.CheckboxItem}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Historique</Text>
					<Text style={styles.desc}>
						Historique visible pour tous
					</Text>
				</View>
				<Checkbox
					status={history ? "checked" : "unchecked"}
					onPress={() => setHistory(!history)}
					color="#007AFF"
				/>
			</View>

			{/* Setting: Adult Content */}
			<View style={styles.CheckboxItem}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Contenu pour adultes</Text>
					<Text style={styles.desc}>Contenu +18 ans</Text>
				</View>
				<Checkbox
					status={adultContent ? "checked" : "unchecked"}
					onPress={() => setAdultContent(!adultContent)}
					color="#007AFF"
				/>
			</View>

			{/* Setting: Clear Cache */}
			<TouchableOpacity
				style={styles.item}
				onPress={() => setShowClearCacheModal(true)}>
				<View style={{ flex: 1 }}>
					<Text style={styles.text}>Vider le cache</Text>
					<Text style={styles.desc}>
						{isCalculatingCache ? "Calcul..." : cacheSize}
					</Text>
				</View>
			</TouchableOpacity>

			{/* Setting: Delete Account */}
			<TouchableOpacity
				style={styles.Reditem}
				onPress={() => setShowDeleteModal(true)}>
				<View>
					<Text style={styles.text}>Supprimer votre compte</Text>
				</View>
			</TouchableOpacity>

			{/* Modal de confirmation de suppression */}
			<Modal
				visible={showDeleteModal}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setShowDeleteModal(false)}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>
							Supprimer votre compte
						</Text>
						<Text style={styles.modalText}>
							Êtes-vous sûr de vouloir supprimer votre compte ?
							{"\n\n"}
							Cette action est{" "}
							<Text style={styles.boldText}>irréversible</Text> et
							supprimera toutes vos données, listes et historique.
						</Text>

						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[
									styles.modalButton,
									styles.cancelButton
								]}
								onPress={() => setShowDeleteModal(false)}
								disabled={isDeletingAccount}>
								<Text style={styles.cancelButtonText}>
									Annuler
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.modalButton,
									styles.deleteButton
								]}
								onPress={handleDeleteAccount}
								disabled={isDeletingAccount}>
								{isDeletingAccount ? (
									<ActivityIndicator
										size="small"
										color="#fff"
									/>
								) : (
									<Text style={styles.deleteButtonText}>
										Supprimer
									</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* Modal de confirmation vidage cache */}
			<Modal
				visible={showClearCacheModal}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setShowClearCacheModal(false)}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Vider le cache</Text>
						<Text style={styles.modalText}>
							Êtes-vous sûr de vouloir vider le cache ?{"\n\n"}
							Taille actuelle : {cacheSize}
						</Text>

						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[
									styles.modalButton,
									styles.cancelButton
								]}
								onPress={() => setShowClearCacheModal(false)}>
								<Text style={styles.cancelButtonText}>
									Annuler
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.modalButton,
									styles.deleteButton
								]}
								onPress={handleClearCache}>
								<Text style={styles.deleteButtonText}>
									Vider
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</ScrollView>
	);
};

export default ParamScreen;
