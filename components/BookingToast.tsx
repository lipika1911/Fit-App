"use client"

import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { useEffect } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"

interface BookingToastProps {
  visible: boolean
  message: string
  type: "success" | "error"
  onHide: () => void
}

const BookingToast: React.FC<BookingToastProps> = ({ visible, message, type, onHide }) => {
  const opacity = new Animated.Value(0)

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2500),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide()
      })
    }
  }, [visible, opacity, onHide])

  if (!visible) return null

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={[styles.toast, type === "success" ? styles.successToast : styles.errorToast]}>
        <Ionicons
          name={type === "success" ? "checkmark-circle" : "alert-circle"}
          size={20}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successToast: {
    backgroundColor: "#4CAF50",
  },
  errorToast: {
    backgroundColor: "#F44336",
  },
  icon: {
    marginRight: 12,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
})

export default BookingToast
