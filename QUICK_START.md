# 🚀 Quick Start - Deploy to Vercel in 5 Minutes

## Step 1: Connect GitHub to Vercel (2 minutes)

1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select **"Import Git Repository"**
5. Choose `Abdullasaqib/test`
6. Click **"Import"**

## Step 2: Configure Environment Variables (1 minute)

In Vercel project settings → Environment Variables, add:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

**Where to find these:**
- Go to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Go to Settings → API
- Copy "Project URL" → `VITE_SUPABASE_URL`
- Copy "anon public" key → `VITE_SUPABASE_PUBLISHABLE_KEY`

## Step 3: Deploy (2 minutes)

1. Click **"Deploy"** in Vercel
2. Wait for build to complete (~2-3 minutes)
3. Your app is live at `https://your-project.vercel.app` 🎉

## Step 4: Deploy Supabase Functions (Required)

After Vercel deployment, deploy Supabase edge functions:

### Option A: Using Script (Windows)
```powershell
.\deploy-supabase.ps1
```

### Option B: Using Script (Mac/Linux)
```bash
chmod +x deploy-supabase.sh
./deploy-supabase.sh
```

### Option C: Manual
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy ai-coach
supabase functions deploy upload-pitch-video
supabase functions deploy log-client-error
```

## Step 5: Update CORS (Important!)

1. Get your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Edit `supabase/functions/_shared/security.ts`
3. Add your Vercel URL to the `ALLOWED_ORIGINS` array:

```typescript
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-project.vercel.app",  // ← Add this
];
```

4. Commit and push:
```bash
git add supabase/functions/_shared/security.ts
git commit -m "Update CORS for Vercel"
git push
```

5. Redeploy Supabase functions:
```bash
supabase functions deploy ai-coach
supabase functions deploy upload-pitch-video
supabase functions deploy log-client-error
```

## ✅ You're Done!

Your production app is now live with:
- ✅ Frontend deployed on Vercel
- ✅ Backend functions deployed on Supabase
- ✅ Full-stack security enabled
- ✅ CORS configured
- ✅ Environment variables set

## 🧪 Test Your Deployment

1. Visit your Vercel URL
2. Test login/signup
3. Test AI Coach feature
4. Check browser console for errors
5. Verify all features work

## 📚 Need Help?

- **Deployment Issues**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Security Questions**: See [SECURITY_IMPLEMENTATION.md](./SECURITY_IMPLEMENTATION.md)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

