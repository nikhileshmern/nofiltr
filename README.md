# NOFILTR. - Premium D2C Skincare Storefront

A modern, high-performance e-commerce platform built for the premium skincare brand **NOFILTR.** featuring clean design, seamless checkout, and powerful integrations.

## 🎨 Design System

- **Brand Colors:**
  - Warm Beige Background: `#E8D9C8`
  - Ink Text: `#111111`
  - Accent Brown (for "R."): `#B9835B`

- **Typography:**
  - Display/Headings: Satoshi Variable (fallback: General Sans)
  - Body: Inter

- **UI Philosophy:**
  - Rounded-2xl cards
  - Soft shadows and elegant whitespace
  - Framer Motion micro-interactions
  - Mobile-first, responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Payments:** Razorpay (INR)
- **Shipping:** Shiprocket
- **State Management:** Zustand
- **Analytics:** Google Analytics 4

## 📁 Project Structure

```
nofiltr-storefront/
├── app/
│   ├── (routes)
│   │   ├── page.tsx              # Home page
│   │   ├── shop/page.tsx         # Product listing
│   │   ├── products/[slug]/      # Product detail pages
│   │   ├── journal/              # Blog/articles
│   │   ├── account/              # User account pages
│   │   └── checkout/             # Checkout flow
│   ├── api/
│   │   └── webhooks/             # Razorpay & Shiprocket webhooks
│   ├── actions/                  # Server actions
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # SEO robots
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Header, Footer
│   ├── home/                     # Home page sections
│   ├── products/                 # Product components
│   ├── shop/                     # Shop filters
│   └── cart/                     # Cart drawer
├── lib/
│   ├── supabase/                 # Supabase client & types
│   ├── store/                    # Zustand stores
│   ├── seo/                      # SEO utilities & schema
│   ├── razorpay.ts               # Razorpay integration
│   ├── shiprocket.ts             # Shiprocket integration
│   └── utils.ts                  # Helper functions
└── public/
    └── fonts/                    # Custom fonts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project
- Razorpay account (test/live mode)
- Shiprocket account
- Google Analytics 4 property (optional)

### 1. Clone and Install

```bash
cd /Users/nikhilesh/Documents/NOFITLR.
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Site Configuration
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-key-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# Shiprocket
SHIPROCKET_EMAIL=your-email@example.com
SHIPROCKET_PASSWORD=your-password

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Set Up Supabase

#### a) Run the Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `lib/supabase/schema.sql`
4. Execute the query

#### b) Seed Demo Data

1. After running the schema, run `lib/supabase/seed.sql` to add demo products
2. Update image URLs in the seed data to point to your actual images

#### c) Storage Setup

1. Create a storage bucket named `products`
2. Set it to public
3. Upload product images

### 4. Font Setup

Download **Satoshi Variable** font:
- From: https://www.fontshare.com/fonts/satoshi
- Place `Satoshi-Variable.woff2` in `public/fonts/`

Alternative fonts:
- General Sans: https://www.fontshare.com/fonts/general-sans
- Inter (already included via Google Fonts)

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Features Implemented

### ✅ Core Pages
- [x] Home page with hero, bestsellers, values, reviews, journal teasers
- [x] Shop (PLP) with filters (skin type) and sorting
- [x] Product Detail Page (PDP) with gallery, tabs, related products
- [x] Journal/Blog with MDX support
- [x] Account pages (orders, addresses, profile)

### ✅ E-Commerce Features
- [x] Shopping cart (Zustand + localStorage)
- [x] Add to cart with animations
- [x] Cart drawer with quantity controls
- [x] Razorpay payment integration
- [x] Order creation and management
- [x] Shiprocket shipping integration

### ✅ UI/UX
- [x] Responsive design (mobile-first)
- [x] Framer Motion animations (hero, cards, page transitions)
- [x] Sticky header with scroll effects
- [x] Product card hover image swap
- [x] Toast notifications
- [x] Loading states

### ✅ SEO & Performance
- [x] Next.js Metadata API
- [x] JSON-LD schemas (Product, Breadcrumb, Article, Organization)
- [x] Dynamic sitemap.xml
- [x] robots.txt
- [x] Image optimization with next/image
- [x] Font optimization

