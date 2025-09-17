import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import FilterChip from "./FilterChip"
import type { FilterState } from "@/types"

interface FilterSectionProps {
  filters: FilterState
  onLevelToggle: (level: string) => void
  onClearFilters: () => void
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onLevelToggle, onClearFilters }) => {
  const levels = ["Beginner", "Intermediate", "Advanced"]
  const hasActiveFilters = filters.level.length > 0

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Filters</Text>
        {hasActiveFilters && (
          <TouchableOpacity onPress={onClearFilters}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Level</Text>
        <View style={styles.chipContainer}>
          {levels.map((level) => (
            <FilterChip
              key={level}
              label={level}
              selected={filters.level.includes(level)}
              onPress={() => onLevelToggle(level)}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  clearText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

export default FilterSection
