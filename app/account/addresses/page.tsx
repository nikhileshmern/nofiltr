import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'My Addresses',
  description: 'Manage your shipping addresses.',
}

export default async function AddressesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: addresses } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl font-bold text-ink">
              My Addresses
            </h1>
            <Button>Add New Address</Button>
          </div>

          {addresses && addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{address.full_name}</span>
                      {address.is_default && (
                        <span className="text-sm px-3 py-1 rounded-full bg-accent-brown/10 text-accent-brown font-normal">
                          Default
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-ink/70 space-y-1">
                      <p>{address.address_line1}</p>
                      {address.address_line2 && <p>{address.address_line2}</p>}
                      <p>
                        {address.city}, {address.state} {address.pincode}
                      </p>
                      <p>Phone: {address.phone}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {!address.is_default && (
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-beige rounded-2xl">
              <p className="text-ink/60 mb-4">No addresses saved yet</p>
              <Button>Add Your First Address</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

