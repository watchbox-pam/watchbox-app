// assets/icons/HomeIcon.tsx
import Svg, { Path } from "react-native-svg";

export default function HomeIcon({
	color,
	size = 28
}: {
	color: string;
	size?: number;
}) {
	return (
		<Svg width={size} height={size} viewBox="0 0 100 100">
			<Path
				fill={color}
				d="M86.45 23.27h-3.475v66.91c0 .835-.677 1.513-1.513 1.513H31.987v3.475c0 .836.677 1.513 1.513 1.513h52.951c.836 0 1.513-.677 1.513-1.513V24.782a1.513 1.513 0 0 0-1.514-1.512"
			/>
			<Path
				fill={color}
				d="M77.988 85.193V14.807c0-.836-.677-1.513-1.513-1.513H73v66.911c0 .836-.677 1.513-1.513 1.513H22.011v3.475c0 .836.677 1.513 1.513 1.513h52.951c.836 0 1.513-.677 1.513-1.513"
			/>
			<Path
				fill={color}
				d="M68.013 75.218V4.832c0-.836-.677-1.513-1.513-1.513H13.55c-.836 0-1.513.677-1.513 1.513v70.386c0 .836.677 1.513 1.513 1.513H66.5c.836 0 1.513-.677 1.513-1.513"
			/>
		</Svg>
	);
}
