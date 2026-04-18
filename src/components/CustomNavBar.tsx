import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { Animated, Easing, Dimensions, Pressable, StyleSheet, View } from "react-native";

import HomeIcon from "@/src/assets/icons/HomeIcon";
import SearchIcon from "@/src/assets/icons/SearchIcon";
import RecommendationIcon from "@/src/assets/icons/RecommendationIcon";
import SwipeIcon from "@/src/assets/icons/SwipeIcon";
import CalendarIcon from "@/src/assets/icons/CalendarIcon";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_COUNT = 5;
const TAB_WIDTH = 80;
const OFFSET = (SCREEN_WIDTH - TAB_WIDTH * TAB_COUNT) / 2;
const INDICATOR_WIDTH = 60;

// Maps route name → icon
const TAB_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
    index: "theaters",
    search: "search",
    recommendation: "favorite",
    swipe: "swipe",
    calendar: "calendar-today",
};

export default function CustomNavBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const VISIBLE_TABS = ["index", "search", "recommendation", "swipe", "calendar"];
    // Only keep the 5 visible routes (those with href !== null)
    const visibleRoutes = state.routes.filter(
        (route) => VISIBLE_TABS.includes(route.name)
    );

    const activeVisibleIndex = visibleRoutes.findIndex(
        (r) => r.key === state.routes[state.index].key
    );

    const indicatorAnim = useRef(
        new Animated.Value(activeVisibleIndex >= 0 ? activeVisibleIndex : 0)
    ).current;

    useEffect(() => {
        if (activeVisibleIndex < 0) return;
        Animated.timing(indicatorAnim, {
            toValue: activeVisibleIndex,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [activeVisibleIndex]);

    const indicatorTranslateX = indicatorAnim.interpolate({
        inputRange: visibleRoutes.map((_, i) => i),
        outputRange: visibleRoutes.map(
            (_, i) => OFFSET + i * TAB_WIDTH + (TAB_WIDTH - INDICATOR_WIDTH) / 2
        ),
    });

    return (
        <View style={styles.container}>
            {/* Sliding indicator */}
            <Animated.View
                style={[
                    styles.indicator,
                    { transform: [{ translateX: indicatorTranslateX }] },
                ]}
            />

            {/* Tab buttons */}
            {visibleRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = activeVisibleIndex === index;
                const iconName = TAB_ICONS[route.name] ?? "circle";

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({ type: "tabLongPress", target: route.key });
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        style={styles.tab}
                    >
                        {route.name === "index" ? (
                            <HomeIcon color={isFocused ? "#a8b8f8" : "#4a5f8a"} size={30} />
                        ) : route.name === "search" ? (
                            <SearchIcon color={isFocused ? "#a8b8f8" : "#4a5f8a"} size={30} />
                        ) : route.name === "recommendation" ? (
                            <RecommendationIcon color={isFocused ? "#a8b8f8" : "#4a5f8a"} size={30} />
                        ) : route.name === "swipe" ? (
                            <SwipeIcon color={isFocused ? "#a8b8f8" : "#4a5f8a"} size={30} />
                        ) : route.name === "calendar" ? (
                            <CalendarIcon color={isFocused ? "#a8b8f8" : "#4a5f8a"} size={30} />
                        ) : (
                            <MaterialIcons name={iconName} size={30} color={isFocused ? "#a8b8f8" : "#4a5f8a"} />
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
        paddingHorizontal: OFFSET,
        position: "relative",
    },
    tab: {
        width: 80,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    indicator: {
        position: "absolute",
        top: 0,
        width: INDICATOR_WIDTH,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#a8b8f8",
    },
});