# Backend Deployment Guide

## Quick Deploy to Railway

### Prerequisites
- MongoDB Atlas account (free: https://www.mongodb.com/cloud/atlas)
- Railway account (https://railway.app)

### Step 1: Setup MongoDB
1. Create MongoDB Atlas cluster (free tier)
2. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
3. Keep this safe - you'll need it for Railway

### Step 2: Deploy on Railway

#### Option A: Via Railway Dashboard (Easiest)
1. Go to https://railway.app/dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `portfolio-_Govindan`
4. Railway auto-detects the backend (Nixpacks)
5. Go to "Variables" tab
6. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=generate_a_random_secret_here
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   EMAIL_USER=your_email@gmail.com (optional)
   EMAIL_PASSWORD=your_app_password (optional)
   ```
7. Click Deploy - done!

#### Option B: Via CLI (For Advanced Users)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to project
cd /path/to/portfolio-_Govindan

# Initialize
railway init

# Set variables
railway variables set MONGODB_URI="your_mongodb_string"
railway variables set JWT_SECRET="your_secret"
railway variables set NODE_ENV="production"
railway variables set FRONTEND_URL="https://your-frontend.vercel.app"

# Deploy
railway up
```

### Step 3: Get Your Backend URL
After deployment, Railway gives you a public URL like:
```
https://portfolio-backend-prod.up.railway.app
```

### Step 4: Update Frontend
In your Vercel frontend, add environment variable:
```
VITE_API_URL=https://portfolio-backend-prod.up.railway.app
```

Then update your frontend API calls:
```javascript
// src/services/api.js or src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### Step 5: Update CORS
Railway will automatically set the `PORT` environment variable. The backend reads it from:
```javascript
const PORT = process.env.PORT || 5000;
```

### Troubleshooting

**Build Fails?**
- Check Railway logs in dashboard
- Ensure `npm start` works locally: `cd server && npm start`
- Verify all dependencies in `server/package.json`

**Connection Refused?**
- Check MongoDB URI is correct
- Verify CORS origin is set to your Vercel URL
- Use `/api/health` endpoint to test backend

**API Not Responding?**
- Check Railway logs for errors
- Verify all environment variables are set
- Test with: `curl https://your-railway-url/api/health`

### Health Check
Once deployed, test your backend:
```bash
curl https://your-railway-url/api/health
# Should return: {"message":"Server is running"}
```

---

**Need help?** Check Railway docs: https://docs.railway.app
