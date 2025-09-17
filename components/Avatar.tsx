import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface AvatarProps {
  name: string
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 80 }) => {
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ")
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  const textStyle = {
    fontSize: size * 0.4,
  }

  return (
    <View style={[styles.avatar, avatarStyle]}>
      <Text style={[styles.initials, textStyle]}>{getInitials(name)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontWeight: "600",
  },
})

export default Avatar
