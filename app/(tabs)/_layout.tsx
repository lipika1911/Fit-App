import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return(
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue"}}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({color, focused}) => {
          return focused ? (
            <Ionicons name="home-sharp" size={24} color={color} />
          ) : (
            <Ionicons name="home-outline" size={24} color={color} />
          )
        }
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({color, focused}) => {
          return focused ? (
            <Ionicons name="person" size={24} color={color} />
          ) : (
            <Ionicons name="person-outline" size={24} color={color} />
          )
        }
      }} />
    </Tabs>
  )
}
