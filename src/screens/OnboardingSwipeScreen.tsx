import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import SwipeScreen, { SwipeProgress } from "@/src/screens/SwipeScreen";
import {
	completeOnboarding,
	fetchOnboardingMovies
} from "@/src/services/OnboardingService";
import useSessionStore from "@/src/zustand/sessionStore";
import { swipeStyles as styles } from "@/src/styles/OnboardingStyle";

export default function OnboardingSwipeScreen() {
	const isLoggedIn = useSessionStore((state) => state.isLoggedIn);
	const [finishing, setFinishing] = useState(false);

	if (!isLoggedIn) {
		return <Redirect href="/base" />;
	}

	// Fin du parcours (swipe terminé ou passé) : on l'enregistre puis on va à l'accueil.
	// Si l'enregistrement échoue, on ne bloque pas l'utilisateur.
	const finish = async () => {
		if (finishing) return;
		setFinishing(true);
		await completeOnboarding();
		router.replace("/");
	};

	const renderHeader = ({ current, total }: SwipeProgress) => (
		<View style={styles.header}>
			<View style={styles.topRow}>
				<Text style={styles.hint}>Étape 2 sur 2</Text>
				<TouchableOpacity
					testID="onboarding-swipe-skip"
					style={styles.skip}
					disabled={finishing}
					onPress={finish}>
					<Text style={styles.skipText}>Passer</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.title}>Vos goûts</Text>
			<Text style={styles.hint}>
				À droite si vous aimez, à gauche sinon, vers le haut si vous ne
				l&apos;avez pas vu.
			</Text>
			{total > 0 && (
				<View style={styles.progressRow}>
					<View style={styles.progressTrack}>
						<View
							style={[
								styles.progressFill,
								{ width: `${(current / total) * 100}%` }
							]}
						/>
					</View>
					<Text style={styles.progressText}>
						{current}/{total}
					</Text>
				</View>
			)}
		</View>
	);

	const finishButton = (label: string) => (
		<TouchableOpacity
			testID="onboarding-swipe-finish"
			style={styles.finishButton}
			disabled={finishing}
			onPress={finish}>
			{finishing ? (
				<ActivityIndicator color="#fff" />
			) : (
				<Text style={styles.finishText}>{label}</Text>
			)}
		</TouchableOpacity>
	);

	return (
		<SwipeScreen
			loadMovies={fetchOnboardingMovies}
			loadMore={false}
			openDetailsOnTap={false}
			screenName="OnboardingSwipe"
			renderHeader={renderHeader}
			endAction={finishButton("Découvrir Watchbox")}
			emptyAction={finishButton("Continuer")}
		/>
	);
}