### ✅ Analytics
- [x] Google Analytics 4 integration
- [x] Event tracking (view_item, add_to_cart, begin_checkout, purchase)

### ✅ Backend
- [x] Supabase database with RLS policies
- [x] Server-side rendering for products
- [x] Server actions for mutations
- [x] Webhook handlers (Razorpay, Shiprocket)

## 🔐 Authentication Setup

### Enable Supabase Auth

1. Go to Authentication → Providers in Supabase
2. Enable Email/Password authentication
3. Configure email templates
4. (Optional) Enable OAuth providers (Google, Facebook)

### Create Login/Signup Pages

```bash
# Add these pages:
app/login/page.tsx
app/signup/page.tsx
```

Example login form with Supabase:

```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const supabase = createClient()
  
  async function handleLogin(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Login error:', error)
    } else {
      router.push('/account')
    }
  }
  
  // ... form UI
}
```

## 💳 Payment Flow

### Razorpay Integration

1. **Create Order:** Server action creates Razorpay order
2. **Client Checkout:** Razorpay checkout modal opens
3. **Payment Success:** Webhook updates order status
4. **Shipment Creation:** Shiprocket order is created automatically

### Testing Razorpay

Use test cards:
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

## 🚢 Shipping with Shiprocket

### Setup

1. Create a Shiprocket account
2. Add your warehouse/pickup address
3. Enable COD/Prepaid as needed
4. Configure webhook URL in Shiprocket dashboard:
   - `https://yourdomain.com/api/webhooks/shiprocket`

### Order Flow

1. Order placed → Razorpay payment
2. Payment success → Auto-create Shiprocket order
3. Shiprocket assigns courier
4. Tracking URL sent to customer
5. Webhooks update order status

## 📊 Analytics Events

Tracked events:
- `view_item` - Product page view
- `add_to_cart` - Item added to cart
- `begin_checkout` - Checkout initiated
- `purchase` - Order completed

Events are automatically sent to GA4.

## 🎯 Performance Optimization

- **Lighthouse Score Target:** 95+ for Performance, SEO, Accessibility
- Image optimization via `next/image`
- Font preloading
- Code splitting
- Lazy loading for images
- Suspense boundaries for async components

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard.

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm run start

# Type check
npm run type-check

# Lint
npm run lint
```

## 📝 Adding Products

### Via Supabase Dashboard

1. Go to Table Editor → products
2. Click "Insert row"
3. Fill in product details
4. Upload images to Storage → products bucket
5. Copy public URL and paste in `main_image_url`

### Bulk Import

Use the Supabase SQL editor to run INSERT statements for multiple products.

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  beige: '#E8D9C8',
  ink: '#111111',
  'accent-brown': '#B9835B',
}
```

### Fonts

Replace Satoshi in `app/layout.tsx`:

```typescript
const customFont = localFont({
  src: '../public/fonts/YourFont.woff2',
  variable: '--font-custom',
})
```

## 🐛 Troubleshooting

### Images Not Loading
- Check Supabase Storage permissions
- Verify `next.config.js` has correct image domains
- Ensure images are in public bucket

### Razorpay Checkout Not Opening
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check browser console for errors
- Ensure you're using test key for development

### Webhooks Not Working
- Use ngrok for local testing: `ngrok http 3000`
- Add ngrok URL to Razorpay/Shiprocket webhook settings
- Check webhook signature verification

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [Shiprocket API Docs](https://apidocs.shiprocket.in/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

This is a custom project for NOFILTR. brand. For modifications:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📄 License

Proprietary - © 2024 NOFILTR. All rights reserved.

## 🎉 Success Checklist

- [ ] Supabase project created and schema deployed
- [ ] Environment variables configured
- [ ] Demo products seeded
- [ ] Fonts downloaded and placed
- [ ] Razorpay account set up
- [ ] Shiprocket account configured
- [ ] Test order placed successfully
- [ ] Webhooks tested
- [ ] Analytics verified
- [ ] Deployed to production
- [ ] Custom domain configured
- [ ] SSL certificate active

---

Built with ❤️ for clean, effective skincare.

**NOFILTR.** - Your Skin, No Filter.

