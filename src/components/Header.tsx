import { View, Text } from "react-native";
import IconCalendar from "@/src/components/icons/IconCalendar";
import styles from "@/src/styles/HeaderStyle";

const Header = ({ title }: { title: string }) => {
	return (
		<View style={styles.container}>
			<Text
				style={[styles.title, { flex: 1 }]}
				numberOfLines={1}
				ellipsizeMode="tail">
				{title}
			</Text>
			<IconCalendar />
		</View>
	);
};

export default Header;
