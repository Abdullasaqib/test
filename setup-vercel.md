# Vercel Deployment Setup - Step by Step

## 🎯 Quick Start (5 Minutes)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose `Abdullasaqib/test`
   - Click **"Import"**

3. **Configure Project**
   - Framework: **Vite** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Add Environment Variables**
   Click **"Environment Variables"** and add:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```
   
   Optional (for AI features):
   ```
   LOVABLE_API_KEY=your_lovable_api_key
   ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No (first time)
# - Project name? next-billion-lab (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

## 🔧 Post-Deployment Steps

### 1. Update CORS in Supabase Functions

After getting your Vercel URL, update CORS:

1. Edit `supabase/functions/_shared/security.ts`
2. Add your Vercel domain:

```typescript
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-project.vercel.app",  // ← Add this
  "https://your-project-git-main.vercel.app",  // ← Preview URLs
];
```

3. Commit and push:
```bash
git add supabase/functions/_shared/security.ts
git commit -m "Update CORS for Vercel deployment"
git push
```

### 2. Deploy Supabase Functions

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy functions
supabase functions deploy ai-coach
supabase functions deploy upload-pitch-video
supabase functions deploy log-client-error
```

Or use the provided script:
```bash
# Windows PowerShell
.\deploy-supabase.ps1

# Linux/Mac
chmod +x deploy-supabase.sh
./deploy-supabase.sh
```

### 3. Test Deployment

1. Visit your Vercel URL
2. Test authentication (login/signup)
3. Test AI Coach feature
4. Check browser console for errors
5. Verify Supabase connection

## 🔐 Environment Variables Reference

| Variable | Where to Get | Required |
|----------|--------------|----------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL | ✅ Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase Dashboard → Settings → API → anon/public key | ✅ Yes |
| `LOVABLE_API_KEY` | Lovable Dashboard → API Keys | ⚠️ Optional |

## 📊 Monitoring & Logs

### Vercel Dashboard
- **Deployments**: View all deployments and logs
- **Analytics**: Performance metrics
- **Logs**: Real-time function logs

### Supabase Dashboard
- **Edge Functions**: View function logs
- **Database**: Monitor queries
- **Auth**: User management

## 🚨 Troubleshooting

### Build Fails
- Check Node.js version (Vercel uses Node 18+)
- Verify all dependencies install correctly
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names match exactly

### CORS Errors
- Verify CORS origins in `supabase/functions/_shared/security.ts`
- Ensure Vercel URL is in `ALLOWED_ORIGINS`
- Redeploy Supabase functions after CORS update

### Authentication Issues
- Verify Supabase URL and keys are correct
- Check browser console for errors
- Verify Supabase project is active

## ✅ Production Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Supabase functions deployed
- [ ] CORS origins updated
- [ ] Authentication tested
- [ ] API endpoints tested
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)

## 🎉 You're Live!

Your app is now deployed and ready for production testing!

**Next Steps:**
1. Test all features thoroughly
2. Monitor error logs
3. Set up custom domain (optional)
4. Configure analytics
5. Set up monitoring alerts

