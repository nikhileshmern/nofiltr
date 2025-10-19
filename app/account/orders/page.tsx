import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { formatPrice, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View and track your orders.',
}

export default async function OrdersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">
            My Orders
          </h1>

          {orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order #{order.order_number}</span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-ink/70">
                      <p>
                        <span className="font-medium">Date:</span>{' '}
                        {formatDate(order.created_at)}
                      </p>
                      <p>
                        <span className="font-medium">Total:</span>{' '}
                        {formatPrice(order.total_amount)}
                      </p>
                      {order.tracking_url && (
                        <a
                          href={order.tracking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-brown hover:underline"
                        >
                          Track Shipment →
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-beige rounded-2xl">
              <p className="text-ink/60 mb-4">You haven't placed any orders yet</p>
              <a
                href="/shop"
                className="text-accent-brown font-medium hover:underline"
              >
                Start Shopping →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

