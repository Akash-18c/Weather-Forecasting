# Deployment Guide

Complete guide to deploy your Weather Forecasting Application to production.

## Table of Contents
1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [Backend Deployment (Railway)](#backend-deployment-railway)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Alternative: Heroku](#alternative-heroku)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)

---

## MongoDB Atlas Setup

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new organization

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider and region (closest to your users)
4. Name your cluster (e.g., "weather-app")
5. Click "Create"

### Step 3: Setup Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Setup Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `weather-app`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority
```

---

## Backend Deployment (Railway)

### Why Railway?
- Free tier available
- Easy deployment
- Automatic HTTPS
- Environment variables support
- GitHub integration

### Step 1: Prepare Backend

Create `server/.gitignore`:
```
node_modules
.env
*.log
```

Update `server/package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select the `server` directory as root

### Step 3: Configure Environment Variables

In Railway dashboard:
1. Go to "Variables" tab
2. Add the following:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/weather-app
JWT_SECRET=your_super_secret_jwt_key_production_change_this
OPENWEATHER_API_KEY=your_openweather_api_key
NODE_ENV=production
```

### Step 4: Deploy

1. Railway will automatically deploy
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://your-app.railway.app`)

---

## Frontend Deployment (Vercel)

### Why Vercel?
- Optimized for React/Vite
- Free tier
- Automatic HTTPS
- CDN
- Easy deployment

### Step 1: Update API Configuration

Update `client/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:5000'
    )
  }
})
```

Update `client/src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';
```

### Step 2: Deploy to Vercel

**Option A: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client directory
cd client

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? weather-app-client
# - Directory? ./
# - Override settings? No
```

**Option B: Vercel Dashboard**

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: client
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 3: Add Environment Variables

In Vercel dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add:

```
VITE_API_URL=https://your-app.railway.app
```

### Step 4: Redeploy

1. Click "Deployments" tab
2. Click "Redeploy" on latest deployment
3. Wait for deployment to complete
4. Your app is live!

---

## Alternative: Heroku

### Backend on Heroku

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd server
heroku create your-weather-api

# Add MongoDB addon (optional)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENWEATHER_API_KEY=your_api_key
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Open app
heroku open
```

### Frontend on Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to client
cd client

# Build
npm run build

# Deploy
netlify deploy --prod

# Follow prompts
```

---

## Environment Variables

### Development (.env)

**Server:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=dev_secret_key
OPENWEATHER_API_KEY=your_api_key
NODE_ENV=development
```

**Client:**
```env
VITE_API_URL=http://localhost:5000
```

### Production

**Server (Railway/Heroku):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/weather-app
JWT_SECRET=super_secure_random_string_change_this
OPENWEATHER_API_KEY=your_api_key
NODE_ENV=production
```

**Client (Vercel/Netlify):**
```env
VITE_API_URL=https://your-backend-url.railway.app
```

---

## Post-Deployment

### 1. Test Your Application

Visit your deployed frontend URL and test:
- [ ] Homepage loads
- [ ] Search weather by city
- [ ] Current location works
- [ ] User registration
- [ ] User login
- [ ] Add favorites
- [ ] View dashboard
- [ ] Dark mode toggle
- [ ] Unit conversion

### 2. Setup Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records

**Railway:**
1. Go to Settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records

### 3. Enable CORS

Update `server/server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-url.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 4. Monitor Your Application

**Railway:**
- View logs in dashboard
- Monitor resource usage
- Set up alerts

**Vercel:**
- View deployment logs
- Monitor analytics
- Check performance

### 5. Setup SSL/HTTPS

Both Railway and Vercel provide automatic HTTPS. No additional setup needed!

---

## Troubleshooting

### CORS Errors
- Check allowed origins in backend
- Verify API URL in frontend
- Ensure credentials are included

### MongoDB Connection Failed
- Verify connection string
- Check IP whitelist (0.0.0.0/0)
- Verify database user credentials

### API Key Invalid
- Check OpenWeather API key
- Verify key is activated
- Check API call limits

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check build logs for errors

---

## Cost Estimation

### Free Tier Limits

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared RAM
- Suitable for development and small apps

**Railway (Free):**
- $5 credit/month
- 500 hours execution time
- 100 GB bandwidth

**Vercel (Free):**
- 100 GB bandwidth
- Unlimited deployments
- Automatic SSL

### Scaling Costs

For production with high traffic:
- MongoDB Atlas: $9-57/month
- Railway: $5-20/month
- Vercel: $20/month (Pro plan)

**Total: ~$34-97/month for production**

---

## Security Checklist

- [ ] Use strong JWT secret
- [ ] Enable HTTPS only
- [ ] Whitelist CORS origins
- [ ] Use environment variables
- [ ] Enable rate limiting
- [ ] Validate all inputs
- [ ] Use secure MongoDB connection
- [ ] Keep dependencies updated
- [ ] Monitor for vulnerabilities
- [ ] Backup database regularly

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor API usage
- Review performance metrics

**Monthly:**
- Update dependencies
- Review security alerts
- Backup database
- Check API costs

**Quarterly:**
- Performance optimization
- Security audit
- Feature updates

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints
4. Review error messages
5. Check service status pages

---

**Congratulations! Your Weather App is now live! 🎉**
