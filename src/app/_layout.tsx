import { Slot } from "expo-router";
import { View, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styles from "@/src/styles/LayoutStyle";

export default function Root() {
	return (
		<SafeAreaProvider>
			<StatusBar
				barStyle="light-content"
				backgroundColor="#0A1E38"
				translucent={false}
			/>
			<View style={styles.layout}>
				<Slot />
			</View>
		</SafeAreaProvider>
	);
}
