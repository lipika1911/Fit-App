import ClassCard from "@/components/ClassCard";
import FilterSection from "@/components/FilterSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { mockClasses } from "@/data/mockData";
import {FilterState, FitnessClass } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const HomeScreen: React.FC = () => {
  const [classes, setClasses] = useState<FitnessClass[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filters, setFilters] = useState<FilterState>({
    level: []
  })

  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      const levelMatch = filters.level.length === 0 || filters.level.includes(cls.level)
      return levelMatch
    })
  }, [classes, filters])

  const handleLevelToggle = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      level: prev.level.includes(level) ? prev.level.filter((l) => l !== level) : [...prev.level, level],
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      level: [],
    })
  }

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
      <FilterSection
        filters={filters}
        onLevelToggle={handleLevelToggle}
        onClearFilters={handleClearFilters}
      />

      <View style={styles.listWrapper}>
        <FlatList
          data={filteredClasses}
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
