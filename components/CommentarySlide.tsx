import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CommentaryList from "./CommentaryList";

type Comment = {
  id: number;
  text: string;
  date: string;
  user?: string;
};

type Props = {
  userComments: Comment[];
  friendsComments: Comment[];
};

const CommentarySlide: React.FC<Props> = ({
  userComments,
  friendsComments,
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "myComments", title: "Mes Commentaires" },
    { key: "friendsComments", title: "Commentaires des Amis" },
  ]);

  const renderScene = SceneMap({
    myComments: () => <CommentaryList comments={userComments} />,
    friendsComments: () => <CommentaryList comments={friendsComments} />,
  });

  console.log("Rendering CommentarySlide");

  return (
    <View style={styles.container}>
      <TabView
        style={{ flex: 1, backgroundColor: "#0A1E38" }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
      />
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Test TabView</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  tabBar: {
    backgroundColor: "#143B6F",
  },
});

export default CommentarySlide;
