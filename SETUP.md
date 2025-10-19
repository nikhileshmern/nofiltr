# Quick Setup Guide

## 🏁 Fast Track to Running NOFILTR. Locally

### 1. Install Dependencies (2 min)

```bash
cd /Users/nikhilesh/Documents/NOFITLR.
npm install
```

### 2. Create Supabase Project (5 min)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for database provisioning
4. Go to Settings → API
5. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### 3. Configure Environment (2 min)

Create `.env.local`:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your values
nano .env.local
```

Minimum required:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### 4. Deploy Database Schema (3 min)

1. Open Supabase Dashboard → SQL Editor
2. Create new query
3. Paste contents of `lib/supabase/schema.sql`
4. Run query
5. Verify tables created in Table Editor

### 5. Seed Demo Products (2 min)

1. SQL Editor → New query
2. Paste contents of `lib/supabase/seed.sql`
3. Run query
4. Check products table (should have 2 products)

### 6. Setup Storage (3 min)

1. Go to Storage in Supabase
2. Create new bucket: `products`
3. Make bucket **public**
4. Upload sample product images
5. Update seed.sql image URLs or use placeholders

### 7. Download Font (2 min)

**Option A:** Download Satoshi
```bash
# Visit: https://www.fontshare.com/fonts/satoshi
# Download Satoshi Variable
# Place Satoshi-Variable.woff2 in public/fonts/
```

**Option B:** Use Inter only (temporary)
```typescript
// Comment out Satoshi in app/layout.tsx
// The app will fall back to Inter
```

### 8. Run Development Server (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Verification Checklist

- [ ] Home page loads
- [ ] Products visible on shop page
- [ ] Can click into product detail
- [ ] Add to cart works
- [ ] Cart drawer opens
- [ ] No console errors

## 🎯 Next Steps (Optional)

### Add Real Product Images

1. Upload images to Supabase Storage
2. Get public URLs
3. Update products table:

```sql
UPDATE products 
SET main_image_url = 'https://xxxxx.supabase.co/storage/v1/object/public/products/cleanser.jpg',
    hover_image_url = 'https://xxxxx.supabase.co/storage/v1/object/public/products/cleanser-alt.jpg'
WHERE slug = 'daily-face-cleanser';
```

### Setup Razorpay (for payments)

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get test API keys
3. Add to `.env.local`:

```
RAZORPAY_KEY_ID=rzp_test_xxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### Setup Shiprocket (for shipping)

1. Sign up at [shiprocket.in](https://shiprocket.in)
2. Add warehouse address
3. Get API credentials:

```
SHIPROCKET_EMAIL=your-email@example.com
SHIPROCKET_PASSWORD=your-password
```

### Enable Analytics

1. Create GA4 property
2. Get Measurement ID
3. Add to `.env.local`:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🆘 Common Issues

### "Cannot connect to Supabase"
- Check SUPABASE_URL is correct
- Verify keys are copied correctly (no extra spaces)
- Ensure project is not paused

### "Products not showing"
- Verify seed.sql ran successfully
- Check products table has data
- Look at browser console for errors

### Font not loading
- Ensure font file is in `public/fonts/`
- Check filename matches exactly in layout.tsx
- Try hard refresh (Cmd+Shift+R)

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

## 📞 Need Help?

Check:
1. Browser console (F12)
2. Terminal for errors
3. Supabase logs
4. README.md for full documentation

---

**Estimated Total Setup Time: ~20 minutes**

Once running, you can customize:
- Brand colors in `tailwind.config.ts`
- Products in Supabase
- Content in components
- Styles in `app/globals.css`

🎉 Happy building!

