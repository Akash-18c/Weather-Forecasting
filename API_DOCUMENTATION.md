# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `400` - Validation error
- `400` - Email already registered
- `500` - Server error

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "unit": "metric",
      "darkMode": false
    }
  }
}
```

**Errors:**
- `400` - Missing credentials
- `401` - Invalid credentials
- `500` - Server error

---

## Weather Endpoints

### Get Weather by City
**GET** `/weather/city/:city`

**Query Parameters:**
- `units` (optional) - `metric` or `imperial` (default: `metric`)

**Example:**
```
GET /weather/city/London?units=metric
```

**Response (200):**
```json
{
  "location": {
    "name": "London",
    "country": "GB",
    "lat": 51.5074,
    "lon": -0.1278
  },
  "current": {
    "coord": { "lon": -0.1278, "lat": 51.5074 },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "main": {
      "temp": 15.5,
      "feels_like": 14.8,
      "temp_min": 13.2,
      "temp_max": 17.1,
      "pressure": 1013,
      "humidity": 72
    },
    "wind": {
      "speed": 3.5,
      "deg": 220
    },
    "visibility": 10000,
    "sys": {
      "country": "GB",
      "sunrise": 1699512000,
      "sunset": 1699548000
    }
  },
  "forecast": {
    "current": { ... },
    "hourly": [ ... ],
    "daily": [ ... ],
    "alerts": [ ... ]
  }
}
```

**Errors:**
- `404` - City not found
- `500` - API error

---

### Get Weather by Coordinates
**GET** `/weather/coords`

**Query Parameters:**
- `lat` (required) - Latitude
- `lon` (required) - Longitude
- `units` (optional) - `metric` or `imperial`

**Example:**
```
GET /weather/coords?lat=51.5074&lon=-0.1278&units=metric
```

**Response (200):**
Same structure as "Get Weather by City"

**Errors:**
- `400` - Missing coordinates
- `500` - API error

---

### Get Air Quality Index
**GET** `/weather/aqi`

**Query Parameters:**
- `lat` (required) - Latitude
- `lon` (required) - Longitude

**Example:**
```
GET /weather/aqi?lat=51.5074&lon=-0.1278
```

**Response (200):**
```json
{
  "coord": {
    "lon": -0.1278,
    "lat": 51.5074
  },
  "list": [
    {
      "main": {
        "aqi": 2
      },
      "components": {
        "co": 230.31,
        "no": 0.01,
        "no2": 14.87,
        "o3": 68.66,
        "so2": 0.64,
        "pm2_5": 3.41,
        "pm10": 4.03,
        "nh3": 0.71
      },
      "dt": 1699512000
    }
  ]
}
```

**AQI Levels:**
- `1` - Good
- `2` - Fair
- `3` - Moderate
- `4` - Poor
- `5` - Very Poor

**Errors:**
- `400` - Missing coordinates
- `500` - API error

---

## User Endpoints (Protected)

### Add Favorite City
**POST** `/user/favorites`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "city": "London",
  "country": "GB",
  "lat": 51.5074,
  "lon": -0.1278
}
```

**Response (200):**
```json
{
  "message": "City added to favorites",
  "favorites": [
    {
      "city": "London",
      "country": "GB",
      "lat": 51.5074,
      "lon": -0.1278,
      "addedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Errors:**
- `400` - City already in favorites
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

---

### Get Favorite Cities
**GET** `/user/favorites`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "favorites": [
    {
      "city": "London",
      "country": "GB",
      "lat": 51.5074,
      "lon": -0.1278,
      "addedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "city": "Paris",
      "country": "FR",
      "lat": 48.8566,
      "lon": 2.3522,
      "addedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

---

### Remove Favorite City
**DELETE** `/user/favorites/:city`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
DELETE /user/favorites/London
```

**Response (200):**
```json
{
  "message": "City removed from favorites",
  "favorites": [
    {
      "city": "Paris",
      "country": "FR",
      "lat": 48.8566,
      "lon": 2.3522,
      "addedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

---

### Update User Preferences
**PUT** `/user/preferences`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "unit": "imperial",
  "darkMode": true
}
```

**Response (200):**
```json
{
  "message": "Preferences updated",
  "preferences": {
    "unit": "imperial",
    "darkMode": true
  }
}
```

**Errors:**
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

## Rate Limiting

OpenWeather API free tier limits:
- 60 calls/minute
- 1,000,000 calls/month

## Data Freshness

- Current weather: Updated every 10 minutes
- Forecast: Updated every 3 hours
- AQI: Updated hourly

## Testing with cURL

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Weather:
```bash
curl http://localhost:5000/api/weather/city/London?units=metric
```

### Add Favorite (with token):
```bash
curl -X POST http://localhost:5000/api/user/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"city":"London","country":"GB","lat":51.5074,"lon":-0.1278}'
```

---

## OpenWeather API Reference

This application uses the following OpenWeather APIs:
- Geocoding API
- Current Weather Data API
- One Call API 3.0
- Air Pollution API

For more details: https://openweathermap.org/api
