import type React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface FilterChipProps {
  label: string
  selected: boolean
  onPress: () => void
}

const FilterChip: React.FC<FilterChipProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={[styles.chip, selected && styles.selectedChip]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.selectedChipText]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: "#007AFF",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  selectedChipText: {
    color: "#fff",
  },
})

export default FilterChip
