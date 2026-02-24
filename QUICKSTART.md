# Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Setup Environment Variables

Create `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=my_super_secret_key_12345
OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
NODE_ENV=development
```

**Get your OpenWeather API Key:**
1. Visit https://openweathermap.org/api
2. Sign up for free
3. Copy your API key
4. Paste it in the `.env` file

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Cloud):**
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in `.env`

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### Step 5: Open Browser

Navigate to: http://localhost:3000

## 🎉 You're Ready!

### First Steps:
1. **Search for a city** - Try "London" or "New York"
2. **Use current location** - Click the location icon
3. **Register an account** - Click "Register" in navbar
4. **Save favorites** - Click the star icon on weather cards
5. **Toggle dark mode** - Click the moon/sun icon
6. **Change units** - Click °C/°F button

## 🔧 Common Issues

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check if port 27017 is available

### "Invalid API Key"
- Verify your OpenWeather API key
- Wait 10 minutes after creating new key

### "Port 5000 already in use"
- Change PORT in `.env` to 5001
- Or kill the process using port 5000

## 📱 Test Features

1. **Search Weather**: Enter "Tokyo" and press Search
2. **Current Location**: Click location icon (allow browser permission)
3. **7-Day Forecast**: Scroll down to see weekly forecast
4. **Hourly Chart**: View 24-hour temperature graph
5. **Air Quality**: Check AQI data below forecast
6. **Weather Map**: Interactive map with location marker
7. **Dark Mode**: Toggle theme with moon/sun icon
8. **Units**: Switch between °C and °F
9. **Register**: Create account to save favorites
10. **Favorites**: Save cities and view in Dashboard

## 🚀 Production Build

### Build Frontend:
```bash
cd client
npm run build
```

### Start Production Server:
```bash
cd server
NODE_ENV=production npm start
```

## 📚 Need Help?

Check the main README.md for:
- Detailed documentation
- API endpoints
- Deployment guides
- Troubleshooting
- Project structure

---

Happy Weather Tracking! 🌤️
