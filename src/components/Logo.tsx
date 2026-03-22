import React from "react";
import { Image, View } from "react-native";
import styles from "@/src/styles/LogoStyle";

const LogoButton = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require("@/src/assets/images/watchbox-logo.png")}
				style={{ width: 50, height: 50 }}
				resizeMode="contain"
			/>
		</View>
	);
};

export default LogoButton;
