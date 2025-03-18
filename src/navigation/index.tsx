import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RecommendationScreen from "../screens/RecommendationScreen"; // Chemin vers votre écran
import ResultatScreen from "../screens/ResultatScreen"; // Chemin vers votre écran
import { RootStackParamList } from "./types"; // Importation des types

// Créez le Stack Navigator en utilisant le type RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="RecommendationScreen">
				<Stack.Screen
					name="RecommendationScreen"
					component={RecommendationScreen}
				/>
				<Stack.Screen
					name="ResultatScreen"
					component={ResultatScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
