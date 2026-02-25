# 🚀 Deployment Guide - Weather Forecasting App

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- OpenWeather API key
- Render account (free tier)

---

## 📋 Step-by-Step Deployment

### **Step 1: Setup MongoDB Atlas (Database)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a **FREE** cluster:
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select region closest to you
   - Click "Create"
4. Create Database User:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `weatheruser`
   - Password: Generate secure password (save it!)
   - User Privileges: "Read and write to any database"
5. Whitelist IP Address:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
6. Get Connection String:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://weatheruser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority`

---

### **Step 2: Deploy Backend on Render**

1. Go to [Render](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `Weather-Forecasting`
5. Configure:
   - **Name**: `weather-app-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Add Environment Variables (click "Advanced"):
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = your_mongodb_connection_string_from_step1
   JWT_SECRET = your_random_secret_key_here_make_it_long_and_secure
   OPENWEATHER_API_KEY = your_openweather_api_key
   ```

7. Click "Create Web Service"
8. Wait 5-10 minutes for deployment
9. **Copy your backend URL**: `https://weather-app-backend-xxxx.onrender.com`

---

### **Step 3: Deploy Frontend on Render**

1. In Render Dashboard, click "New +" → "Web Service"
2. Select same repository: `Weather-Forecasting`
3. Configure:
   - **Name**: `weather-app-frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

4. Add Environment Variables:
   ```
   NODE_ENV = production
   VITE_API_URL = https://weather-app-backend-xxxx.onrender.com/api
   ```
   (Replace with YOUR backend URL from Step 2)

5. Click "Create Web Service"
6. Wait 5-10 minutes for deployment
7. **Your app is live!** 🎉

---

### **Step 4: Update Backend CORS (Important!)**

1. Open your backend code: `server/server.js`
2. Update CORS configuration:
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:3000',
       'https://weather-app-frontend-xxxx.onrender.com'  // Add your frontend URL
     ],
     credentials: true
   }));
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push origin main
   ```
4. Render will auto-redeploy

---

## 🎯 Alternative: Deploy on Vercel + Railway

### **Backend on Railway:**
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Add environment variables
6. Deploy

### **Frontend on Vercel:**
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repo
3. Set Root Directory: `client`
4. Add environment variable: `VITE_API_URL`
5. Deploy

---

## 📝 Important Notes

### Free Tier Limitations:
- **Render Free**: Services sleep after 15 min inactivity (first request takes 30-60 sec)
- **MongoDB Atlas Free**: 512 MB storage
- **OpenWeather Free**: 1000 API calls/day

### Keep Services Awake:
Use [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes

### Environment Variables Checklist:
✅ MONGODB_URI - From MongoDB Atlas  
✅ JWT_SECRET - Random secure string  
✅ OPENWEATHER_API_KEY - From OpenWeather  
✅ VITE_API_URL - Your backend URL  

---

## 🐛 Troubleshooting

**Backend not connecting to MongoDB:**
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string has correct password
- Check database user permissions

**Frontend can't reach backend:**
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure backend is deployed and running

**API calls failing:**
- Verify OpenWeather API key is valid
- Check API key is activated (takes 10 min)

---

## 🎉 Your App URLs

After deployment:
- **Frontend**: `https://weather-app-frontend-xxxx.onrender.com`
- **Backend**: `https://weather-app-backend-xxxx.onrender.com`

Share your frontend URL with anyone! 🌤️

---

## 📞 Need Help?

Check logs in Render Dashboard:
- Click on your service
- Go to "Logs" tab
- Look for errors

Common fixes:
- Redeploy: Click "Manual Deploy" → "Deploy latest commit"
- Clear build cache: Settings → "Clear build cache & deploy"
