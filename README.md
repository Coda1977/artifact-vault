# Artifact Vault

A private web application for storing, organizing, and sharing large artifacts (HTML/CSS/JS code blocks) with automatically generated QR codes and shareable URLs.

## Features

- 🔐 **Admin Dashboard** - Password-protected admin area for managing artifacts
- 📦 **Artifact Management** - Create, view, and delete artifacts with categories
- 🔗 **Shareable URLs** - Each artifact gets a unique slug-based URL
- 📱 **QR Codes** - Automatically generated QR codes for easy sharing
- 🎨 **Beautiful Design** - Clean, minimal interface following modern design principles
- 📂 **Categories** - Organize artifacts with custom categories
- 🔍 **Filtering** - Filter artifacts by category
- 📋 **Copy to Clipboard** - One-click URL copying

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Backend**: Convex (database + backend functions)
- **Styling**: Tailwind CSS
- **QR Codes**: qrcode.react
- **Deployment**: Vercel (frontend) + Convex (backend)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Convex account (free at [convex.dev](https://convex.dev))

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd artifact-vault
   npm install
   ```

2. **Set up Convex:**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project (or link to existing)
   - Generate the `_generated` folder with types
   - Start the Convex development server

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add:
   ```env
   NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
   NEXT_PUBLIC_ADMIN_PASSWORD=<your-admin-password>
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Admin Access

1. Go to `/admin`
2. Enter the admin password (set in `.env.local`)
3. Access the admin dashboard

### Creating Artifacts

1. Click "Create Artifact" in the admin dashboard
2. Enter artifact name, select category (optional), and paste code
3. Submit to generate a unique URL and QR code

### Creating Categories

1. Click "Create Category" in the admin dashboard
2. Enter category name
3. Use categories to organize your artifacts

### Sharing Artifacts

1. Each artifact has a unique URL: `/a/[slug]`
2. Copy the URL using the "Copy URL" button
3. Share the QR code for mobile access
4. Public viewers can only see the specific artifact URL they're given

## Project Structure

```
artifact-vault/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with Convex provider
│   ├── page.tsx             # Home page (redirects to admin)
│   ├── admin/
│   │   └── page.tsx         # Admin dashboard (password-protected)
│   └── a/[slug]/
│       └── page.tsx         # Public artifact viewer
├── components/              # React components
│   ├── AdminDashboard.tsx
│   ├── ArtifactCard.tsx
│   ├── CreateArtifactForm.tsx
│   ├── CreateCategoryForm.tsx
│   ├── CopyButton.tsx
│   └── QRCodeDisplay.tsx
├── convex/                  # Convex backend
│   ├── schema.ts           # Database schema
│   ├── artifacts.ts        # Artifact queries/mutations
│   ├── categories.ts       # Category queries/mutations
│   └── auth.config.ts      # Auth configuration
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_CONVEX_URL`
     - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - Deploy

### Deploy Convex Backend

```bash
npx convex deploy
```

This will deploy your Convex functions and database to production.

## Security

- Admin area is password-protected
- Public artifact pages have no navigation to other artifacts
- Slugs are automatically generated and unique
- No authentication required for viewing individual artifacts

## Design System

The app follows a clean, minimal design system:

- **Colors:**
  - Background: `#F5F0E8`
  - Text: `#1A1A1A`
  - Accent Yellow: `#FFD60A`
  - Accent Blue: `#003566`
  - Secondary Text: `#4A4A4A`

- **Typography:**
  - Large, bold headlines with tight letter-spacing
  - Generous white space (32px minimum padding)
  - Mobile-first responsive design

- **Interactions:**
  - Hover effects with subtle transformations
  - Smooth transitions (300ms)
  - Clear visual feedback

## License

ISC

## Author

Yonatan (tinymanagerai@gmail.com)