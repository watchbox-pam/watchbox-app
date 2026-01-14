import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import styles from "../styles/IconProfilStyle";

type RootStackParamList = {
	profile: undefined;
};

const IconProfile = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate("profile"); // ou le nom que tu as donné à ta route ProfileScreen
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.imagePosterContainer}>
				<Image
					source={require("../assets/images/default-user.png")}
					style={styles.ProfilPicture}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default IconProfile;
