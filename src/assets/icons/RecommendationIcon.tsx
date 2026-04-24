import Svg, { Path } from "react-native-svg";

export default function RecommendationIcon({
	color,
	size = 28
}: {
	color: string;
	size?: number;
}) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M16.5 3A5.49 5.49 0 0 0 12 5.344A5.49 5.49 0 0 0 7.5 3A5.5 5.5 0 0 0 2 8.5c0 5.719 6.5 10.438 10 12.85c3.5-2.412 10-7.131 10-12.85A5.5 5.5 0 0 0 16.5 3"
			/>
		</Svg>
	);
}
