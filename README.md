# nikkideals.com

Best deals daily — Electronics, Fashion, Home.

## Deploy in 3 steps

### 1. Install dependencies
```bash
npm install
```

### 2. Test locally
```bash
npm run dev
```
Opens at http://localhost:5173

### 3. Deploy to Vercel (free)
```bash
npm run build
npx vercel --prod
```
Your site goes live at a URL like: https://nikkideals.vercel.app

## Custom domain (nikkideals.com)
1. Buy domain on Namecheap
2. In Vercel dashboard → Project → Settings → Domains → Add nikkideals.com
3. Set Namecheap DNS:
   - Type: A  Name: @  Value: 76.76.21.21
   - Type: CNAME  Name: www  Value: cname.vercel-dns.com

## Admin login
Email: admin@nikkideals.com  (any password)

## Tech stack
- React 18
- Vite 5
- Claude AI (deal auto-fill)
- Unsplash (product images)
- Deployed on Vercel
