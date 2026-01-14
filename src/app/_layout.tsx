import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "@/src/styles/LayoutStyle";

export default function Root() {
	return (
		<SafeAreaProvider>
			<StatusBar translucent={true} />
			<SafeAreaView style={styles.layout}>
				<Slot />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
