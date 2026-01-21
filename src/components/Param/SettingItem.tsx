import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "../../styles/ParamStyle";

type SettingItemProps = {
	title: string;
	description?: string;
	isLoading?: boolean;
	showChevron?: boolean;
	onPress?: () => void;
	isDanger?: boolean;
};

const SettingItem: React.FC<SettingItemProps> = ({
	title,
	description,
	isLoading = false,
	showChevron = false,
	onPress,
	isDanger = false
}) => {
	const Component = onPress ? TouchableOpacity : View;
	const itemStyle = isDanger ? styles.Reditem : styles.item;

	return (
		<Component style={itemStyle} onPress={onPress}>
			<View style={{ flex: 1 }}>
				<Text style={styles.text}>{title}</Text>
				{description &&
					(isLoading ? (
						<ActivityIndicator size="small" color="#007AFF" />
					) : (
						<Text style={styles.desc}>{description}</Text>
					))}
			</View>
			{showChevron && <IconButton icon="chevron-right" />}
		</Component>
	);
};

export default SettingItem;
