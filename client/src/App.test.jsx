import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WeatherProvider } from './context/WeatherContext';

function TestHome() {
  return (
    <div style={{ background: '#1E90FF', minHeight: '100vh', padding: '20px', color: 'white' }}>
      <h1>Weather App Test</h1>
      <p>If you see this, the app is working!</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <WeatherProvider>
          <Routes>
            <Route path="/" element={<TestHome />} />
          </Routes>
        </WeatherProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
