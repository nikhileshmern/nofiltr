interface ShiprocketAuth {
  token: string
  expiresAt: number
}

let authCache: ShiprocketAuth | null = null

async function getAuthToken(): Promise<string> {
  // Return cached token if still valid
  if (authCache && authCache.expiresAt > Date.now()) {
    return authCache.token
  }

  const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL!,
      password: process.env.SHIPROCKET_PASSWORD!,
    }),
  })

  if (!response.ok) {
    throw new Error('Shiprocket authentication failed')
  }

  const data = await response.json()
  
  // Cache token for 9 days (Shiprocket tokens expire after 10 days)
  authCache = {
    token: data.token,
    expiresAt: Date.now() + 9 * 24 * 60 * 60 * 1000,
  }

  return data.token
}

export interface ShiprocketOrderParams {
  order_id: string
  order_date: string
  billing_customer_name: string
  billing_last_name: string
  billing_address: string
  billing_city: string
  billing_pincode: string
  billing_state: string
  billing_country: string
  billing_email: string
  billing_phone: string
  shipping_is_billing: boolean
  order_items: Array<{
    name: string
    sku: string
    units: number
    selling_price: number
  }>
  payment_method: string
  sub_total: number
  length: number
  breadth: number
  height: number
  weight: number
}

export async function createShiprocketOrder(params: ShiprocketOrderParams) {
  try {
    const token = await getAuthToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Shiprocket order creation failed')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Shiprocket order creation failed:', error)
    return { success: false, error }
  }
}

export async function trackShipment(shipmentId: string) {
  try {
    const token = await getAuthToken()

    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Shiprocket tracking failed')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Shiprocket tracking failed:', error)
    return { success: false, error }
  }
}

export async function generateAWB(shipmentId: string, courierId: number) {
  try {
    const token = await getAuthToken()

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipment_id: shipmentId,
        courier_id: courierId,
      }),
    })

    if (!response.ok) {
      throw new Error('AWB generation failed')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('AWB generation failed:', error)
    return { success: false, error }
  }
}

