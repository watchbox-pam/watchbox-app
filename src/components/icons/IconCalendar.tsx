import { TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import CalendarIcon from "@/src/components/icons/CalendarIcon";

type RootStackParamList = {
	calendar: undefined;
};

const IconCalendar = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<TouchableOpacity onPress={() => navigation.navigate("calendar")}>
			<CalendarIcon color="#ffffff" size={30} />
		</TouchableOpacity>
	);
};

export default IconCalendar;
