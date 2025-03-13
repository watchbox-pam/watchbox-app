import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
	return (
		<View style={{ flex: 1, backgroundColor: "#0A1E38" }}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#AC2821",
					tabBarInactiveTintColor: "#F5EFF7",
					tabBarStyle: {
						backgroundColor: "#313131",
						borderTopEndRadius: 50,
						borderTopStartRadius: 50,
						height: 80,
						paddingTop: 10,
						paddingRight: 20,
						paddingLeft: 20,
						borderTopWidth: 0
					},
					tabBarLabelStyle: {
						marginTop: 5
					},
					headerShown: false
				}}>
				<Tabs.Screen
					name="index"
					options={{
						headerShown: false,
						title: "Home",
						tabBarIcon: ({ color }) => (
							<MaterialIcons
								size={28}
								name="home"
								color={color}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						title: "Recherche",
						tabBarIcon: ({ color }) => (
							<MaterialIcons
								size={28}
								name="search"
								color={color}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="recommendation"
					options={{
						title: "Recommande",
						tabBarIcon: ({ color }) => (
							<MaterialIcons
								size={28}
								name="favorite"
								color={color}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="swipe"
					options={{
						title: "Swipe",
						tabBarIcon: ({ color }) => (
							<MaterialIcons
								size={28}
								name="swipe"
								color={color}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profil",
						tabBarIcon: ({ color }) => (
							<MaterialIcons
								size={28}
								name="person"
								color={color}
							/>
						)
					}}
				/>
			</Tabs>
		</View>
	);
}
