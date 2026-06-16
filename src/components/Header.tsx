import { View } from "react-native";
import IconCalendar from "@/src/components/icons/IconCalendar";
import styles from "@/src/styles/HeaderStyle";
import StyledText from "@/src/components/StyledText";

const Header = ({ title }: { title: string }) => {
	return (
		<View style={styles.container}>
			<StyledText
				style={[styles.title, { flex: 1 }]}
				numberOfLines={1}
				ellipsizeMode="tail">
				{title}
			</StyledText>
			<IconCalendar />
		</View>
	);
};

export default Header;
