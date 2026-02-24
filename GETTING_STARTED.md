# Getting Started Guide

Welcome to the Weather Forecasting Web Application! This guide will help you get up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (local or Atlas) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- ✅ **OpenWeather API Key** - [Get Free Key](https://openweathermap.org/api)
- ✅ **Git** (optional) - [Download](https://git-scm.com/)
- ✅ **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Quick Installation

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**Step 1: Install Dependencies**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

**Step 2: Configure Environment**

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=your_super_secret_jwt_key_change_this
OPENWEATHER_API_KEY=your_openweather_api_key_here
NODE_ENV=development
```

**Step 3: Start MongoDB**

Local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud) - see [MongoDB Setup](#mongodb-setup)

**Step 4: Run Application**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

**Step 5: Open Browser**
```
http://localhost:3000
```

## 🔑 Getting API Keys

### OpenWeather API Key

1. Visit https://openweathermap.org/
2. Click "Sign Up" (top right)
3. Create free account
4. Verify email
5. Go to "API Keys" section
6. Copy your API key
7. Paste in `server/.env` file

**Note:** New API keys take 10-15 minutes to activate.

### Free Tier Includes:
- ✅ Current weather data
- ✅ 7-day forecast
- ✅ Hourly forecast (48 hours)
- ✅ Air quality data
- ✅ Weather alerts
- ✅ 60 calls/minute
- ✅ 1,000,000 calls/month

## 🗄️ MongoDB Setup

### Option A: Local MongoDB

**Windows:**
1. Download MongoDB Community Server
2. Install with default settings
3. MongoDB runs as Windows service
4. Connection string: `mongodb://localhost:27017/weather-app`

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Setup Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set role: "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `weather-app`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority
```

## 📁 Project Structure

```
Weather Forecasting Web/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Context providers
│   │   ├── hooks/      # Custom hooks
│   │   ├── services/   # API services
│   │   └── utils/      # Helper functions
│   └── package.json
│
├── server/             # Node.js backend
│   ├── controllers/    # Route controllers
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middleware/    # Auth middleware
│   ├── .env           # Environment variables
│   └── package.json
│
└── Documentation files
```

## 🎯 First Steps After Installation

### 1. Test the Application

**Search for a City:**
- Enter "London" in search bar
- Press Enter or click Search
- View weather data

**Use Current Location:**
- Click location pin icon
- Allow browser location access
- View your local weather

### 2. Create an Account

- Click "Register" in navbar
- Fill in name, email, password
- Click "Create Account"
- Automatically logged in

### 3. Save Favorite Cities

- Search for a city
- Click star icon on weather card
- Go to Dashboard to view favorites

### 4. Explore Features

- ✅ 7-day forecast
- ✅ Hourly temperature chart
- ✅ Air quality index
- ✅ Weather map
- ✅ Weather alerts
- ✅ Dark mode toggle
- ✅ Unit converter (°C/°F)

## 🔧 Configuration Options

### Change Port Numbers

**Backend Port:**
Edit `server/.env`:
```env
PORT=5001
```

**Frontend Port:**
Edit `client/vite.config.js`:
```javascript
server: {
  port: 3001
}
```

### Change Database Name

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/my-weather-app
```

### JWT Token Expiration

Edit `server/controllers/authController.js`:
```javascript
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '30d' // Change from 7d to 30d
});
```

## 🐛 Common Issues

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB port (27017)

### "Invalid API Key"
- Wait 10-15 minutes after creating key
- Verify key is correct in .env
- Check OpenWeather dashboard

### "Port already in use"
- Change PORT in .env
- Or kill process using the port

### "Module not found"
- Run `npm install` in both directories
- Delete node_modules and reinstall

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

## 📚 Documentation

- **[README.md](README.md)** - Complete project documentation
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API endpoints reference
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview

## 🎓 Learning Path

### Beginner
1. Run the application locally
2. Explore all features
3. Understand project structure
4. Read component code

### Intermediate
1. Modify existing components
2. Add new features
3. Customize styling
4. Implement caching

### Advanced
1. Add new API integrations
2. Implement real-time updates
3. Add push notifications
4. Deploy to production

## 🚀 Deployment

Ready to deploy? See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- MongoDB Atlas setup
- Railway backend deployment
- Vercel frontend deployment
- Environment configuration
- Custom domain setup

## 💡 Tips for Success

1. **Start Simple**
   - Get basic setup working first
   - Test each feature individually
   - Read error messages carefully

2. **Use Documentation**
   - Check README for overview
   - Use QUICKSTART for fast setup
   - Reference API docs when needed

3. **Debug Systematically**
   - Check browser console
   - Review server logs
   - Test API endpoints
   - Verify environment variables

4. **Keep Learning**
   - Explore the codebase
   - Try modifying features
   - Add your own improvements
   - Share your experience

## 🤝 Best Practices

### Development
- Use meaningful commit messages
- Test before committing
- Keep dependencies updated
- Follow code style

### Security
- Never commit .env files
- Use strong JWT secrets
- Validate all inputs
- Keep API keys secure

### Performance
- Implement caching
- Optimize images
- Minimize API calls
- Use lazy loading

## 📞 Getting Help

If you need assistance:

1. **Check Documentation**
   - Read relevant .md files
   - Search for your issue

2. **Review Error Messages**
   - Read full error stack
   - Search error online

3. **Debug Step by Step**
   - Isolate the problem
   - Test one thing at a time
   - Check logs

4. **Common Resources**
   - [Node.js Docs](https://nodejs.org/docs/)
   - [React Docs](https://react.dev/)
   - [MongoDB Docs](https://docs.mongodb.com/)
   - [OpenWeather API](https://openweathermap.org/api)

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Node.js installed and working
- [ ] MongoDB running (local or Atlas)
- [ ] OpenWeather API key obtained
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file configured
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can search for cities
- [ ] Weather data displays correctly
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can save favorite cities

## 🎉 You're Ready!

Congratulations! You now have a fully functional weather forecasting application.

**Next Steps:**
1. Explore all features
2. Customize to your needs
3. Deploy to production
4. Share with others

**Happy Weather Tracking! 🌤️**

---

**Need more help?** Check out:
- [QUICKSTART.md](QUICKSTART.md) - Fast setup
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [FEATURES.md](FEATURES.md) - Feature guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
