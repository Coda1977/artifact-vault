# Deployment Guide - Artifact Vault

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- A Convex account (free at [convex.dev](https://convex.dev))
- A Vercel account (free at [vercel.com](https://vercel.com))
- Git installed

## Step 1: Set Up Convex Backend

1. **Install Convex CLI globally (optional):**
   ```bash
   npm install -g convex
   ```

2. **Initialize Convex in your project:**
   ```bash
   cd artifact-vault
   npx convex dev
   ```

3. **Follow the prompts:**
   - Create a new project or link to existing
   - This will generate the `convex/_generated` folder with TypeScript types
   - Copy the deployment URL provided

4. **Update your `.env.local`:**
   ```env
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
   ```

## Step 2: Test Locally

1. **Start Convex dev server (in one terminal):**
   ```bash
   npx convex dev
   ```

2. **Start Next.js dev server (in another terminal):**
   ```bash
   npm run dev
   ```

3. **Test the application:**
   - Navigate to `http://localhost:3000`
   - You should be redirected to `/admin`
   - Enter your admin password
   - Try creating a category
   - Try creating an artifact
   - Test the QR code generation
   - Test the copy URL functionality
   - Visit `/a/[slug]` to view an artifact publicly

## Step 3: Deploy Convex to Production

1. **Deploy your Convex functions:**
   ```bash
   npx convex deploy
   ```

2. **Copy the production URL:**
   - After deployment, you'll get a production URL
   - Example: `https://your-project.convex.cloud`

## Step 4: Deploy Frontend to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add environment variables:**
   ```bash
   vercel env add NEXT_PUBLIC_CONVEX_URL
   vercel env add NEXT_PUBLIC_ADMIN_PASSWORD
   ```

4. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

### Option B: Deploy via Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/artifact-vault.git
   git push -u origin main
   ```

2. **Import on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables:**
   - `NEXT_PUBLIC_CONVEX_URL`: Your Convex production URL
   - `NEXT_PUBLIC_ADMIN_PASSWORD`: Your admin password

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

## Step 5: Verify Deployment

1. **Visit your deployed site:**
   - Example: `https://artifact-vault.vercel.app`

2. **Test all features:**
   - [ ] Admin login works
   - [ ] Can create categories
   - [ ] Can create artifacts
   - [ ] QR codes generate correctly
   - [ ] Copy URL works
   - [ ] Public artifact pages load
   - [ ] Artifacts render HTML/CSS/JS correctly
   - [ ] Category filtering works
   - [ ] Delete functionality works

## Troubleshooting

### TypeScript Errors about `_generated`

**Problem:** Cannot find module '@/convex/_generated/api'

**Solution:**
```bash
npx convex dev
```
This generates the required types.

### Convex Connection Issues

**Problem:** "Failed to connect to Convex"

**Solution:**
1. Check your `NEXT_PUBLIC_CONVEX_URL` is correct
2. Ensure Convex dev/deploy completed successfully
3. Verify environment variables are set in Vercel

### Build Failures on Vercel

**Problem:** Build fails with module errors

**Solution:**
1. Ensure all dependencies are in `package.json`
2. Run `npm install` locally to verify
3. Check Vercel build logs for specific errors
4. Ensure `NEXT_PUBLIC_CONVEX_URL` is set before build

### Admin Password Not Working

**Problem:** Can't log into admin area

**Solution:**
1. Check `NEXT_PUBLIC_ADMIN_PASSWORD` is set correctly
2. Clear browser localStorage
3. Try in incognito/private window

## Security Considerations

1. **Change Default Password:**
   - Never use `admin123` in production
   - Use a strong, unique password

2. **Environment Variables:**
   - Never commit `.env.local` to Git
   - Use Vercel's environment variable management

3. **HTTPS:**
   - Vercel provides HTTPS by default
   - Ensure all artifact URLs use HTTPS

## Monitoring

1. **Convex Dashboard:**
   - Monitor function calls
   - Check database size
   - View logs

2. **Vercel Analytics:**
   - Track page views
   - Monitor performance
   - Check error rates

## Updating the Application

1. **Update code locally:**
   ```bash
   git pull origin main
   # Make your changes
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Vercel auto-deploys:**
   - Vercel automatically deploys on push to main
   - Monitor deployment in Vercel dashboard

3. **Update Convex functions:**
   ```bash
   npx convex deploy
   ```

## Backup Strategy

1. **Export Convex Data:**
   - Use Convex dashboard to export data
   - Schedule regular backups

2. **Code Backup:**
   - Keep code in Git repository
   - Consider multiple remotes (GitHub + GitLab)

## Cost Estimates

- **Convex Free Tier:**
  - 1M function calls/month
  - 1GB storage
  - Sufficient for small to medium usage

- **Vercel Free Tier:**
  - 100GB bandwidth/month
  - Unlimited deployments
  - Custom domains

## Support

For issues:
1. Check Convex docs: [docs.convex.dev](https://docs.convex.dev)
2. Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
3. Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)