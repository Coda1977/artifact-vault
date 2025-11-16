# Quick Setup Instructions

## Important Note

I've created mock `_generated` files to resolve TypeScript errors, but you'll need to run Convex to generate the real ones and connect to the backend.

## Step-by-Step Setup

### 1. Open a Terminal in the Project Directory

```bash
cd artifact-vault
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Set Up Convex (Interactive - You Need to Do This)

```bash
npx convex dev
```

**What will happen:**
- You'll be prompted to log in to Convex (or create a free account)
- Choose to create a new project
- Convex will generate the real `_generated` files
- You'll get a deployment URL like: `https://your-project.convex.cloud`
- The Convex dev server will start and watch for changes

**Keep this terminal open!**

### 4. Update Environment Variables

Open `.env.local` and update with your Convex URL:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### 5. Start Next.js Development Server (New Terminal)

Open a **second terminal** and run:

```bash
cd artifact-vault
npm run dev
```

### 6. Test the Application

1. Open your browser to `http://localhost:3000`
2. You'll be redirected to `/admin`
3. Enter password: `admin123`
4. Try creating a category (e.g., "React Components")
5. Try creating an artifact:
   - Name: "Test Component"
   - Category: Select the one you created
   - Code: Paste this test HTML:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <style>
       body { font-family: Arial; padding: 20px; }
       .card { background: #f0f0f0; padding: 20px; border-radius: 8px; }
     </style>
   </head>
   <body>
     <div class="card">
       <h1>Hello from Artifact Vault!</h1>
       <p>This is a test artifact.</p>
     </div>
   </body>
   </html>
   ```
6. Check that the QR code appears
7. Click "Copy URL" to copy the share link
8. Visit the artifact at `/a/test-component` (or whatever slug was generated)

## Troubleshooting

### "Cannot find module '@/convex/_generated/api'"

**Solution:** Run `npx convex dev` - this generates the real type files.

### "Failed to connect to Convex"

**Solution:** 
1. Make sure `npx convex dev` is running
2. Check that `NEXT_PUBLIC_CONVEX_URL` in `.env.local` matches your Convex URL
3. Restart the Next.js dev server

### TypeScript Errors

**Solution:** After running `npx convex dev`, restart your TypeScript server in VS Code:
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "TypeScript: Restart TS Server"
- Press Enter

### Port Already in Use

If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

Then visit `http://localhost:3001`

## What's Running

You should have **two terminals** running:

1. **Terminal 1:** `npx convex dev` (Convex backend)
2. **Terminal 2:** `npm run dev` (Next.js frontend)

## Next Steps

Once everything works locally:
1. Read `DEPLOYMENT.md` for production deployment instructions
2. Change the admin password in `.env.local`
3. Deploy to Vercel + Convex production

## Quick Test Checklist

- [ ] Can log into admin with password
- [ ] Can create a category
- [ ] Can create an artifact
- [ ] QR code generates
- [ ] Can copy share URL
- [ ] Can view artifact at `/a/[slug]`
- [ ] Artifact HTML renders correctly
- [ ] Can filter by category
- [ ] Can delete an artifact

## Need Help?

Check the main `README.md` for detailed documentation.