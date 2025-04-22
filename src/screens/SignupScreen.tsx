import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "@/src/components/BackButton";
import Logo from "@/src/components/Logo";
import styles from "@/src/styles/SignupStyle";
import StyledText from "@/src/components/StyledText";
import { useEffect, useState } from "react";
import Country from "@/src/models/Country";
import { Picker } from "@react-native-picker/picker";
import { getAllCountries, registerUser } from "@/src/services/SignupService";
import RNDateTimePicker, {
	DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import UserSignup from "@/src/models/UserSignup";
import useSessionStore from "@/src/zustand/sessionStore";
import { router } from "expo-router";

export default function SignupScreen() {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [countries, setCountries] = useState<Country[]>([]);
	const [country, setCountry] = useState<string>("");
	const [dtPickerVisible, setDtPickerVisible] = useState<boolean>(false);
	const [birthdate, setBirthdate] = useState<Date | null>(null);

	const signIn = useSessionStore((state: any) => state.signIn);

	const getCountries = async () => {
		const countriesResult = await getAllCountries();
		setCountries(countriesResult);
	};

	const onChangeBirthdate = (
		event: DateTimePickerEvent,
		selectedDate: Date
	) => {
		const currentDate = selectedDate;
		setDtPickerVisible(false);
		setBirthdate(currentDate);
	};

	const signupUser = async () => {
		const userToInsert: UserSignup = {
			id: "",
			username: username,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			country: country,
			birthdate: birthdate
		};
		const result = await registerUser(userToInsert);
		if (result.success) {
			signIn(result.message, username);
			router.replace("/");
			return;
		} else {
			alert(result.message);
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<BackButton />
				<Logo />
			</View>
			<StyledText style={styles.title}>Inscription</StyledText>
			<TextInput
				style={styles.input}
				placeholder="Pseudo"
				placeholderTextColor="#fff"
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Adresse mail"
				placeholderTextColor="#fff"
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#fff"
				secureTextEntry
				onChangeText={setPassword}
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirmation mot de passe"
				placeholderTextColor="#fff"
				secureTextEntry
				onChangeText={setConfirmPassword}
			/>
			<Picker
				style={styles.picker}
				selectedValue={country}
				onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
				{countries &&
					countries.map((country: Country) => {
						return (
							<Picker.Item
								key={country.iso}
								label={country.name}
								value={country.iso}
							/>
						);
					})}
			</Picker>
			<Text style={styles.input} onPress={() => setDtPickerVisible(true)}>
				{birthdate
					? birthdate.toLocaleDateString("fr-FR")
					: "--/--/----"}
			</Text>
			{dtPickerVisible && (
				<RNDateTimePicker
					testID="dateTimePicker"
					value={new Date(Date.now())}
					mode="date"
					onChange={onChangeBirthdate}
					minimumDate={new Date(1900, 0, 1)}
					maximumDate={new Date(Date.now())}
				/>
			)}
			<View style={styles.btnSignUp}>
				<TouchableOpacity style={styles.button} onPress={signupUser}>
					<Text style={styles.buttonText}>Créez votre compte</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
