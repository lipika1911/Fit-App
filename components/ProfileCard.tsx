import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ProfileCardProps {
  title: string
  value: string
  editable?: boolean
  onEdit?: () => void
  icon?: keyof typeof Ionicons.glyphMap
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, value, editable = false, onEdit, icon }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {icon && <Ionicons name={icon} size={20} color="#666" style={styles.icon} />}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        {editable && onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  editButton: {
    padding: 8,
  },
})

export default ProfileCard
