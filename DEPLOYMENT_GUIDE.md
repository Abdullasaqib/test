# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Connect GitHub Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import from GitHub: Select `Abdullasaqib/test`
4. Vercel will auto-detect Vite configuration

### Step 2: Configure Environment Variables

In Vercel project settings, add these environment variables:

#### Required Variables:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

#### Optional (for AI features):
```
LOVABLE_API_KEY=your_lovable_api_key
```

### Step 3: Build Settings (Auto-detected)

Vercel should automatically detect:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Deploy Supabase Edge Functions

After Vercel deployment, deploy Supabase functions:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy ai-coach
supabase functions deploy upload-pitch-video
supabase functions deploy log-client-error
```

### Step 5: Update CORS Origins

After Vercel deployment, update CORS in Supabase:

1. Get your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
2. Edit `supabase/functions/_shared/security.ts`
3. Add your Vercel domain to `ALLOWED_ORIGINS`:

```typescript
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-app.vercel.app",  // Add your Vercel URL
  "https://your-app-git-main.vercel.app",  // Preview deployments
  "https://your-production-domain.com",  // Custom domain
];
```

4. Commit and push changes
5. Redeploy Supabase functions

### Step 6: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update CORS origins in Supabase functions

## 🔧 Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Supabase functions deployed
- [ ] CORS origins updated in Supabase
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Build successful on Vercel
- [ ] Test authentication flow
- [ ] Test API endpoints
- [ ] Monitor error logs

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and errors

### Supabase Dashboard
- Monitor edge function logs
- Check database performance
- Review error logs

## 🔐 Security Checklist

- [ ] Environment variables are secure (not exposed in client)
- [ ] CORS origins are restricted
- [ ] Rate limiting is active
- [ ] Authentication is working
- [ ] HTTPS is enforced (automatic with Vercel)

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (Vercel uses Node 18+ by default)
- Verify all dependencies in `package.json`
- Check build logs in Vercel dashboard

### API Errors
- Verify Supabase environment variables
- Check Supabase function logs
- Verify CORS configuration

### Authentication Issues
- Verify Supabase URL and keys
- Check browser console for errors
- Verify session storage is working

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key | Yes |
| `LOVABLE_API_KEY` | For AI Coach features | Optional |

## 🔄 Continuous Deployment

Vercel automatically deploys on:
- Push to `main`/`master` branch → Production
- Push to other branches → Preview deployment
- Pull requests → Preview deployment

## 📞 Support

For issues:
1. Check Vercel deployment logs
2. Check Supabase function logs
3. Review browser console errors
4. Check `SECURITY_IMPLEMENTATION.md` for security details

