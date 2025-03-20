import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";

const ParamScreen: React.FC = () => {
	const [accueil, setAccueil] = useState(false);
	const [plateforme, setPlateforme] = useState(false);
	const [notifications, setNotifications] = useState(false);
	const [darkMode, setDarkMode] = useState(true);
	const [profilpublic, setProfilpublic] = useState(false);
	const [historique, setHistorique] = useState(false);
	const [adulte, setAdulte] = useState(false);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.paramTitle}>Paramètres</Text>
				<Logo />
			</View>

			{/* Paramètre 1 : Accueil */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Accueil</Text>
					<Text style={styles.desc}>Home - Swipe</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setAccueil(true)}
						style={[
							styles.toggleButton,
							accueil ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								accueil && styles.activeText
							]}>
							Home
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setAccueil(false)}
						style={[
							styles.toggleButton,
							!accueil ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!accueil && styles.activeText
							]}>
							Swipe
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Paramètre 2 : Plateforme */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Plateforme</Text>
					<Text style={styles.desc}>
						Plateformes que vous utilisez
					</Text>
				</View>
				<View style={styles.toggleContainer}></View>
			</View>

			{/* Paramètre 3 : Notifications */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Notifications</Text>
					<Text style={styles.desc}>Recevoir des notifications</Text>
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

			{/* Paramètre 4 : Mode Sombre */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Mode Sombre</Text>
					<Text style={styles.desc}>Activer le mode sombre</Text>
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

			{/* Paramètre 5 : Profil Public */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Profil Public</Text>
					<Text style={styles.desc}>Profil visible par tous</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setProfilpublic(true)}
						style={[
							styles.toggleButton,
							profilpublic ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								profilpublic && styles.activeText
							]}>
							Public
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setProfilpublic(false)}
						style={[
							styles.toggleButton,
							!profilpublic ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!profilpublic && styles.activeText
							]}>
							Privé
						</Text>
					</Pressable>
				</View>
			</View>
			{/* Paramètre 6 : Historique */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Historique</Text>
					<Text style={styles.desc}>Historique visible par tous</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setHistorique(true)}
						style={[
							styles.toggleButton,
							historique ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								historique && styles.activeText
							]}>
							Public
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setHistorique(false)}
						style={[
							styles.toggleButton,
							!historique ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!historique && styles.activeText
							]}>
							Privé
						</Text>
					</Pressable>
				</View>
			</View>
			{/* Paramètre 7 : Adulte */}
			<View style={styles.item}>
				<View>
					<Text style={styles.text}>Contenu Adulte</Text>
					<Text style={styles.desc}>Contenu +18</Text>
				</View>
				<View style={styles.toggleContainer}>
					<Pressable
						onPress={() => setAdulte(true)}
						style={[
							styles.toggleButton,
							adulte ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								adulte && styles.activeText
							]}>
							activé
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setAdulte(false)}
						style={[
							styles.toggleButton,
							!adulte ? styles.active : styles.inactive
						]}>
						<Text
							style={[
								styles.toggleText,
								!adulte && styles.activeText
							]}>
							desactivé
						</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#0A1E38",
		width: "100%"
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	paramTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		//marginVertical: 10,
		backgroundColor: "#143b71",
		borderRadius: 8,
		width: "100%",
		height: 70,
		marginHorizontal: "auto",
		marginBottom: 30
	},
	text: { fontSize: 18, color: "#fff" },
	desc: { fontSize: 12, color: "#fff" },
	toggleContainer: {
		flexDirection: "row",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#0A1E38",
		height: "80%",
		alignItems: "center"
	},
	toggleButton: {
		paddingVertical: 10,
		padding: 15,
		width: 68,
		alignItems: "center"
	},
	active: {
		backgroundColor: "#143b71",
		height: "80%",
		marginHorizontal: 10,
		borderRadius: 8
	},
	inactive: {
		backgroundColor: "#0A1E38"
	},
	toggleText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold"
	},
	activeText: {
		color: "#fff"
	}
});

export default ParamScreen;
