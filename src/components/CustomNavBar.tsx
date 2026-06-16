import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	interpolate
} from "react-native-reanimated";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import HomeIcon from "@/src/assets/icons/HomeIcon";
import SearchIcon from "@/src/assets/icons/SearchIcon";
import RecommendationIcon from "@/src/assets/icons/RecommendationIcon";
import SwipeIcon from "@/src/assets/icons/SwipeIcon";
//import CalendarIcon from "@/src/assets/icons/CalendarIcon";
import ProfileIcon from "@/src/assets/icons/ProfileIcon";

const VISIBLE_TABS = ["index", "search", "recommendation", "swipe", "profile"];

const PADDING = 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_COUNT = VISIBLE_TABS.length;
const TAB_WIDTH = (SCREEN_WIDTH - PADDING * 2) / TAB_COUNT;
const INDICATOR_WIDTH = TAB_WIDTH * 0.6;

export default function CustomNavBar({
	state,
	descriptors,
	navigation
}: BottomTabBarProps) {
	const visibleRoutes = state.routes.filter((route) =>
		VISIBLE_TABS.includes(route.name)
	);

	const activeVisibleIndex = visibleRoutes.findIndex(
		(r) => r.key === state.routes[state.index].key
	);

	const indicatorAnim = useSharedValue(
		activeVisibleIndex >= 0 ? activeVisibleIndex : 0
	);

	useEffect(() => {
		if (activeVisibleIndex < 0) return;
		indicatorAnim.value = withSpring(activeVisibleIndex, {
			damping: 18,
			stiffness: 160,
			mass: 0.8
		});
	}, [activeVisibleIndex]);

	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(
					indicatorAnim.value,
					visibleRoutes.map((_, i) => i),
					visibleRoutes.map(
						(_, i) =>
							PADDING +
							i * TAB_WIDTH +
							(TAB_WIDTH - INDICATOR_WIDTH) / 2
					)
				)
			}
		]
	}));

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.indicator, indicatorStyle]} />

			{visibleRoutes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = activeVisibleIndex === index;
				const color = isFocused ? "#a8b8f8" : "#4a5f8a";

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true
					});
					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key
					});
				};

				return (
					<Pressable
						key={route.key}
						onPress={onPress}
						onLongPress={onLongPress}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						style={styles.tab}>
						{route.name === "index" ? (
							<HomeIcon color={color} size={35} />
						) : route.name === "search" ? (
							<SearchIcon color={color} size={35} />
						) : route.name === "recommendation" ? (
							<RecommendationIcon color={color} size={35} />
						) : route.name === "swipe" ? (
							<SwipeIcon color={color} size={35} />
						) : (
							<ProfileIcon color={color} size={35} />
						)}
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#0F2E57",
		height: 80,
		alignItems: "center",
		position: "relative",
		paddingHorizontal: 16
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: "100%"
	},
	indicator: {
		position: "absolute",
		top: 0,
		width: INDICATOR_WIDTH,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#a8b8f8"
	}
});
