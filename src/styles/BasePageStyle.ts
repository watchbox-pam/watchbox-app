import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	Logo: {
		alignItems: "center",
		width: "100%",
		height: "auto",
		marginTop: 100
	},
	btns: {
		marginTop: 100,
		width: "75%"
	},
	button: {
		backgroundColor: "#AC2128",
		borderRadius: 12,
		padding: 10,
		alignItems: "center",
		marginVertical: 12
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18
	},
	separator: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 12
	},
	separatorLine: {
		flex: 1,
		height: 1,
		backgroundColor: "rgba(255, 255, 255, 0.4)"
	},
	separatorText: {
		color: "#fff",
		marginHorizontal: 10,
		fontSize: 14
	},
	// Même forme que les autres boutons, fond blanc pour la connexion Google
	googleButton: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 10,
		minHeight: 46,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 12
	},
	// Logo "G" officiel de Google (PNG en 1x/2x/3x, choisi automatiquement selon l'écran)
	googleLogo: {
		width: 22,
		height: 22
	},
	googleButtonText: {
		// Gris du bouton Google d'origine
		color: "#757575",
		fontWeight: "bold",
		fontSize: 18,
		marginLeft: 10
	}
});

export default styles;
