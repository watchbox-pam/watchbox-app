// src/assets/icons/ProfileIcon.tsx
import { Image } from "react-native";

export default function ProfileIcon({
	size = 30,
	color = "#4a5f8a"
}: {
	size?: number;
	color?: string;
}) {
	return (
		<Image
			source={require("@/src/assets/images/default-user.png")}
			style={{
				width: size,
				height: size,
				borderRadius: size / 2,
				borderWidth: 2,
				borderColor: color
			}}
		/>
	);
}
