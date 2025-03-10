import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import CommentarySlide from "@/components/CommentarySlide";
import CommentaryList from "@/components/CommentaryList";
import Logo from "@/components/Logo";

export default function Index() {
  const userComments = [
    { id: 1, text: "Super film !", date: "2025-02-25T14:00:00Z" },
  ];

  const friendsComments = [
    {
      id: 2,
      user: "Alice",
      text: "Incroyable réalisation !",
      date: "2025-02-26T10:00:00Z",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <CommentarySlide
        userComments={userComments}
        friendsComments={friendsComments}
      />
      <CommentaryList comments={userComments} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1E38",
    margin: 0,
    padding: 0,
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
