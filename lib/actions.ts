// actions.ts
"use server"

import { revalidatePath } from "next/cache"

export type UserInfo = {
  name: string
  planId: string
  hmoId: string
  walletBalance: number
}

export async function getUserInfo(): Promise<UserInfo> {
  // Replace with your actual database query
  const user = await db.user.findFirst({
    where: { id: await getCurrentUserId() },
    select: {
      name: true,
      planId: true,
      hmoId: true,
      walletBalance: true,
    },
  })
  
  if (!user) throw new Error("User not found")
  return user
}

export async function makePayment(amount: number) {
  try {
    // Replace with your actual payment logic
    await db.transaction.create({
      data: {
        userId: await getCurrentUserId(),
        amount,
        type: "PAYMENT",
      },
    })
    
    await db.user.update({
      where: { id: await getCurrentUserId() },
      data: {
        walletBalance: { increment: amount },
      },
    })
    
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Payment failed" }
  }
}