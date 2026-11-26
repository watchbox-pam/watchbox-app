import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import BackButton from "@/src/components/BackButton";
import Logo from "@/src/components/Logo";
import styles from "@/src/styles/SignupStyle";
import StyledText from "@/src/components/StyledText";
import { useEffect, useState } from "react";
import RNDateTimePicker, {
	DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { routeAfterLogin } from "@/src/utils/onboarding";
import useSessionStore from "@/src/zustand/sessionStore";
import useGoogleRegistrationStore from "@/src/zustand/googleRegistrationStore";
import {
	completeGoogleRegistration,
	signOutFromGoogle
} from "@/src/services/GoogleAuthService";

/**
 * Dernière étape d'une inscription avec Google :
 * Google a confirmé l'identité et l'adresse mail, il ne manque que
 * le pseudo et la date de naissance (comme l'inscription classique, pays = FR).
 */
export default function GoogleRegistrationScreen() {
	const pending = useGoogleRegistrationStore((state) => state.pending);
	const clearPending = useGoogleRegistrationStore((state) => state.clear);
	const signIn = useSessionStore((state: any) => state.signIn);

	const [username, setUsername] = useState<string>(
		pending?.suggestedUsername ?? ""
	);
	const [birthdate, setBirthdate] = useState<Date | null>(null);
	const [dtPickerVisible, setDtPickerVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	// Écran ouvert sans inscription en cours (ex. après un rechargement) : retour à l'accueil
	useEffect(() => {
		if (!pending) {
			router.replace("/base");
		}
	}, [pending]);

	const onChangeBirthdate = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		setDtPickerVisible(false);
		if (selectedDate) {
			setBirthdate(selectedDate);
		}
	};

	const cancelRegistration = async () => {
		clearPending();
		// Permet de choisir un autre compte Google au prochain essai
		await signOutFromGoogle();
	};

	const finishRegistration = async () => {
		if (!pending || loading) return;

		if (!username.trim()) {
			Toast.show({
				type: "error",
				text1: "Inscription",
				text2: "Le pseudo est requis"
			});
			return;
		}
		if (!birthdate) {
			Toast.show({
				type: "error",
				text1: "Inscription",
				text2: "La date de naissance est requise"
			});
			return;
		}

		setLoading(true);
		try {
			const result = await completeGoogleRegistration({
				registrationToken: pending.registrationToken,
				username,
				birthdate,
				country: "FR"
			});

			if (result.status === "logged_in") {
				clearPending();
				signIn(
					result.session.id,
					result.session.username,
					result.session.token
				);
				Toast.show({
					type: "success",
					text1: "Bienvenue sur Watchbox !",
					text2: "Votre compte a été créé"
				});
				// Nouveau compte : parcours d'onboarding avant l'accueil
				router.replace(routeAfterLogin(result.onboardingCompleted));
				return;
			}

			if (result.status === "error") {
				Toast.show({
					type: "error",
					text1: "Inscription",
					text2: result.message
				});
				// Jeton d'inscription expiré (15 min) : il faut recommencer avec Google
				if (result.message.includes("expiré")) {
					await cancelRegistration();
					router.replace("/base");
				}
			}
		} finally {
			setLoading(false);
		}
	};

	if (!pending) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<BackButton onPress={cancelRegistration} />
				<Logo />
			</View>
			<StyledText style={styles.title}>Bienvenue !</StyledText>
			<Text style={[styles.linkText, { marginBottom: 15 }]}>
				Dernière étape pour créer votre compte avec {pending.email}
			</Text>

			<TextInput
				style={styles.input}
				placeholder="Pseudo"
				placeholderTextColor="#fff"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				maxLength={50}
			/>

			<Text style={styles.input} onPress={() => setDtPickerVisible(true)}>
				{birthdate
					? birthdate.toLocaleDateString("fr-FR")
					: "Date de naissance"}
			</Text>
			{dtPickerVisible && (
				<RNDateTimePicker
					testID="dateTimePicker"
					value={birthdate || new Date(Date.now())}
					mode="date"
					onChange={onChangeBirthdate}
					minimumDate={new Date(1900, 0, 1)}
					maximumDate={new Date(Date.now())}
				/>
			)}

			<TouchableOpacity
				style={styles.button}
				onPress={finishRegistration}
				disabled={loading}>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Créer mon compte</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}
