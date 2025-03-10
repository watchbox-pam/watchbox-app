import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type Comment = {
  id: number;
  text: string;
  date: string;
  user?: string;
};

type Props = {
  comments: Comment[];
};

const CommentaryList: React.FC<Props> = ({ comments }) => {
  console.log("Rendering CommentaryList with comments:", comments);
  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.commentCard}>
          {item.user && <Text style={styles.user}>{item.user} :</Text>}
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  commentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#1E2A38",
    borderRadius: 5,
  },
  user: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  commentText: {
    color: "#FFFFFF",
  },
});

export default CommentaryList;
