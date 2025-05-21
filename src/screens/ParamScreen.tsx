import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Image,
	ActivityIndicator
} from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import { providerService } from "../services/ProviderService";
/* import AsyncStorage from "@react-native-async-storage/async-storage";
 */ import styles from "../styles/ParamStyle";

// Type for providers
type Provider = {
	id: number;
	name: string;
	logo_path: string;
};

const ParamScreen: React.FC = () => {
	const [homeOption, setHomeOption] = useState(false);
	const [notifications, setNotifications] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	const [publicProfile, setPublicProfile] = useState(false);
	const [history, setHistory] = useState(false);
	const [adultContent, setAdultContent] = useState(false);

	// State for providers
	const [providers, setProviders] = useState<Provider[]>([]);
	const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// Load providers on component mount
	useEffect(() => {
		fetchProviders();
		loadSelectedProviders();
	}, []);

	// Save selected providers when changed
	useEffect(() => {
		saveSelectedProviders();
	}, [selectedProviders]);

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
			/* const savedProviders =
				await AsyncStorage.getItem("selectedProviders");
			if (savedProviders) {
				setSelectedProviders(JSON.parse(savedProviders));
			} */
		} catch (error) {
			console.error("Error loading saved providers:", error);
		}
	};

	// Save selected providers to AsyncStorage
	const saveSelectedProviders = async () => {
		try {
			/* await AsyncStorage.setItem(
				"selectedProviders",
				JSON.stringify(selectedProviders)
			); */
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

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.paramTitle}>Settings</Text>
				<Logo />
			</View>

			{/* Setting: Home Option */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Home Option</Text>
					<Text style={styles.desc}>Home - Swipe</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setHomeOption(true)}
						style={[
							styles.toggleButton,
							homeOption ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								homeOption && styles.activeText
							]}>
							Home
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setHomeOption(false)}
						style={[
							styles.toggleButton,
							!homeOption ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!homeOption && styles.activeText
							]}>
							Swipe
						</Text>
					</Pressable>
				</View>
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
						<Text style={styles.text}>Platforms</Text>
						<Text style={styles.desc}>Platforms you use</Text>
					</View>
				</View>

				{isLoading ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<View style={styles.providersContainer}>
						{providers.map((provider) => (
							<Pressable
								key={provider.id}
								style={[
									styles.providerButton,
									selectedProviders.includes(provider.id) &&
										styles.selectedProvider
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
				)}
			</View>

			{/* Setting: Notifications */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Notifications</Text>
					<Text style={styles.desc}>Receive notifications</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setNotifications(true)}
						style={[
							styles.toggleButton,
							notifications ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								notifications && styles.activeText
							]}>
							On
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setNotifications(false)}
						style={[
							styles.toggleButton,
							!notifications ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!notifications && styles.activeText
							]}>
							Off
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Setting: Dark Mode */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Dark Mode</Text>
					<Text style={styles.desc}>Enable dark theme</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setDarkMode(true)}
						style={[
							styles.toggleButton,
							darkMode ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								darkMode && styles.activeText
							]}>
							Light
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setDarkMode(false)}
						style={[
							styles.toggleButton,
							!darkMode ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!darkMode && styles.activeText
							]}>
							Dark
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Setting: Public Profile */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Public Profile</Text>
					<Text style={styles.desc}>Profile visible to everyone</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setPublicProfile(true)}
						style={[
							styles.toggleButton,
							publicProfile ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								publicProfile && styles.activeText
							]}>
							Public
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setPublicProfile(false)}
						style={[
							styles.toggleButton,
							!publicProfile ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!publicProfile && styles.activeText
							]}>
							Private
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Setting: History */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>History</Text>
					<Text style={styles.desc}>History visible to others</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setHistory(true)}
						style={[
							styles.toggleButton,
							history ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								history && styles.activeText
							]}>
							Public
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setHistory(false)}
						style={[
							styles.toggleButton,
							!history ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!history && styles.activeText
							]}>
							Private
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Setting: Adult Content */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Adult Content</Text>
					<Text style={styles.desc}>+18 content</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setAdultContent(true)}
						style={[
							styles.toggleButton,
							adultContent ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								adultContent && styles.activeText
							]}>
							Enabled
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setAdultContent(false)}
						style={[
							styles.toggleButton,
							!adultContent ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!adultContent && styles.activeText
							]}>
							Disabled
						</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	);
};

export default ParamScreen;
