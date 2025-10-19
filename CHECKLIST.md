# NOFILTR. Setup & Launch Checklist

Use this checklist to get your store up and running.

## ✅ Initial Setup (Day 1)

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] Code editor ready (VS Code recommended)
- [ ] Terminal/Command line access
- [ ] Git installed (optional, for version control)

### Dependencies
- [ ] Run `npm install` in project directory
- [ ] Wait for all packages to install (~2 minutes)
- [ ] No error messages in terminal

### Supabase Setup
- [ ] Create account at supabase.com
- [ ] Create new project (choose region near you)
- [ ] Wait for database provisioning (~2 minutes)
- [ ] Copy Project URL from Settings → API
- [ ] Copy `anon` public key from Settings → API
- [ ] Copy `service_role` secret key from Settings → API

### Environment Variables
- [ ] Create `.env.local` file in root directory
- [ ] Copy contents from `.env.example`
- [ ] Paste Supabase URL
- [ ] Paste Supabase keys
- [ ] Save file

### Database Schema
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Create new query
- [ ] Copy entire contents of `lib/supabase/schema.sql`
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Verify "Success" message
- [ ] Check Table Editor - should see 8 tables

### Demo Data
- [ ] SQL Editor → New query
- [ ] Copy contents of `lib/supabase/seed.sql`
- [ ] Paste and Run
- [ ] Verify 2 products in products table
- [ ] Verify product_images table has entries

### Storage Setup
- [ ] Navigate to Storage in Supabase
- [ ] Create new bucket named `products`
- [ ] Make bucket public (toggle Public bucket)
- [ ] Create policy: "Allow public reads"

### Font Setup
- [ ] Visit https://www.fontshare.com/fonts/satoshi
- [ ] Download Satoshi font
- [ ] Extract `Satoshi-Variable.woff2`
- [ ] Place in `public/fonts/` directory
- [ ] (Or use Inter only as fallback)

### First Run
- [ ] Run `npm run dev` in terminal
- [ ] Open browser to http://localhost:3000
- [ ] Home page loads successfully
- [ ] No errors in browser console (F12)
- [ ] Navigation works
- [ ] Shop page shows products

## 🎨 Content & Design (Day 2-3)

### Product Images
- [ ] Prepare high-quality product photos (1200x1200px)
- [ ] Upload to Supabase Storage → products bucket
- [ ] Copy public URLs
- [ ] Update products table with correct image URLs
- [ ] Verify images load on site

### Product Content
- [ ] Add real product names
- [ ] Write compelling descriptions
- [ ] List accurate ingredients
- [ ] Add usage instructions
- [ ] Set correct prices
- [ ] Add inventory quantities

### Brand Content
- [ ] Customize About page with your story
- [ ] Update brand values
- [ ] Add team photos (optional)
- [ ] Write journal articles
- [ ] Update footer links

### Legal Pages
- [ ] Create Privacy Policy page
- [ ] Create Terms of Service page
- [ ] Create Shipping & Returns policy
- [ ] Create Contact page
- [ ] Add business address in footer

## 💳 Payment Setup (Day 3)

### Razorpay Account
- [ ] Sign up at razorpay.com
- [ ] Complete business KYC (for live mode)
- [ ] Navigate to Dashboard → API Keys
- [ ] Copy Test Key ID
- [ ] Copy Test Key Secret
- [ ] Add to `.env.local`:
  ```
  RAZORPAY_KEY_ID=rzp_test_xxxxx
  NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
  RAZORPAY_KEY_SECRET=xxxxx
  ```
- [ ] Restart dev server
- [ ] Test checkout with test card: 4111 1111 1111 1111

### Webhook Setup
- [ ] For local testing: Install ngrok
- [ ] Run `ngrok http 3000`
- [ ] Copy ngrok URL
- [ ] Go to Razorpay Dashboard → Webhooks
- [ ] Add webhook: `https://your-ngrok-url.com/api/webhooks/razorpay`
- [ ] Select events: payment.captured, payment.failed
- [ ] Copy webhook secret
- [ ] Add to `.env.local`: `RAZORPAY_WEBHOOK_SECRET=xxxxx`

## 🚚 Shipping Setup (Day 3)

### Shiprocket Account
- [ ] Sign up at shiprocket.in
- [ ] Complete business details
- [ ] Add pickup address (warehouse)
- [ ] Add to `.env.local`:
  ```
  SHIPROCKET_EMAIL=your-email@example.com
  SHIPROCKET_PASSWORD=your-password
  ```
- [ ] Test order creation

### Webhook Setup
- [ ] Shiprocket Dashboard → Settings → Webhooks
- [ ] Add webhook URL: `https://your-ngrok-url.com/api/webhooks/shiprocket`
- [ ] Enable shipment events

## 📊 Analytics Setup (Optional)

### Google Analytics
- [ ] Create account at analytics.google.com
- [ ] Create GA4 property
- [ ] Copy Measurement ID (G-XXXXXXXXXX)
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
- [ ] Restart dev server
- [ ] Visit site and check Real-time reports

## 🧪 Testing (Day 4)

