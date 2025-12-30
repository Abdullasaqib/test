# Supabase Functions Deployment Script for Windows PowerShell
# Run this after deploying to Vercel

Write-Host "🚀 Deploying Supabase Edge Functions..." -ForegroundColor Cyan

# Check if Supabase CLI is installed
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g supabase
}

# Deploy functions
Write-Host "📦 Deploying ai-coach function..." -ForegroundColor Green
supabase functions deploy ai-coach

Write-Host "📦 Deploying upload-pitch-video function..." -ForegroundColor Green
supabase functions deploy upload-pitch-video

Write-Host "📦 Deploying log-client-error function..." -ForegroundColor Green
supabase functions deploy log-client-error

Write-Host "✅ All functions deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Don't forget to:" -ForegroundColor Yellow
Write-Host "1. Update CORS origins in supabase/functions/_shared/security.ts"
Write-Host "2. Add your Vercel domain to ALLOWED_ORIGINS"
Write-Host "3. Redeploy functions after updating CORS"


