import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle different Shiprocket events
    switch (body.event) {
      case 'shipment.created':
        await handleShipmentCreated(body.data)
        break
      case 'shipment.status_update':
        await handleShipmentStatusUpdate(body.data)
        break
      case 'shipment.delivered':
        await handleShipmentDelivered(body.data)
        break
      default:
        console.log('Unhandled Shiprocket event:', body.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Shiprocket webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleShipmentCreated(data: any) {
  const { order_id, shipment_id, awb_code } = data

  await supabase
    .from('orders')
    .update({
      shiprocket_shipment_id: shipment_id,
      tracking_url: `https://shiprocket.co/tracking/${awb_code}`,
      status: 'shipped',
      updated_at: new Date().toISOString(),
    })
    .eq('shiprocket_order_id', order_id)
}

async function handleShipmentStatusUpdate(data: any) {
  const { order_id, current_status } = data

  await supabase
    .from('orders')
    .update({
      status: current_status,
      updated_at: new Date().toISOString(),
    })
    .eq('shiprocket_order_id', order_id)
}

async function handleShipmentDelivered(data: any) {
  const { order_id } = data

  await supabase
    .from('orders')
    .update({
      status: 'delivered',
      updated_at: new Date().toISOString(),
    })
    .eq('shiprocket_order_id', order_id)
}

