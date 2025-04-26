import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	StyleSheet,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import { addFriend } from "./utils/utils";

export interface Friend {
	id: number;
	name: string;
}

const FriendsScreen: React.FC = () => {
	const [friends, setFriends] = useState<Friend[]>([
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" }
	]);
	const [search, setSearch] = useState("");
	const [newFriend, setNewFriend] = useState("");

	const filteredFriends = friends.filter((friend) =>
		friend.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Liste des amis</Text>
			<TextInput
				style={styles.input}
				placeholder="Rechercher un ami..."
				placeholderTextColor={"#fff"}
				value={search}
				onChangeText={setSearch}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}>
				<FlatList
					data={filteredFriends}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<Text style={styles.friend}>{item.name}</Text>
					)}
				/>
			</KeyboardAvoidingView>
			<TextInput
				style={styles.input}
				placeholder="Ajouter un ami"
				placeholderTextColor={"#fff"}
				value={newFriend}
				onChangeText={setNewFriend}
			/>
			<Button
				title="Ajouter"
				onPress={() =>
					addFriend(newFriend, setFriends, setNewFriend, friends)
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#0A1E38"
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#fff"
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		color: "#fff"
	},
	friend: {
		fontSize: 18,
		paddingVertical: 5,
		color: "#fff"
	}
});

export default FriendsScreen;
