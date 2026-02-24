import User from '../models/User.js';

export const addFavorite = async (req, res) => {
  try {
    const { city, country, lat, lon } = req.body;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingFavorite = user.favorites.find(fav => fav.city.toLowerCase() === city.toLowerCase());
    if (existingFavorite) {
      return res.status(400).json({ error: 'City already in favorites' });
    }

    user.favorites.push({ city, country, lat, lon });
    await user.save();

    res.json({
      message: 'City added to favorites',
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { city } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.favorites = user.favorites.filter(
      fav => fav.city.toLowerCase() !== city.toLowerCase()
    );
    await user.save();

    res.json({
      message: 'City removed from favorites',
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const { unit, darkMode } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (unit) user.preferences.unit = unit;
    if (darkMode !== undefined) user.preferences.darkMode = darkMode;

    await user.save();

    res.json({
      message: 'Preferences updated',
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};
