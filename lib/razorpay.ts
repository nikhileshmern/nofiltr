import Razorpay from 'razorpay'
import crypto from 'crypto'

// Server-side Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export interface RazorpayOrderParams {
  amount: number // in paise (INR * 100)
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

export async function createRazorpayOrder(params: RazorpayOrderParams) {
  try {
    const order = await razorpay.orders.create({
      amount: params.amount,
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes,
    })
    return { success: true, order }
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    return { success: false, error }
  }
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const text = `${orderId}|${paymentId}`
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(text)
    .digest('hex')

  return generated_signature === signature
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')

  return generated_signature === signature
}

