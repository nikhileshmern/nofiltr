'use server'

import { createClient } from '@/lib/supabase/server'
import { createRazorpayOrder } from '@/lib/razorpay'
import { createShiprocketOrder } from '@/lib/shiprocket'

export async function createOrder(cartId: string, addressId: string) {
  const supabase = await createClient()

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Get cart items
  const { data: cart } = await supabase
    .from('carts')
    .select('*, cart_items(*, products(*))')
    .eq('id', cartId)
    .single()

  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return { success: false, error: 'Cart is empty' }
  }

  // Calculate total
  const total = cart.cart_items.reduce((sum: number, item: any) => {
    return sum + item.products.price * item.quantity
  }, 0)

  // Get address
  const { data: address } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('id', addressId)
    .single()

  if (!address) {
    return { success: false, error: 'Address not found' }
  }

  // Create order in database
  const orderNumber = `ORD-${Date.now()}`
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      order_number: orderNumber,
      total_amount: total,
      shipping_address: address,
      status: 'pending',
    })
    .select()
    .single()

  if (orderError || !order) {
    return { success: false, error: 'Failed to create order' }
  }

  // Create order items
  const orderItems = cart.cart_items.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price,
  }))

  await supabase.from('order_items').insert(orderItems)

  // Create Razorpay order
  const razorpayResult = await createRazorpayOrder({
    amount: total * 100, // Convert to paise
    receipt: orderNumber,
    notes: {
      order_id: order.id,
      user_id: user.id,
    },
  })

  if (!razorpayResult.success || !razorpayResult.order) {
    return { success: false, error: 'Failed to create payment order' }
  }

  // Update order with Razorpay order ID
  await supabase
    .from('orders')
    .update({ razorpay_order_id: razorpayResult.order.id })
    .eq('id', order.id)

  return {
    success: true,
    orderId: order.id,
    razorpayOrderId: razorpayResult.order.id,
    amount: total,
  }
}

export async function verifyPaymentAndCreateShipment(
  orderId: string,
  paymentId: string,
  signature: string
) {
  const supabase = await createClient()

  // Get order
  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('id', orderId)
    .single()

  if (!order) {
    return { success: false, error: 'Order not found' }
  }

  // Update order with payment details
  await supabase
    .from('orders')
    .update({
      razorpay_payment_id: paymentId,
      status: 'paid',
    })
    .eq('id', orderId)

  // Create Shiprocket order
  const shippingAddress = order.shipping_address as any
  const shiprocketResult = await createShiprocketOrder({
    order_id: order.order_number,
    order_date: new Date().toISOString().split('T')[0],
    billing_customer_name: shippingAddress.full_name.split(' ')[0],
    billing_last_name: shippingAddress.full_name.split(' ').slice(1).join(' '),
    billing_address: shippingAddress.address_line1,
    billing_city: shippingAddress.city,
    billing_pincode: shippingAddress.pincode,
    billing_state: shippingAddress.state,
    billing_country: 'India',
    billing_email: shippingAddress.email || 'customer@nofiltr.com',
    billing_phone: shippingAddress.phone,
    shipping_is_billing: true,
    order_items: order.order_items.map((item: any) => ({
      name: item.products.name,
      sku: item.products.sku,
      units: item.quantity,
      selling_price: item.price,
    })),
    payment_method: 'Prepaid',
    sub_total: order.total_amount,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
  })

  if (shiprocketResult.success) {
    await supabase
      .from('orders')
      .update({
        shiprocket_order_id: shiprocketResult.data.order_id,
        status: 'processing',
      })
      .eq('id', orderId)
  }

  return { success: true }
}

