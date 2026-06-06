# nikkideals.com — Responsive Deal Website

## Quick Deploy via GitHub + Vercel

### 1. Push to GitHub
Create a new repo at github.com/new named `nikkideals`, then:

Upload these files keeping the folder structure:
- index.html          → root
- package.json        → root
- vite.config.js      → root
- vercel.json         → root
- .gitignore          → root
- src/App.jsx         → src/ folder
- src/main.jsx        → src/ folder
- public/favicon.svg  → public/ folder

### 2. Deploy on Vercel
1. Go to vercel.com → Sign up with GitHub
2. Click Add New Project → Import nikkideals
3. Leave all settings default → Deploy
4. Live in ~1 minute!

### 3. Custom domain (nikkideals.com)
1. Vercel dashboard → Project → Settings → Domains
2. Add: nikkideals.com
3. Namecheap DNS:
   - A record:     @ → 76.76.21.21
   - CNAME record: www → cname.vercel-dns.com

## Admin Login
Email: admin@nikkideals.com (any password)

## Features
- Responsive: mobile, tablet, desktop
- Light / Dark mode toggle
- 12 sample deals with real images
- Coupon code sheet
- AI deal adder (admin)
- Price tracking & wishlist
- Push notifications
