import type React from "react"
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface InstructorModalProps {
  visible: boolean
  instructors: string[]
  selectedInstructor: string
  onSelect: (instructor: string) => void
  onClose: () => void
}

const InstructorModal: React.FC<InstructorModalProps> = ({
  visible,
  instructors,
  selectedInstructor,
  onSelect,
  onClose,
}) => {
  const handleSelect = (instructor: string) => {
    onSelect(instructor)
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Instructor</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={["All Instructors", ...instructors]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.instructorItem} onPress={() => handleSelect(item)}>
                <Text style={[styles.instructorText, selectedInstructor === item && styles.selectedText]}>{item}</Text>
                {selectedInstructor === item && <Ionicons name="checkmark" size={20} color="#007AFF" />}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  instructorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  instructorText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  selectedText: {
    color: "#007AFF",
    fontWeight: "500",
  },
})

export default InstructorModal
