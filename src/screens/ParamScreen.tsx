import React, { useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import styles from "../styles/ParamStyle";
import SettingItem from "../components/Param/SettingItem";
import SettingCheckboxItem from "../components/Param/SettingCheckboxItem";
import ProvidersSection from "../components/Param/ProvidersSection";
import DeleteAccountModal from "../components/Param/DeleteAccountModal";
import ClearCacheModal from "../components/Param/ClearCacheModal";
import { useSettings } from "@/src/components/Param/useSettings";
import Toast from "react-native-toast-message";

const ParamScreen: React.FC = () => {
	const {
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
		setPublicProfile,
		setHistory,
		setAdultContent,
		toggleProvider,
		clearCache,
		redirectToPasswordReset,
		handleDeleteAccount
	} = useSettings();

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showClearCacheModal, setShowClearCacheModal] = useState(false);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.paramTitle}>Paramètres</Text>
				<Logo />
			</View>

			<SettingItem
				title="Compte"
				description={
					userProfile?.email ||
					userProfile?.username ||
					"Non disponible"
				}
				isLoading={isLoadingProfile}
				showChevron
			/>

			<SettingItem title="Langue" description="Français" showChevron />

			<SettingItem
				title="Région"
				description="Contenu disponible dans votre pays"
				showChevron
			/>

			<ProvidersSection
				providers={providers}
				selectedProviders={selectedProviders}
				isLoading={isLoadingProviders}
				onToggleProvider={toggleProvider}
			/>

			<SettingCheckboxItem
				title="Notifications"
				description="Cochez pour recevoir les notifications"
				checked={notifications}
				onToggle={() => setNotifications(!notifications)}
			/>

			<SettingCheckboxItem
				title="Profile Public"
				description="Profile visible à tous"
				checked={publicProfile}
				onToggle={() => setPublicProfile()}
			/>

			<SettingCheckboxItem
				title="Historique"
				description="Historique visible pour tous"
				checked={history}
				onToggle={() => setHistory()}
			/>

			<SettingCheckboxItem
				title="Contenu pour adultes"
				description="Contenu +18 ans"
				checked={adultContent}
				onToggle={() => setAdultContent()}
			/>

			<SettingItem
				title="Vider le cache"
				description={isCalculatingCache ? "Calcul..." : cacheSize}
				onPress={() => setShowClearCacheModal(true)}
			/>

			<SettingItem
				title="Réinitialiser votre mot de passe"
				onPress={() => redirectToPasswordReset()}
			/>

			<SettingItem
				title="Supprimer votre compte"
				onPress={() => setShowDeleteModal(true)}
				isDanger
			/>

			<DeleteAccountModal
				visible={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDeleteAccount}
				isDeleting={isDeletingAccount}
			/>

			<ClearCacheModal
				visible={showClearCacheModal}
				onClose={() => setShowClearCacheModal(false)}
				onConfirm={async () => {
					await clearCache();
					setShowClearCacheModal(false);
					Toast.show({
						type: "success",
						text1: "Cache vidé",
						text2: "Le cache a été vidé avec succès !"
					});
				}}
				cacheSize={cacheSize}
			/>
		</ScrollView>
	);
};

export default ParamScreen;
