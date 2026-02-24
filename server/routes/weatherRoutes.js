import express from 'express';
import { getWeatherByCity, getWeatherByCoords, getAirQuality } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/city/:city', getWeatherByCity);
router.get('/coords', getWeatherByCoords);
router.get('/aqi', getAirQuality);

export default router;
