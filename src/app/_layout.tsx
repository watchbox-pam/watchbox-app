import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import styles from "@/src/styles/LayoutStyle";

export default function Root() {
	return (
		<SafeAreaView style={styles.layout}>
			<Slot />
		</SafeAreaView>
	);
}
