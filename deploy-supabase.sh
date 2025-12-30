#!/bin/bash

# Supabase Functions Deployment Script
# Run this after deploying to Vercel

echo "🚀 Deploying Supabase Edge Functions..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Deploy functions
echo "📦 Deploying ai-coach function..."
supabase functions deploy ai-coach

echo "📦 Deploying upload-pitch-video function..."
supabase functions deploy upload-pitch-video

echo "📦 Deploying log-client-error function..."
supabase functions deploy log-client-error

echo "✅ All functions deployed successfully!"
echo ""
echo "⚠️  Don't forget to:"
echo "1. Update CORS origins in supabase/functions/_shared/security.ts"
echo "2. Add your Vercel domain to ALLOWED_ORIGINS"
echo "3. Redeploy functions after updating CORS"


