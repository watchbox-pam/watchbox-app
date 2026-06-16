import { ScrollView, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "@/src/styles/BtnRowStyle";

type BtnItem = {
	label: string;
	icon: keyof typeof Ionicons.glyphMap;
	route?: any;
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

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.Row}>
			{items.map((item, index) => (
				<TouchableOpacity
					key={index}
					style={styles.Item}
					onPress={() => item.route && router.push(item.route)}
					activeOpacity={item.route ? 0.7 : 1}
					accessible
					accessibilityLabel={item.label}>
					<Ionicons
						name={item.icon}
						size={item.iconSize ?? iconSize}
						color={item.iconeColor ?? iconColor}
					/>
					{item.count !== undefined && (
						<Text style={styles.Num}>{item.count}</Text>
					)}
					<Text style={styles.Label}>{item.label}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
}
