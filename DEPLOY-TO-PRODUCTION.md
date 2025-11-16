# 🚀 Deploy to Production - Fast Track

## Prerequisites

- ✅ Convex account (you already have this)
- ✅ Vercel account (free at [vercel.com](https://vercel.com))
- ✅ GitHub account (for code hosting)

## Step 1: Deploy Convex Backend to Production (2 minutes)

```bash
cd artifact-vault
npx convex deploy --prod
```

**What happens:**
- Deploys your Convex functions to production
- Creates production database
- Gives you a production URL like: `https://your-project.convex.cloud`

**Copy the production URL** - you'll need it for Vercel!

## Step 2: Push to GitHub (3 minutes)

```bash
cd artifact-vault
git init
git add .
git commit -m "Initial commit - Artifact Vault"
```

**Create a new repository on GitHub:**
1. Go to [github.com/new](https://github.com/new)
2. Name: `artifact-vault`
3. Make it **Private** (recommended)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

**Push your code:**
```bash
git remote add origin https://github.com/YOUR-USERNAME/artifact-vault.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (5 minutes)

### Option A: Vercel Dashboard (Recommended)

1. **Go to [vercel.com/new](https://vercel.com/new)**

2. **Import your GitHub repository:**
   - Click "Import Git Repository"
   - Select `artifact-vault`
   - Click "Import"

3. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_CONVEX_URL` | `https://your-project.convex.cloud` (from Step 1) |
   | `NEXT_PUBLIC_ADMIN_PASSWORD` | `your-secure-password` (change from admin123!) |

5. **Click "Deploy"**
   - Wait 2-3 minutes for deployment
   - You'll get a URL like: `https://artifact-vault.vercel.app`

### Option B: Vercel CLI (Faster)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd artifact-vault
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? artifact-vault
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_CONVEX_URL production
# Paste your Convex production URL

vercel env add NEXT_PUBLIC_ADMIN_PASSWORD production
# Enter your secure password

# Deploy to production
vercel --prod
```

## Step 4: Verify Deployment (2 minutes)

1. **Visit your Vercel URL:** `https://artifact-vault.vercel.app`
2. **Test the flow:**
   - ✅ Redirects to `/admin`
   - ✅ Login with your password
   - ✅ Create a category
   - ✅ Create an artifact
   - ✅ QR code generates
   - ✅ Copy URL works
   - ✅ Visit `/a/[slug]` publicly

## 🎉 You're Live!

Your Artifact Vault is now running in production!

### **Your URLs:**
- **Admin Dashboard:** `https://artifact-vault.vercel.app/admin`
- **Convex Dashboard:** `https://dashboard.convex.dev/d/outgoing-roadrunner-139`
- **Artifact URLs:** `https://artifact-vault.vercel.app/a/[slug]`

### **Share Artifacts:**
1. Create an artifact in admin
2. Copy the share URL
3. Share the URL or QR code
4. Recipients can view the artifact without any login

## 🔒 Security Checklist

Before sharing publicly:

- [ ] Changed admin password from `admin123` to something secure
- [ ] Tested that public artifact pages work
- [ ] Verified admin area is password-protected
- [ ] Confirmed QR codes work correctly
- [ ] Tested on mobile devices

## 📊 Monitoring

### Convex Dashboard
- View function calls
- Monitor database usage
- Check logs
- **URL:** https://dashboard.convex.dev/d/outgoing-roadrunner-139

### Vercel Dashboard
- View deployments
- Check analytics
- Monitor performance
- **URL:** https://vercel.com/dashboard

## 🔄 Making Updates

### Update Code:
```bash
git add .
git commit -m "Your changes"
git push origin main
```
**Vercel auto-deploys** on every push to main!

### Update Convex Functions:
```bash
npx convex deploy --prod
```

## 💰 Costs

Both services are **FREE** for your use case:

**Convex Free Tier:**
- 1M function calls/month
- 1GB storage
- More than enough for personal use

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains included

## 🆘 Troubleshooting

### Build fails on Vercel:
1. Check environment variables are set
2. Ensure `NEXT_PUBLIC_CONVEX_URL` is correct
3. Check build logs in Vercel dashboard

### Can't access admin:
1. Verify password in Vercel environment variables
2. Clear browser cache
3. Try incognito mode

### Artifacts not loading:
1. Check Convex dashboard for errors
2. Verify Convex production URL is correct
3. Check browser console for errors

## ⚡ Quick Commands Reference

```bash
# Deploy Convex to production
npx convex deploy --prod

# Deploy to Vercel (after git push)
vercel --prod

# View Convex logs
npx convex logs

# View production environment variables
vercel env ls
```

---

**Total deployment time: ~10 minutes**

Your Artifact Vault is now live and ready to use! 🎊