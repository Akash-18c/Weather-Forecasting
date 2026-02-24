# Weather Forecasting Web Application

A complete production-ready weather forecasting application with real-time data from OpenWeather API, featuring authentication, favorites management, and stunning animated backgrounds.

## 🌟 Features

### Core Features
- ✅ Real-time weather data from OpenWeather API
- ✅ Search weather by city name
- ✅ Current location weather using Geolocation API
- ✅ 7-day weather forecast
- ✅ Hourly forecast with interactive Chart.js visualization
- ✅ Interactive weather map with Leaflet.js
- ✅ Air Quality Index (AQI) with detailed pollutant data
- ✅ Weather alerts and warnings
- ✅ User authentication (JWT-based)
- ✅ Save favorite cities
- ✅ Unit converter (Celsius ↔ Fahrenheit, m/s ↔ mph)
- ✅ Dark mode toggle
- ✅ Responsive design (mobile, tablet, desktop)

### Premium UI Features
- ✅ Dynamic animated backgrounds based on weather and time
- ✅ Parallax mouse effects
- ✅ Glassmorphism design
- ✅ Smooth Framer Motion animations
- ✅ Weather-based particle effects (rain, snow)
- ✅ Animated gradient backgrounds
- ✅ Grain texture overlay
- ✅ Glowing temperature display

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios
- Chart.js & react-chartjs-2
- React Router DOM
- Leaflet.js & react-leaflet
- Framer Motion
- Lucide React (icons)
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- dotenv
- CORS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- OpenWeather API Key

## 🔑 Getting OpenWeather API Key

1. Go to [OpenWeather](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the API key for use in the application

**Note:** Free tier includes:
- Current weather data
- 7-day forecast
- Hourly forecast
- Air quality data
- Weather alerts

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Weather Forecasting Web"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENWEATHER_API_KEY=your_openweather_api_key_here
NODE_ENV=development
```

**Important:** Replace the values with your actual credentials:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong random string for JWT signing
- `OPENWEATHER_API_KEY`: Your OpenWeather API key

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. Start MongoDB

If using local MongoDB:

```bash
mongod
```

Or use MongoDB Atlas (cloud):
- Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `.env`

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
Weather Forecasting Web/
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── weatherController.js
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── weatherRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── AnimatedBackground.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── WeatherCard.jsx
    │   │   ├── ForecastCard.jsx
    │   │   ├── HourlyChart.jsx
    │   │   ├── AQICard.jsx
    │   │   ├── AlertBanner.jsx
    │   │   ├── WeatherMap.jsx
    │   │   ├── Loader.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── WeatherContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── hooks/
    │   │   ├── useParallax.js
    │   │   └── useGeolocation.js
    │   ├── utils/
    │   │   └── weatherHelpers.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Weather
- `GET /api/weather/city/:city` - Get weather by city name
- `GET /api/weather/coords?lat=&lon=` - Get weather by coordinates
- `GET /api/weather/aqi?lat=&lon=` - Get air quality data

### User (Protected)
- `POST /api/user/favorites` - Add city to favorites
- `GET /api/user/favorites` - Get user's favorite cities
- `DELETE /api/user/favorites/:city` - Remove city from favorites
- `PUT /api/user/preferences` - Update user preferences

## 🎨 Features Walkthrough

### 1. Search Weather
- Enter any city name in the search bar
- Click "Search" to fetch weather data
- View current weather, forecast, and more

### 2. Current Location
- Click the location icon button
- Allow browser location access
- Automatically fetch weather for your location

### 3. Save Favorites
- Search for a city
- Click the star icon on the weather card
- Access saved cities from the Dashboard

### 4. Dark Mode
- Click the moon/sun icon in the navbar
- Toggle between light and dark themes
- Preference saved in localStorage

### 5. Unit Conversion
- Click the °C/°F button in navbar
- Switch between metric and imperial units
- All data updates automatically

## 🌐 Deployment

### Backend Deployment (Heroku)

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create new app:
```bash
cd server
heroku create your-weather-api
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENWEATHER_API_KEY=your_api_key
heroku config:set NODE_ENV=production
```

5. Deploy:
```bash
git push heroku main
```

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Update API URL in `client/vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-weather-api.herokuapp.com',
      changeOrigin: true
    }
  }
}
```

### Alternative: Deploy Both on Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Add environment variables
5. Deploy both frontend and backend

## 🔒 Security Best Practices

- ✅ JWT tokens for authentication
- ✅ Password hashing with bcrypt
- ✅ Environment variables for sensitive data
- ✅ CORS configuration
- ✅ Input validation
- ✅ Protected API routes

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access in MongoDB Atlas

### API Key Error
- Verify OpenWeather API key is correct
- Check if API key is activated (may take a few minutes)
- Ensure you're using the correct API endpoints

### Port Already in Use
- Change PORT in `.env` file
- Kill process using the port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## 📝 Environment Variables Reference

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
NODE_ENV=development
```

## 🎯 Future Enhancements

- [ ] Weather notifications
- [ ] Historical weather data
- [ ] Weather comparison between cities
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Weather widgets
- [ ] PWA support
- [ ] Voice search

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, Node.js, and OpenWeather API

## 🙏 Acknowledgments

- OpenWeather API for weather data
- Leaflet.js for maps
- Chart.js for visualizations
- Framer Motion for animations
- Tailwind CSS for styling

---

**Note:** This application uses real data from OpenWeather API. No mock or demo data is used. Ensure you have a valid API key before running the application.
#   W e a t h e r - F o r e c a s t i n g  
 