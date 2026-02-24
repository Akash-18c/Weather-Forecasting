# Troubleshooting Guide

Common issues and their solutions for the Weather Forecasting Application.

---

## 🔧 Installation Issues

### Issue: npm install fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and package-lock.json:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Use legacy peer deps:**
```bash
npm install --legacy-peer-deps
```

4. **Update npm:**
```bash
npm install -g npm@latest
```

---

### Issue: Node version incompatibility

**Symptoms:**
```
Error: The engine "node" is incompatible with this module
```

**Solution:**

Check Node version:
```bash
node --version
```

Required: Node.js v16 or higher

Update Node.js:
- Download from https://nodejs.org/
- Or use nvm:
```bash
nvm install 18
nvm use 18
```

---

## 🗄️ MongoDB Issues

### Issue: Cannot connect to MongoDB

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Check if MongoDB is running:**

Windows:
```bash
net start MongoDB
```

Mac/Linux:
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

2. **Verify MongoDB is installed:**
```bash
mongod --version
```

3. **Check connection string in .env:**
```env
MONGODB_URI=mongodb://localhost:27017/weather-app
```

4. **Use MongoDB Atlas (cloud):**
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update MONGODB_URI in .env

---

### Issue: MongoDB Atlas connection timeout

**Symptoms:**
```
MongooseServerSelectionError: connection timed out
```

**Solutions:**

1. **Whitelist IP address:**
   - Go to MongoDB Atlas dashboard
   - Network Access → Add IP Address
   - Add 0.0.0.0/0 (allow all)

2. **Check connection string:**
   - Ensure password is URL-encoded
   - Replace `<password>` with actual password
   - Replace `<dbname>` with `weather-app`

3. **Verify credentials:**
   - Database Access → Check username/password
   - Ensure user has read/write permissions

---

## 🔑 API Key Issues

### Issue: OpenWeather API returns 401

**Symptoms:**
```
Error: Invalid API key
```

**Solutions:**

1. **Verify API key:**
   - Login to https://openweathermap.org/
   - Go to API Keys section
   - Copy the correct key

2. **Wait for activation:**
   - New API keys take 10-15 minutes to activate
   - Wait and try again

3. **Check .env file:**
```env
OPENWEATHER_API_KEY=your_actual_api_key_here
```

4. **Restart server after updating .env:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Issue: API rate limit exceeded

**Symptoms:**
```
Error: 429 Too Many Requests
```

**Solutions:**

1. **Check API usage:**
   - Login to OpenWeather dashboard
   - View API calls statistics

2. **Free tier limits:**
   - 60 calls/minute
   - 1,000,000 calls/month

3. **Implement caching:**
   - Cache weather data for 10 minutes
   - Reduce unnecessary API calls

4. **Upgrade plan:**
   - Consider paid plan for higher limits

---

## 🌐 CORS Issues

### Issue: CORS policy error

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

1. **Check backend CORS configuration:**

In `server/server.js`:
```javascript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

2. **Allow multiple origins:**
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

3. **Check frontend API URL:**

In `client/src/services/api.js`:
```javascript
const API_URL = '/api'; // For development with proxy
// or
const API_URL = 'http://localhost:5000/api'; // Direct connection
```

---

## 🔐 Authentication Issues

### Issue: Token expired or invalid

**Symptoms:**
```
Error: Invalid or expired token
```

**Solutions:**

1. **Clear localStorage:**
```javascript
// In browser console
localStorage.clear();
```

2. **Login again:**
   - Logout and login
   - New token will be generated

3. **Check JWT_SECRET:**
   - Ensure same secret in .env
   - Don't change JWT_SECRET in production

4. **Verify token expiration:**

In `server/controllers/authController.js`:
```javascript
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '7d' // Adjust as needed
});
```

---

### Issue: Cannot register/login

**Symptoms:**
```
Error: User registration failed
```

**Solutions:**

1. **Check MongoDB connection:**
   - Ensure database is running
   - Verify connection string

2. **Validate input:**
   - Email format correct
   - Password minimum 6 characters
   - All fields filled

3. **Check for duplicate email:**
   - Email already registered
   - Use different email or login

4. **Check server logs:**
```bash
# In server terminal
# Look for error messages
```

---

## 🎨 Frontend Issues

### Issue: Blank white screen

**Symptoms:**
- Page loads but shows nothing
- No errors in console

**Solutions:**

1. **Check browser console:**
   - Press F12
   - Look for JavaScript errors

2. **Verify API connection:**
   - Check if backend is running
   - Test API endpoint: http://localhost:5000/api/health

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **Check React errors:**
```bash
# In client terminal
# Look for compilation errors
```

---

### Issue: Map not displaying

**Symptoms:**
- Weather map shows blank area
- Leaflet errors in console

**Solutions:**

1. **Check Leaflet CSS:**

In `client/index.html`:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

2. **Verify coordinates:**
   - Ensure lat/lon are valid numbers
   - Check API response

3. **Check map container height:**

In `WeatherMap.jsx`:
```jsx
<div className="h-96 rounded-2xl overflow-hidden">
  <MapContainer style={{ height: '100%', width: '100%' }}>
