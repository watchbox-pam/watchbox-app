// components/PieChartComponent.tsx
import React from "react";
import { PieChart } from "react-native-svg-charts";
import { TouchableOpacity } from "react-native";

const PieChartComponent = ({ emotions, onEmotionSelect }) => {
	const data = emotions.map((emotion, index) => ({
		key: emotion.key,
		value: 1,
		svg: { fill: emotion.color },
		onPress: () => onEmotionSelect(index)
	}));

	return <PieChart style={{ height: 300, width: 300 }} data={data} />;
};

export default PieChartComponent;
