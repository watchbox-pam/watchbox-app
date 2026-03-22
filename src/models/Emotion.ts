import { ImageSourcePropType } from "react-native";

type Emotion = {
	id: number;
	label: string;
	value: string;
	startAngle: number;
	endAngle: number;
	image: ImageSourcePropType;
	gradient: [string, string];
	color: string;
};

export default Emotion;
