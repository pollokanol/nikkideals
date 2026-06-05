# Deploy nikkideals.com to GitHub + Vercel

## Step 1 — Push to GitHub

1. Go to https://github.com/new
2. Name it `nikkideals`, keep private, click **Create repository**
3. Open terminal in this folder and run:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/nikkideals.git
git push -u origin main
```
Replace YOURUSERNAME with your GitHub username.

## Step 2 — Deploy on Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Click **Add New Project**
3. Click **Import** next to your `nikkideals` repo
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**
6. Live in ~1 minute at https://nikkideals.vercel.app

## Step 3 — Add custom domain (optional)

1. Vercel dashboard → your project → Settings → Domains
2. Type `nikkideals.com` → Add
3. On Namecheap, set DNS:
   - Type: A    | Host: @   | Value: 76.76.21.21
   - Type: CNAME | Host: www | Value: cname.vercel-dns.com

## Auto-deploy on every push

After setup, just push to GitHub and Vercel redeploys automatically:

```bash
git add .
git commit -m "your update"
git push
```

## Admin login
Email: admin@nikkideals.com (any password)
