import type { FitnessClass, User } from "@/types"

export const mockClasses: FitnessClass[] = [
  {
    id: "1",
    name: "Morning Yoga Flow",
    level: "Beginner",
    instructor: "Sarah Johnson",
    center: "Downtown Wellness Center",
  },
  {
    id: "2",
    name: "HIIT Bootcamp",
    level: "Advanced",
    instructor: "Mike Chen",
    center: "FitZone Gym",
  },
  {
    id: "3",
    name: "Pilates Core",
    level: "Intermediate",
    instructor: "Emma Davis",
    center: "Harmony Studio",
  },
  {
    id: "4",
    name: "Beginner Strength Training",
    level: "Beginner",
    instructor: "John Smith",
    center: "PowerHouse Fitness",
  },
  {
    id: "5",
    name: "Advanced Vinyasa",
    level: "Advanced",
    instructor: "Sarah Johnson",
    center: "Downtown Wellness Center",
  },
  {
    id: "6",
    name: "Cardio Blast",
    level: "Intermediate",
    instructor: "Lisa Wong",
    center: "FitZone Gym",
  },
  {
    id: "7",
    name: "Gentle Stretching",
    level: "Beginner",
    instructor: "Emma Davis",
    center: "Harmony Studio",
  },
  {
    id: "8",
    name: "CrossFit WOD",
    level: "Advanced",
    instructor: "Mike Chen",
    center: "PowerHouse Fitness",
  },
]

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  mobile: "+1 (555) 123-4567",
  credits: 8,
  city: "San Francisco",
  joinedDate: "January 2024",
}

export const instructors = Array.from(new Set(mockClasses.map((c) => c.instructor)))

