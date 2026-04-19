import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import useSessionStore from "@/src/zustand/sessionStore";
import useFiltersStore from "@/src/zustand/filtersStore";
import UserProfile from "@/src/models/UserProfile";
import { deleteAccount, getUserProfile, updateSettings } from "@/src/services/ProfileService";
import { providerService } from "@/src/services/ProviderService";
import Toast from "react-native-toast-message";

type Provider = {
	id: number;
	name: string;
	logo_path: string;
};

export const useSettings = () => {
	const userId = useSessionStore((state) => state.user.id);
	const signOut = useSessionStore((state) => state.signOut);
	const { selectedProviders, isLoaded, loadProviders, toggleProvider } =
		useFiltersStore();

	// Toggles
	const [notifications, setNotifications] = useState(false);
	const [publicProfile, setPublicProfile] = useState(false);
	const [history, setHistory] = useState(false);
	const [adultContent, setAdultContent] = useState(false);

	// Data
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [providers, setProviders] = useState<Provider[]>([]);

	// Loading
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [isLoadingProviders, setIsLoadingProviders] = useState(false);
	const [isCalculatingCache, setIsCalculatingCache] = useState(false);
	const [isDeletingAccount, setIsDeletingAccount] = useState(false);

	// Cache
	const [cacheSize, setCacheSize] = useState("0 MB");

	useEffect(() => {
		fetchUserProfile();
		fetchProviders();
		if (!isLoaded) loadProviders();
	}, []);

	/* ---------- PROFILE ---------- */

	const fetchUserProfile = async () => {
		setIsLoadingProfile(true);
		try {
			const result = await getUserProfile(userId);
			if (result.success) {
				setUserProfile(result.data);
				setPublicProfile(!result.data.is_private);
				setHistory(!result.data.history_private);
				setAdultContent(result.data.adult_content);
			} else {
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: "Impossible de charger le profil"
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingProfile(false);
		}
	};

	const saveSettings = async (
		newAdultContent: boolean,
		newPublicProfile: boolean,
		newHistory: boolean
	) => {
		const result = await updateSettings(
			userId,
			newAdultContent,
			!newPublicProfile,
			!newHistory
		);
		if (!result.success) {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: result.message ?? "Impossible de sauvegarder les paramètres"
			});
		}
	};

	const handleToggleAdultContent = () => {
		if (!adultContent) {
			Alert.alert(
				"Contenu adulte",
				"Êtes-vous sûr d'avoir plus de 18 ans ?",
				[
					{
						text: "Non",
						style: "cancel"
					},
					{
						text: "Oui",
						onPress: () => {
							setAdultContent(true);
							saveSettings(true, publicProfile, history);
						}
					}
				]
			);
		} else {
			setAdultContent(false);
			saveSettings(false, publicProfile, history);
		}
	};

	const handleTogglePublicProfile = () => {
		const next = !publicProfile;
		setPublicProfile(next);
		saveSettings(adultContent, next, history);
	};

	const handleToggleHistory = () => {
		const next = !history;
		setHistory(next);
		saveSettings(adultContent, publicProfile, next);
	};

	/* ---------- PROVIDERS ---------- */

	const fetchProviders = async () => {
		setIsLoadingProviders(true);
		try {
			const response = await providerService.getProviders();
			if (response.success) setProviders(response.data);
		} finally {
			setIsLoadingProviders(false);
		}
	};

	/* ---------- CACHE ---------- */

	const calculateCacheSize = async () => {
		setIsCalculatingCache(true);
		try {
			const size = await getCacheSize(FileSystem.cacheDirectory!);
			setCacheSize(`${(size / 1024 / 1024).toFixed(2)} MB`);
		} catch {
			setCacheSize("0 MB");
		} finally {
			setIsCalculatingCache(false);
		}
	};

	const getCacheSize = async (directory: string): Promise<number> => {
		const files = await FileSystem.readDirectoryAsync(directory);
		let total = 0;

		for (const file of files) {
			const path = `${directory}${file}`;
			const info = await FileSystem.getInfoAsync(path);
			if (!info.exists) continue;

			if (info.isDirectory) {
				total += await getCacheSize(`${path}/`);
			} else {
				total += info.size || 0;
			}
		}
		return total;
	};

	const clearCache = async () => {
		const cacheDir = FileSystem.cacheDirectory!;
		const files = await FileSystem.readDirectoryAsync(cacheDir);

		await Promise.all(
			files.map((file) =>
				FileSystem.deleteAsync(`${cacheDir}${file}`, {
					idempotent: true
				})
			)
		);

		await calculateCacheSize();
	};

	const handleDeleteAccount = async () => {
		setIsDeletingAccount(true);
		try {
			const result = await deleteAccount();
			if (result.success) {
				await signOut();
				Toast.show({
					type: "error",
					text1: "Compte supprimé",
					text2: result.message
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Erreur",
					text2: result.message
				});
			}
		} catch {
			Toast.show({
				type: "error",
				text1: "Erreur",
				text2: "Une erreur inattendue est survenue"
			});
		} finally {
			setIsDeletingAccount(false);
		}
	};

	return {
		notifications,
		publicProfile,
		history,
		adultContent,
		userProfile,
		providers,
		selectedProviders,
		cacheSize,

		isLoadingProfile,
		isLoadingProviders,
		isCalculatingCache,
		isDeletingAccount,

		setNotifications,
		setPublicProfile: handleTogglePublicProfile,
		setHistory: handleToggleHistory,
		setAdultContent: handleToggleAdultContent,

		toggleProvider,
		calculateCacheSize,
		clearCache,
		handleDeleteAccount
	};
};
