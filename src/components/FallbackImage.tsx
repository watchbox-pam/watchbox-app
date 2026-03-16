import { useState } from "react";
import { Image, ImageStyle, StyleProp, View, Text } from "react-native";

const NO_IMAGE = require("@/src/assets/images/no-image.png");

interface FallbackImageProps {
	uri: string | null | undefined;
	style: StyleProp<ImageStyle>;
	fallbackStyle?: StyleProp<ImageStyle>;
	resizeMode?: "cover" | "contain" | "stretch" | "center";
}

export default function FallbackImage({
	uri,
	style,
	fallbackStyle,
	resizeMode = "cover"
}: FallbackImageProps) {
	const [hasError, setHasError] = useState(false);

	const isFallback = !uri || hasError;

	if (isFallback) {
		return (
			<View
				style={[
					style,
					{
						backgroundColor: "#1a1a2e",
						borderWidth: 1,
						borderColor: "#AC2821",
						borderRadius: 10,
						aspectRatio: 2 / 3,
						justifyContent: "center",
						alignItems: "center"
					},
					fallbackStyle
				]}>
				<Image
					source={NO_IMAGE}
					style={{
						width: "100%",
						height: "100%",
						resizeMode: "contain",
						borderRadius: 10
					}}
				/>
			</View>
		);
	}

	return (
		<Image
			source={{ uri }}
			style={style}
			resizeMode={resizeMode}
			onError={() => setHasError(true)}
		/>
	);
}
