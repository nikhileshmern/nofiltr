import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your orders, addresses, and account settings.',
}

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-ink mb-8">
            My Account
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Orders */}
            <Link href="/account/orders">
              <div className="bg-beige rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h2 className="font-display text-2xl font-semibold text-ink mb-3">
                  Orders
                </h2>
                <p className="text-ink/60 mb-4">
                  View and track your orders
                </p>
                <Button variant="outline">View Orders →</Button>
              </div>
            </Link>

            {/* Addresses */}
            <Link href="/account/addresses">
              <div className="bg-beige rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h2 className="font-display text-2xl font-semibold text-ink mb-3">
                  Addresses
                </h2>
                <p className="text-ink/60 mb-4">
                  Manage your shipping addresses
                </p>
                <Button variant="outline">Manage Addresses →</Button>
              </div>
            </Link>

            {/* Profile */}
            <Link href="/account/profile">
              <div className="bg-beige rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h2 className="font-display text-2xl font-semibold text-ink mb-3">
                  Profile
                </h2>
                <p className="text-ink/60 mb-4">
                  Update your account information
                </p>
                <Button variant="outline">Edit Profile →</Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

