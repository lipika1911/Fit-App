"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { View, FlatList, StyleSheet } from "react-native"

import ClassCard from "@/components/ClassCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import EmptyState from "@/components/EmptyState"
import FilterSection from "@/components/FilterSection"
import InstructorModal from "@/components/InstructorModal"
import BookingToast from "@/components/BookingToast"
import { mockClasses, instructors } from "@/data/mockData"
import { simulateBooking } from "@/utils/bookingService"
import type { FitnessClass, FilterState } from "@/types"

interface ToastState {
  visible: boolean
  message: string
  type: "success" | "error"
}

const HomeScreen: React.FC = () => {
  const [classes, setClasses] = useState<FitnessClass[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    level: [],
    instructor: "All Instructors",
  })
  const [showInstructorModal, setShowInstructorModal] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "success",
  })

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setClasses(mockClasses)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      const levelMatch = filters.level.length === 0 || filters.level.includes(cls.level)
      const instructorMatch = filters.instructor === "All Instructors" || cls.instructor === filters.instructor
      return levelMatch && instructorMatch
    })
  }, [classes, filters])

  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  const handleQuickBook = async (classId: string): Promise<void> => {
    setClasses((prev) => prev.map((cls) => (cls.id === classId ? { ...cls, isBooked: true } : cls)))

    try {
      const result = await simulateBooking(classId)

      if (result.success) {
        showToast(result.message, "success")
      } else {
        setClasses((prev) => prev.map((cls) => (cls.id === classId ? { ...cls, isBooked: false } : cls)))
        showToast(result.message, "error")
      }
    } catch (error) {
      setClasses((prev) => prev.map((cls) => (cls.id === classId ? { ...cls, isBooked: false } : cls)))
      showToast("An unexpected error occurred. Please try again.", "error")
    }
  }

  const handleLevelToggle = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      level: prev.level.includes(level) ? prev.level.filter((l) => l !== level) : [...prev.level, level],
    }))
  }

  const handleInstructorSelect = (instructor: string) => {
    setFilters((prev) => ({
      ...prev,
      instructor,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      level: [],
      instructor: "All Instructors",
    })
  }

  if (loading) {
    return <LoadingSpinner message="Loading classes..." />
  }

  if (filteredClasses.length === 0) {
    const hasActiveFilters = filters.level.length > 0 || filters.instructor !== "All Instructors"
    return (
      <View style={styles.container}>
        <FilterSection
          filters={filters}
          onLevelToggle={handleLevelToggle}
          onInstructorPress={() => setShowInstructorModal(true)}
          onClearFilters={handleClearFilters}
        />
        <EmptyState
          title="No Classes Found"
          message={
            hasActiveFilters
              ? "We couldn't find any classes matching your current filters."
              : "No classes are available at the moment."
          }
          actionText={hasActiveFilters ? "Clear Filters" : undefined}
          onAction={hasActiveFilters ? handleClearFilters : undefined}
        />
        <InstructorModal
          visible={showInstructorModal}
          instructors={instructors}
          selectedInstructor={filters.instructor}
          onSelect={handleInstructorSelect}
          onClose={() => setShowInstructorModal(false)}
        />
        <BookingToast visible={toast.visible} message={toast.message} type={toast.type} onHide={hideToast} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FilterSection
        filters={filters}
        onLevelToggle={handleLevelToggle}
        onInstructorPress={() => setShowInstructorModal(true)}
        onClearFilters={handleClearFilters}
      />

      <View style={styles.listWrapper}>
        <FlatList
          data={filteredClasses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClassCard fitnessClass={item} onQuickBook={handleQuickBook} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={true}
          bounces={true}
        />
      </View>

      <InstructorModal
        visible={showInstructorModal}
        instructors={instructors}
        selectedInstructor={filters.instructor}
        onSelect={handleInstructorSelect}
        onClose={() => setShowInstructorModal(false)}
      />

      <BookingToast visible={toast.visible} message={toast.message} type={toast.type} onHide={hideToast} />
    </View>
  )
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
