# 🚀 Deploy to Vercel Right Now (3 Minutes)

## ✅ What's Already Done

- ✅ Convex backend deployed: `https://benevolent-kingfisher-429.convex.cloud`
- ✅ Code pushed to GitHub: `https://github.com/Coda1977/artifact-vault`
- ✅ All files ready for deployment

## 🌐 Deploy to Vercel (3 Simple Steps)

### Step 1: Go to Vercel

**Click this link:** [https://vercel.com/new](https://vercel.com/new)

(Sign in with GitHub if you haven't already)

### Step 2: Import Your Repository

1. You'll see "Import Git Repository"
2. Find `Coda1977/artifact-vault` in the list
3. Click **"Import"**

### Step 3: Configure and Deploy

**Framework Preset:** Next.js (auto-detected) ✅

**Environment Variables** - Click "Add" and enter these **exactly**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_CONVEX_URL` | `https://benevolent-kingfisher-429.convex.cloud` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `YourSecurePassword123!` |

**Important:** Change `YourSecurePassword123!` to your own secure password!

**Then click:** "Deploy"

### ⏱️ Wait 2-3 Minutes

Vercel will:
- Build your Next.js app
- Deploy to production
- Give you a URL like: `https://artifact-vault-xyz.vercel.app`

## ✅ Test Your Live Site

Once deployed, Vercel will show you the URL. Click it and:

1. **You'll be redirected to `/admin`**
2. **Login with your password**
3. **Create a category** (e.g., "React Components")
4. **Create an artifact** with some HTML code
5. **See the QR code** generate
6. **Copy the share URL**
7. **Visit `/a/[slug]`** to see it publicly

## 🎉 You're Live!

Your Artifact Vault is now running in production!

### Your URLs:
- **Admin:** `https://your-app.vercel.app/admin`
- **Artifacts:** `https://your-app.vercel.app/a/[slug]`
- **Convex Dashboard:** `https://dashboard.convex.dev/d/benevolent-kingfisher-429`

### Share Artifacts:
1. Create an artifact in admin
2. Copy the share URL
3. Share the URL or QR code
4. Anyone can view it without login!

## 🔧 If Something Goes Wrong

### Build Error on Vercel:
- Check that both environment variables are set correctly
- Make sure `NEXT_PUBLIC_CONVEX_URL` has no trailing slash
- Check the build logs in Vercel dashboard

### Can't Login:
- Verify `NEXT_PUBLIC_ADMIN_PASSWORD` is set in Vercel
- Try incognito/private browsing mode
- Clear browser cache

### Artifacts Not Loading:
- Check Convex URL is correct
- Visit Convex dashboard to see if functions are deployed
- Check browser console for errors

## 🎯 Alternative: Deploy via Vercel CLI

If you prefer command line:

```bash
cd artifact-vault
npx vercel

# When prompted for environment variables, add:
# NEXT_PUBLIC_CONVEX_URL=https://benevolent-kingfisher-429.convex.cloud
# NEXT_PUBLIC_ADMIN_PASSWORD=your-password

# Then deploy to production:
npx vercel --prod
```

---

**That's it!** Your Artifact Vault will be live in production in just 3 minutes! 🚀

**Go to:** [https://vercel.com/new](https://vercel.com/new) and start deploying!