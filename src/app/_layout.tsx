import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "@/src/styles/LayoutStyle";
import { PaperProvider } from "react-native-paper";

export default function Root() {
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<StatusBar
					translucent={false}
					backgroundColor="#102A4C"
					barStyle="light-content"
				/>
				<SafeAreaView style={styles.layout}>
					<Slot />
				</SafeAreaView>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
