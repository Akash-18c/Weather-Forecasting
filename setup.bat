@echo off
echo ========================================
echo Weather Forecasting App - Setup Script
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed: 
node --version
echo.

echo [2/5] Installing backend dependencies...
cd server
if not exist "node_modules" (
    echo Installing server packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)
cd ..
echo.

echo [3/5] Installing frontend dependencies...
cd client
if not exist "node_modules" (
    echo Installing client packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)
cd ..
echo.

echo [4/5] Checking environment configuration...
if not exist "server\.env" (
    echo WARNING: .env file not found in server directory
    echo Please create server\.env file with your configuration
    echo Example file available at: server\.env.example
    echo.
    echo Required variables:
    echo - PORT=5000
    echo - MONGODB_URI=your_mongodb_connection_string
    echo - JWT_SECRET=your_jwt_secret
    echo - OPENWEATHER_API_KEY=your_api_key
    echo - NODE_ENV=development
    echo.
) else (
    echo .env file found
)
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Make sure MongoDB is running
echo    - Start MongoDB service or use MongoDB Atlas
echo.
echo 2. Configure server\.env file with your credentials
echo    - Get OpenWeather API key from: https://openweathermap.org/api
echo    - Setup MongoDB connection string
echo.
echo 3. Start the backend server:
echo    cd server
echo    npm run dev
echo.
echo 4. In a new terminal, start the frontend:
echo    cd client
echo    npm run dev
echo.
echo 5. Open browser and visit: http://localhost:3000
echo.
echo ========================================
echo For detailed instructions, see README.md
echo For quick start guide, see QUICKSTART.md
echo ========================================
echo.
pause
