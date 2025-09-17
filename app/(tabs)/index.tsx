import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={styles.view}
    >
      <Text>Home Screen</Text>
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
