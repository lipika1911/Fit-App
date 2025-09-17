"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

import Avatar from "@/components/Avatar"
import ProfileCard from "@/components/ProfileCard"
import EditNameModal from "@/components/EditNameModal"
import { mockUser } from "@/data/mockData"
import { storage, StorageKeys } from "@/utils/storage"
import type { User } from "@/types"

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser)
  const [showEditNameModal, setShowEditNameModal] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const savedUser = await storage.getItem<User>(StorageKeys.USER_DATA)
      if (savedUser) {
        setUser(savedUser)
      }
    } catch (error) {
      console.log("Error loading user data:", error)
    }
  }

  const saveUserData = async (userData: User) => {
    try {
      await storage.setItem(StorageKeys.USER_DATA, userData)
    } catch (error) {
      console.log("Error saving user data:", error)
    }
  }

  const handleNameUpdate = (newName: string) => {
    const updatedUser = { ...user, name: newName }
    setUser(updatedUser)
    saveUserData(updatedUser)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Avatar name={user.name} size={100} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userSubtitle}>Member since {user.joinedDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <ProfileCard
          title="Full Name"
          value={user.name}
          icon="person-outline"
          editable
          onEdit={() => setShowEditNameModal(true)}
        />
        <ProfileCard title="Mobile Number" value={user.mobile} icon="call-outline" />
        <ProfileCard title="City" value={user.city} icon="location-outline" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Membership</Text>
        <ProfileCard title="Available Credits" value={`${user.credits} credits`} icon="card-outline" />
        <ProfileCard title="Member Since" value={user.joinedDate} icon="calendar-outline" />
      </View>

      <EditNameModal
        visible={showEditNameModal}
        currentName={user.name}
        onSave={handleNameUpdate}
        onClose={() => setShowEditNameModal(false)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#fff",
    marginBottom: 24,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 16,
  },
  userSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginHorizontal: 16,
    marginBottom: 12,
  },
})

export default ProfileScreen
