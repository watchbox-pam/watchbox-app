import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
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
        name="home/home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recherche/recherche"
        options={{
          title: "Recherche",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="search1" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommande/recommande"
        options={{
          title: "Recommande",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="swipe/swipe"
        options={{
          title: "Swipe",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="swipe" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil/profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="person" color={color} />
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
