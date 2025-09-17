export interface BookingResult {
  success: boolean
  message: string
}

export const simulateBooking = async (classId: string): Promise<BookingResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // 15% chance of failure as specified in requirements
  const shouldFail = Math.random() < 0.15

  if (shouldFail) {
    return {
      success: false,
      message: "Sorry, we couldn't book this class. Please try again.",
    }
  }

  return {
    success: true,
    message: "Your class has been booked successfully!",
  }
}
