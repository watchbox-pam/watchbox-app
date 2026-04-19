import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export default function Stars({ rating }: { rating: number }) {
	const [stars, setStars] = useState<MaterialIconName[]>([]);

	useEffect(() => {
		const starsArray: MaterialIconName[] = [];
		const fullStars: number = Math.floor(rating / 2);
		for (let i: number = 0; i < fullStars; i++) {
			starsArray.push("star");
		}
		if (rating % 2 !== 0) {
			starsArray.push("star-half");
		}
		while (starsArray.length < 5) {
			starsArray.push("star-border");
		}
		setStars(starsArray);
	}, [rating]);

	return (
		<View style={{ flexDirection: "row" }}>
			{stars &&
				stars.map((star, index) => {
					return (
						<MaterialIcons
							size={15}
							key={index}
							name={star}
							color={"#fff"}
						/>
					);
				})}
		</View>
	);
}
