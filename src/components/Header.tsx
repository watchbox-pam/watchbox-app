import { View, Text } from "react-native";
import IconProfile from "./IconProfile";
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
			<IconProfile />
		</View>
	);
};

export default Header;
