import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";
import useSessionStore from "@/src/zustand/sessionStore";
import CustomTabBar from "@/src/components/CustomNavBar";

export default function TabLayout() {
	const isLoggedIn = useSessionStore((state: any) => state.isLoggedIn);

	if (!isLoggedIn) {
		return <Redirect href="/base" />;
	}

	return (
		<View style={{ flex: 1}}>
			<Tabs
				backBehavior={"fullHistory"}
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}>
				<Tabs.Screen
                    name="index"
                    options={{
                        headerShown: false,
                        title: "",
                    }}
                />
				<Tabs.Screen
                    name="search"
                    options={{
                        title: "",
                    }}
                />
				<Tabs.Screen
                    name="recommendation"
                    options={{
                        title: "",
                    }}
                />
                <Tabs.Screen
                    name="swipe"
                    options={{
                        title: "",
                    }}
                />
                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: "",
                    }}
                />
				{/* Routes cachées (href: null) */}
                <Tabs.Screen name="profile" options={{ href: null }} />
                <Tabs.Screen name="commentary" options={{ href: null }} />
                <Tabs.Screen name="friends" options={{ href: null }} />
                <Tabs.Screen name="notifs" options={{ href: null }} />
                <Tabs.Screen name="param" options={{ href: null }} />
                <Tabs.Screen name="movie/[id]" options={{ href: null }} />
                <Tabs.Screen name="person/[id]" options={{ href: null }} />
                <Tabs.Screen name="review/[id]" options={{ href: null }} />
			</Tabs>
		</View>
	);
}
