"use client"

import type React from "react"
import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { FitnessClass } from "@/types"

interface ClassCardProps {
  fitnessClass: FitnessClass
  onQuickBook: (classId: string) => Promise<void>
}

const ClassCard: React.FC<ClassCardProps> = ({ fitnessClass, onQuickBook }) => {
  const [isBooking, setIsBooking] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "#4CAF50"
      case "Intermediate":
        return "#FF9800"
      case "Advanced":
        return "#F44336"
      default:
        return "#757575"
    }
  }

  const handleBookPress = async () => {
    if (isBooking || fitnessClass.isBooked) return

    setIsBooking(true)
    try {
      await onQuickBook(fitnessClass.id)
    } finally {
      setIsBooking(false)
    }
  }

  const getButtonContent = () => {
    if (isBooking) {
      return <ActivityIndicator size="small" color="#fff" />
    }
    if (fitnessClass.isBooked) {
      return "Booked"
    }
    return "Quick Book"
  }

  const getButtonStyle = () => {
    if (fitnessClass.isBooked) {
      return [styles.bookButton, styles.bookedButton]
    }
    if (isBooking) {
      return [styles.bookButton, styles.bookingButton]
    }
    return styles.bookButton
  }

  const getButtonTextStyle = () => {
    if (fitnessClass.isBooked) {
      return [styles.bookButtonText, styles.bookedButtonText]
    }
    return styles.bookButtonText
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.className}>{fitnessClass.name}</Text>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(fitnessClass.level) }]}>
          <Text style={styles.levelText}>{fitnessClass.level}</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <Text style={styles.instructor}>Instructor: {fitnessClass.instructor}</Text>
        <Text style={styles.center}>Center: {fitnessClass.center}</Text>
      </View>

      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handleBookPress}
        disabled={fitnessClass.isBooked || isBooking}
        activeOpacity={0.8}
      >
        {typeof getButtonContent() === "string" ? (
          <Text style={getButtonTextStyle()}>{getButtonContent()}</Text>
        ) : (
          getButtonContent()
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  className: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  cardDetails: {
    marginBottom: 16,
  },
  instructor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 20,
  },
  center: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
  },
  bookedButton: {
    backgroundColor: "#E0E0E0",
  },
  bookingButton: {
    backgroundColor: "#0056CC",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bookedButtonText: {
    color: "#666",
  },
})

export default ClassCard
