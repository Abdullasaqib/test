# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b89d711d-e8d4-45fe-b80a-652f1defce62

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b89d711d-e8d4-45fe-b80a-652f1defce62) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🚀 How to Deploy to Vercel (Production)

This project is configured for production deployment on Vercel with full-stack security.

### Quick Deploy (5 minutes)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import repository: `Abdullasaqib/test`
   - Vercel will auto-detect Vite configuration

2. **Configure Environment Variables**
   Add these in Vercel project settings:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

3. **Deploy**
   - Click "Deploy" and wait for build (~2-3 minutes)
   - Your app will be live!

4. **Deploy Supabase Functions**
   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase functions deploy ai-coach
   supabase functions deploy upload-pitch-video
   supabase functions deploy log-client-error
   ```

5. **Update CORS**
   - Edit `supabase/functions/_shared/security.ts`
   - Add your Vercel URL to `ALLOWED_ORIGINS`
   - Redeploy functions

📖 **Full deployment guide**: See [setup-vercel.md](./setup-vercel.md) and [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Security Features

✅ **Frontend Security**
- Authentication checks on all protected routes
- Input validation and sanitization
- Client-side rate limiting
- Session validation

✅ **Backend Security**
- JWT token verification
- Server-side rate limiting
- CORS origin restrictions
- Ownership verification

📖 **Security details**: See [SECURITY_IMPLEMENTATION.md](./SECURITY_IMPLEMENTATION.md)

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
