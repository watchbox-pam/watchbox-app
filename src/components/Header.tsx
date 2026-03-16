import { View, Text } from "react-native";
import IconProfile from "./IconProfile";
import styles from "@/src/styles/HeaderStyle";

const Header = ({ title }: { title: string }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<IconProfile />
		</View>
	);
};

export default Header;
