import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import styles from "../../styles/ParamStyle";

type SettingCheckboxItemProps = {
	title: string;
	description: string;
	checked: boolean;
	onToggle: () => void;
};

const SettingCheckboxItem: React.FC<SettingCheckboxItemProps> = ({
	title,
	description,
	checked,
	onToggle
}) => {
	return (
		<View style={styles.CheckboxItem}>
			<View style={{ flex: 1 }}>
				<Text style={styles.text}>{title}</Text>
				<Text style={styles.desc}>{description}</Text>
			</View>
			<Checkbox
				status={checked ? "checked" : "unchecked"}
				onPress={onToggle}
				color="#007AFF"
			/>
		</View>
	);
};

export default SettingCheckboxItem;
