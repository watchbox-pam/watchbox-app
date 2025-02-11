import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#AC2821",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#313131",
          borderTopEndRadius: 50,
          borderTopStartRadius: 50,
          height: 80,
          paddingTop: 10,
          paddingRight: 20,
          paddingLeft: 20,
        },
        tabBarLabelStyle: {
          marginTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Recherche",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendation/index"
        options={{
          title: "Recommande",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="favorite" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="swipe/index"
        options={{
          title: "Swipe",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="swipe" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
