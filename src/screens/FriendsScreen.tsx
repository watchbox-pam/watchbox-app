import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import styles from "@/src/styles/FriendsSreenStyle";

interface Friend {
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

	const addFriend = () => {
		if (newFriend.trim()) {
			setFriends([
				...friends,
				{ id: Date.now(), name: newFriend.trim() }
			]);
			setNewFriend("");
		}
	};

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
			<Button title="Ajouter" onPress={addFriend} />
		</View>
	);
};

export default FriendsScreen;
