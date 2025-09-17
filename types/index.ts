export interface FitnessClass {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
  instructor: string
  center: string
  isBooked?: boolean
}

export interface User {
  id: string
  name: string
  mobile: string
  credits: number
  city: string
  joinedDate: string
  avatar?: string
}

export interface FilterState {
  level: string[]
}