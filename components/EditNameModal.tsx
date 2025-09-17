"use client"

import type React from "react"
import { useState } from "react"
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface EditNameModalProps {
  visible: boolean
  currentName: string
  onSave: (newName: string) => void
  onClose: () => void
}

const EditNameModal: React.FC<EditNameModalProps> = ({ visible, currentName, onSave, onClose }) => {
  const [name, setName] = useState(currentName)

  const handleSave = () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      Alert.alert("Invalid Name", "Please enter a valid name.", [{ text: "OK" }])
      return
    }

    if (trimmedName === currentName) {
      onClose()
      return
    }

    onSave(trimmedName)
    onClose()
  }

  const handleClose = () => {
    setName(currentName) // Reset to original name
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Edit Name</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoFocus
              maxLength={50}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
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
  cancelText: {
    fontSize: 16,
    color: "#666",
  },
  saveText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1a1a1a",
  },
})

export default EditNameModal
