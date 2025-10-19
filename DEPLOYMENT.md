# Deployment Guide for NOFILTR.

This guide covers deploying your NOFILTR. storefront to production.

## Pre-Deployment Checklist

- [ ] All environment variables are configured
- [ ] Supabase database schema is deployed
- [ ] Demo products are seeded (or real products added)
- [ ] Product images are uploaded to Supabase Storage
- [ ] Razorpay account is set up (use live keys for production)
- [ ] Shiprocket account is configured
- [ ] Domain name is purchased (if applicable)
- [ ] SSL certificate is ready (automatic with Vercel)
- [ ] Google Analytics is set up (optional)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest and most optimized platform for Next.js applications.

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Make sure to add them for all environments (Production, Preview, Development)

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

6. **Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - SSL is automatically provisioned

#### Vercel Configuration

Create `vercel.json` (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["bom1"]
}
```

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build your app:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

4. Add environment variables in Netlify dashboard

### Option 3: Railway

1. Sign up at [Railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Option 4: Self-Hosted with Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Update `next.config.js`:
```javascript
output: 'standalone',
```

Build and run:
```bash
docker build -t nofiltr .
docker run -p 3000:3000 --env-file .env.local nofiltr
```

## Post-Deployment Setup

### 1. Update Environment URLs

Update these in your `.env` (production):
```
SITE_URL=https://nofiltr.com
NEXT_PUBLIC_SITE_URL=https://nofiltr.com
```

### 2. Configure Webhooks

#### Razorpay Webhooks
1. Go to [Razorpay Dashboard → Webhooks](https://dashboard.razorpay.com/app/webhooks)
2. Create new webhook
3. URL: `https://yourdomain.com/api/webhooks/razorpay`
4. Select events:
   - `payment.captured`
   - `payment.failed`
5. Copy webhook secret to env variables

#### Shiprocket Webhooks
1. Go to Shiprocket Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/shiprocket`
3. Enable events:
   - Shipment Created
   - Status Update
   - Delivered

### 3. Update Razorpay to Live Mode

1. Switch from test keys to live keys
2. Complete KYC verification
3. Update env variables:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```

### 4. DNS Configuration

If using custom domain:

**A Records:**
```
@ → 76.76.21.21
```

**CNAME Records:**
```
www → yourdomain.vercel.app
```

Wait for DNS propagation (up to 48 hours).

### 5. SEO Setup

1. **Google Search Console:**
   - Add and verify your domain
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Google Analytics:**
   - Verify tracking is working
   - Set up conversion goals

3. **Meta Tags:**
   - Verify OG images are loading
   - Test with [OpenGraph Preview](https://www.opengraph.xyz/)

### 6. Performance Optimization

1. **Enable Caching:**
   Vercel automatically caches static assets.

2. **Image Optimization:**
   Next.js automatically optimizes images.

3. **Database Connection Pooling:**
   Supabase handles this automatically.

4. **Monitor Performance:**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Target: 90+ score on all metrics
   - Use Vercel Analytics for real-time monitoring

## Monitoring & Logging

### Vercel Analytics (Recommended)

Enable in Vercel dashboard:
- Real-time performance metrics
- Web Vitals tracking
- No code changes needed

### Sentry (Optional)

For error tracking:

```bash
npm install @sentry/nextjs
```

Initialize:
```javascript
// sentry.client.config.js
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Supabase Logs

Monitor database:
- Query performance
- RLS policy violations
- Authentication events

## Backup Strategy

### Database Backups

Supabase Pro includes:
- Daily automatic backups
- Point-in-time recovery
- Manual backups on demand

### Code Backups

- Git repository (GitHub/GitLab)
- Tag each production release
- Use semantic versioning

## Scaling Considerations

### Database
- Supabase auto-scales with your plan
- Upgrade to Pro for production workloads
- Monitor connection pool usage

### CDN
- Vercel Edge Network (automatic)
- Or use Cloudflare (optional)

### Storage
- Supabase Storage scales automatically
- Consider CDN for images (Cloudflare Images)

## Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] RLS policies are enabled on all tables
- [ ] API keys are rotated regularly
- [ ] HTTPS is enforced (automatic with Vercel)
- [ ] CSP headers are configured
- [ ] Rate limiting is enabled (Vercel Pro)
- [ ] Webhook signatures are verified

## Rollback Plan

If something goes wrong:

1. **Vercel:**
   - Go to Deployments
   - Click previous deployment
   - Click "Promote to Production"

2. **Database:**
   - Restore from Supabase backup
   - Go to Database → Backups
   - Select backup and restore

3. **Code:**
   - Revert git commit
   - Redeploy

## Support & Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor analytics
- Review performance metrics

**Monthly:**
- Update dependencies
- Review security advisories
- Backup critical data

**Quarterly:**
- Performance audit
- SEO review
- User feedback analysis

### Getting Help

- Vercel: [vercel.com/support](https://vercel.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Community: [GitHub Discussions](https://github.com)

## Production Checklist

Before going live:

- [ ] Test full checkout flow
- [ ] Verify payment processing
- [ ] Test on mobile devices
- [ ] Check all pages load correctly
- [ ] Verify email notifications work
- [ ] Test order tracking
- [ ] Review all content for typos
- [ ] Check legal pages (Terms, Privacy)
- [ ] Set up customer support email
- [ ] Create social media accounts
- [ ] Prepare launch marketing

---

🚀 You're ready to launch NOFILTR. to the world!

For questions or issues, refer to the main README.md or create an issue in the repository.

