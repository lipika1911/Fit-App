import AsyncStorage from "@react-native-async-storage/async-storage"

export const StorageKeys = {
  USER_DATA: "userData",
} as const

export const storage = {
  async setItem(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Storage setItem error:", error)
      throw error
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Storage getItem error:", error)
      return null
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error("Storage removeItem error:", error)
      throw error
    }
  },
}
