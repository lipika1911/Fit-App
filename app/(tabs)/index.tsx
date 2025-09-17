import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingSpinner message="Loading classes..." />
  }

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

export default HomeScreen