```

---

### Issue: Chart not rendering

**Symptoms:**
- Hourly chart shows empty space
- Chart.js errors

**Solutions:**

1. **Verify Chart.js registration:**

In `HourlyChart.jsx`:
```javascript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);
```

2. **Check data format:**
   - Ensure hourly data exists
   - Verify array structure

3. **Set container height:**
```jsx
<div className="h-64">
  <Line data={data} options={options} />
</div>
```

---

## 🚀 Performance Issues

### Issue: Slow page load

**Solutions:**

1. **Optimize images:**
   - Use WebP format
   - Compress images
   - Lazy load images

2. **Reduce API calls:**
   - Implement caching
   - Debounce search input

3. **Code splitting:**
   - Use React.lazy()
   - Dynamic imports

4. **Check network:**
   - Slow internet connection
   - Large API responses

---

### Issue: Animations laggy

**Solutions:**

1. **Disable parallax on mobile:**

In `useParallax.js`:
```javascript
if (!enabled || window.innerWidth < 768) return;
```

2. **Use GPU acceleration:**
```css
transform: translate3d(0, 0, 0);
will-change: transform;
```

3. **Reduce particle count:**
   - Fewer rain/snow particles
   - Optimize animation loops

4. **Check browser performance:**
   - Close other tabs
   - Update browser
   - Check CPU usage

---

## 📱 Mobile Issues

### Issue: Geolocation not working

**Symptoms:**
```
Error: User denied geolocation
```

**Solutions:**

1. **Enable location services:**
   - iOS: Settings → Privacy → Location Services
   - Android: Settings → Location

2. **Grant browser permission:**
   - Click location icon in address bar
   - Allow location access

3. **Use HTTPS:**
   - Geolocation requires secure context
   - Use https:// or localhost

4. **Fallback to manual search:**
   - If location denied, search manually

---

### Issue: Touch events not working

**Solutions:**

1. **Add touch event handlers:**
```jsx
<button
  onClick={handleClick}
  onTouchStart={handleClick}
>
```

2. **Increase tap target size:**
```css
min-height: 44px;
min-width: 44px;
```

3. **Disable hover on mobile:**
```css
@media (hover: hover) {
  .button:hover {
    /* hover styles */
  }
}
```

---

## 🔧 Build Issues

### Issue: Build fails

**Symptoms:**
```
Error: Build failed with errors
```

**Solutions:**

1. **Check for TypeScript errors:**
   - Fix type errors
   - Add proper types

2. **Verify imports:**
   - Check file paths
   - Ensure all imports exist

3. **Clear build cache:**
```bash
rm -rf dist
npm run build
```

4. **Check environment variables:**
   - Ensure all required vars are set
   - Use VITE_ prefix for client vars

---

## 🌐 Deployment Issues

### Issue: Deployed app not working

**Solutions:**

1. **Check environment variables:**
   - Verify all vars are set in hosting platform
   - Check for typos

2. **Update API URL:**
   - Point to production backend
   - Update CORS origins

3. **Check build output:**
   - Ensure build succeeded
   - Verify dist folder exists

4. **Check logs:**
   - Railway: View deployment logs
   - Vercel: Check function logs

---

### Issue: Database connection fails in production

**Solutions:**

1. **Whitelist IP addresses:**
   - MongoDB Atlas: Add 0.0.0.0/0

2. **Use connection string with credentials:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/weather-app
```

3. **Check network access:**
   - Verify hosting platform can reach MongoDB

---

## 🐛 Common Errors

### Error: "Cannot find module"

**Solution:**
```bash
npm install
# or install specific package
npm install package-name
```

---

### Error: "Port already in use"

**Solution:**

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -ti:5000 | xargs kill -9
```

Or change port in .env:
```env
PORT=5001
```

---

### Error: "Module not found: Can't resolve"

**Solution:**

1. Check import path:
```javascript
// Correct
import Component from './Component';

// Wrong
import Component from './component'; // Case sensitive
```

2. Verify file exists:
```bash
ls src/components/Component.jsx
```

---

## 📞 Getting Help

If issues persist:

1. **Check documentation:**
   - README.md
   - API_DOCUMENTATION.md
   - DEPLOYMENT.md

2. **Review error messages:**
   - Read full error stack
   - Search error online

3. **Check service status:**
   - MongoDB Atlas status
   - OpenWeather API status
   - Hosting platform status

4. **Debug systematically:**
   - Isolate the problem
   - Test one thing at a time
   - Check logs

---

## 🔍 Debugging Tips

### Enable Debug Mode

**Backend:**
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend:**
```javascript
// Add to components
console.log('Component rendered', { props, state });
```

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Check request/response

### Verify Environment Variables

**Backend:**
```javascript
console.log('Environment:', {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
  JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY ? 'Set' : 'Not set'
});
```

---

## ✅ Prevention Checklist

Before deploying:

- [ ] All environment variables set
- [ ] MongoDB connection tested
- [ ] API key verified
- [ ] CORS configured
- [ ] Build succeeds locally
- [ ] All features tested
- [ ] Mobile responsive checked
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Security measures in place

---

**Still having issues? Check the main README.md or create an issue on GitHub.**