### Functionality Testing
- [ ] Browse all pages
- [ ] Click all navigation links
- [ ] Add products to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Proceed to checkout
- [ ] Fill in shipping details
- [ ] Complete test payment
- [ ] Verify order created in Supabase
- [ ] Check Razorpay dashboard for payment

### Mobile Testing
- [ ] Open on mobile device (or Chrome DevTools mobile view)
- [ ] Test navigation menu
- [ ] Test product cards
- [ ] Test add to cart
- [ ] Test checkout form
- [ ] Verify responsive design

### Browser Testing
- [ ] Test in Chrome
- [ ] Test in Safari
- [ ] Test in Firefox
- [ ] Test in Edge (optional)

### Performance Testing
- [ ] Visit https://pagespeed.web.dev/
- [ ] Enter your localhost URL (or use ngrok)
- [ ] Verify scores above 90
- [ ] Fix any critical issues

## 🚀 Deployment (Day 5)

### Pre-Deployment
- [ ] All tests passing
- [ ] All content finalized
- [ ] Images optimized
- [ ] Legal pages complete
- [ ] Environment variables ready

### Vercel Deployment
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel login`
- [ ] Run `vercel` in project directory
- [ ] Follow prompts
- [ ] Add all environment variables in Vercel dashboard
- [ ] Run `vercel --prod` for production deployment
- [ ] Visit deployed URL
- [ ] Test thoroughly

### Domain Setup (Optional)
- [ ] Purchase domain (Namecheap, GoDaddy, etc.)
- [ ] Add domain in Vercel dashboard
- [ ] Update DNS records as instructed
- [ ] Wait for SSL certificate (automatic)
- [ ] Update environment variables:
  ```
  SITE_URL=https://yourdomain.com
  NEXT_PUBLIC_SITE_URL=https://yourdomain.com
  ```
- [ ] Redeploy with updated env vars

### Production Webhooks
- [ ] Update Razorpay webhook URL to production domain
- [ ] Update Shiprocket webhook URL to production domain
- [ ] Test webhooks in production

### Go Live
- [ ] Switch Razorpay to live keys
- [ ] Update Razorpay env vars with live keys
- [ ] Redeploy
- [ ] Test live payment (small amount)
- [ ] Refund test payment

## 📈 Post-Launch (Week 1)

### SEO Setup
- [ ] Submit site to Google Search Console
- [ ] Verify ownership
- [ ] Submit sitemap.xml
- [ ] Check for indexing issues
- [ ] Set up Bing Webmaster Tools (optional)

### Social Media
- [ ] Create Instagram account
- [ ] Create Facebook page
- [ ] Add social links to footer
- [ ] Post launch announcement
- [ ] Share product photos

### Marketing
- [ ] Announce to email list (if you have one)
- [ ] Share on personal networks
- [ ] Consider influencer outreach
- [ ] Set up Facebook/Instagram ads (optional)

### Monitoring
- [ ] Check analytics daily
- [ ] Monitor error logs in Vercel
- [ ] Check Supabase database health
- [ ] Review order flow
- [ ] Respond to customer inquiries

## 🔄 Ongoing Maintenance

### Weekly
- [ ] Check for new orders
- [ ] Process shipments
- [ ] Review analytics
- [ ] Check for errors
- [ ] Backup database (Supabase auto-backups)

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review performance metrics
- [ ] Add new content/products
- [ ] Analyze customer behavior
- [ ] Plan marketing campaigns

### Quarterly
- [ ] Full performance audit
- [ ] Security review
- [ ] Content refresh
- [ ] Feature additions
- [ ] Customer feedback review

## ✨ Enhancement Ideas

Future improvements to consider:
- [ ] Product reviews system
- [ ] Wishlist functionality
- [ ] Email notifications (order confirmation, shipping)
- [ ] Subscription/recurring orders
- [ ] Loyalty program
- [ ] Referral system
- [ ] Live chat support
- [ ] Advanced product filters
- [ ] Product recommendations
- [ ] Blog comments
- [ ] Newsletter signup
- [ ] Social media feed integration

## 🆘 Troubleshooting

Common issues and solutions:

**Site won't start:**
- Check Node.js version (18+)
- Delete node_modules and run `npm install` again
- Check for port conflicts (try `npm run dev -- -p 3001`)

**Images not loading:**
- Verify Supabase Storage bucket is public
- Check image URLs in database
- Update next.config.js with correct domain

**Payments not working:**
- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure NEXT_PUBLIC_RAZORPAY_KEY_ID is set
- Try with test card: 4111 1111 1111 1111

**Database errors:**
- Verify schema was deployed correctly
- Check RLS policies are enabled
- Verify service role key is correct
- Check Supabase project is not paused

## 📞 Getting Help

If you're stuck:
1. Check README.md for detailed documentation
2. Review SETUP.md for step-by-step guide
3. Check browser console for error messages
4. Review Supabase logs in dashboard
5. Check Vercel deployment logs
6. Search Next.js/Supabase documentation

## 🎉 Launch Celebration

Once you've checked off all the boxes:
- [ ] Take a screenshot of your live site
- [ ] Share with friends/family
- [ ] Post on social media
- [ ] Celebrate your achievement! 🎊

---

**You've got this! The NOFILTR. store is ready to transform skincare shopping.**

Your Skin, No Filter. ✨

