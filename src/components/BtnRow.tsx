import { useState } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "@/src/styles/BtnRowStyle";

type BtnItem = {
	label: string;
	icon: keyof typeof Ionicons.glyphMap;
	iconActive?: keyof typeof Ionicons.glyphMap;
	route?: any;
	onPress?: () => void;
	toggle?: boolean;
	count?: number | string;
	iconSize?: number;
	iconeColor?: string;
};

type BtnRowProps = {
	items: BtnItem[];
	iconSize?: number;
	iconColor?: string;
};

export default function BtnRow({
	items,
	iconSize = 24,
	iconColor = "#ffffff"
}: BtnRowProps) {
	const router = useRouter();
	const [activeStates, setActiveStates] = useState<Record<number, boolean>>(
		{}
	);

	const handlePress = (index: number, item: BtnItem) => {
		if (item.toggle) {
			setActiveStates((prev) => ({
				...prev,
				[index]: !prev[index]
			}));
		}

		if (item.onPress) {
			item.onPress();
		} else if (item.route) {
			router.push(item.route);
		}
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.Row}>
			{items.map((item, index) => {
				const isActive = !!activeStates[index];
				const iconName =
					item.toggle && isActive && item.iconActive
						? item.iconActive
						: item.icon;

				return (
					<TouchableOpacity
						key={index}
						style={styles.Item}
						onPress={() => handlePress(index, item)}
						activeOpacity={item.route || item.onPress ? 0.7 : 1}
						accessible
						accessibilityLabel={item.label}>
						<Ionicons
							name={iconName}
							size={item.iconSize ?? iconSize}
							color={
								isActive
									? "#1E90FF"
									: (item.iconeColor ?? iconColor)
							}
						/>
						{item.count !== undefined && (
							<Text style={styles.Num}>{item.count}</Text>
						)}
						<Text style={styles.Label}>{item.label}</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}
