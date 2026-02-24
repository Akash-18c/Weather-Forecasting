import express from 'express';
import { addFavorite, getFavorites, removeFavorite, updatePreferences } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/favorites', authMiddleware, addFavorite);
router.get('/favorites', authMiddleware, getFavorites);
router.delete('/favorites/:city', authMiddleware, removeFavorite);
router.put('/preferences', authMiddleware, updatePreferences);

export default router;
