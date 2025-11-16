#!/bin/bash

echo "🚀 Deploying Artifact Vault to Production"
echo ""

# Step 1: Deploy Convex
echo "📦 Step 1: Deploying Convex backend..."
npx convex deploy -y

# Step 2: Install Vercel CLI if needed
echo ""
echo "📦 Step 2: Installing Vercel CLI..."
npm install -g vercel

# Step 3: Deploy to Vercel
echo ""
echo "🌐 Step 3: Deploying to Vercel..."
echo ""
echo "⚠️  IMPORTANT: When prompted, add these environment variables:"
echo "   NEXT_PUBLIC_CONVEX_URL=https://benevolent-kingfisher-429.convex.cloud"
echo "   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password"
echo ""
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Visit your Vercel URL"
echo "2. Go to /admin"
echo "3. Login with your password"
echo "4. Start creating artifacts!"