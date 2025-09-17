import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={styles.view}
    >
      <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
