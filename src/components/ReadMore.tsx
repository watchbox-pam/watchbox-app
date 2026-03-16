import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import StyledText from "./StyledText";
import styles from "@/src/styles/ReadMoreStyle";

export default function ReadMore({ data }: { readonly data: any }) {
	const [showFullBio, setShowFullBio] = useState(false);

	return (
		<View style={styles.biographyContainer}>
			<StyledText>
				{data
					? showFullBio
						? data
						: `${data.substring(0, 400)}...`
					: "Information non disponible"}
			</StyledText>
			{data && data.length > 100 && (
				<TouchableOpacity
					style={styles.readMoreButton}
					onPress={() => setShowFullBio(!showFullBio)}>
					<StyledText style={styles.readMoreText}>
						{showFullBio ? "Lire moins" : "Lire plus"}
					</StyledText>
				</TouchableOpacity>
			)}
		</View>
	);
}
