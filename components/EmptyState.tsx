import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface EmptyStateProps {
  title: string
  message: string
  actionText?: string
  onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, actionText, onAction }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={64} color="#ccc" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionText && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default EmptyState
