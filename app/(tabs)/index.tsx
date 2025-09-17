import ClassCard from "@/components/ClassCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { mockClasses } from "@/data/mockData";
import {FitnessClass } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC = () => {
  const [classes, setClasses] = useState<FitnessClass[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setClasses(mockClasses)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingSpinner message="Loading classes..." />
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.listWrapper}>
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClassCard fitnessClass={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={true}
          bounces={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listWrapper: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
})

export default HomeScreen
