import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favorites: [{
    city: {
      type: String,
      required: true
    },
    country: String,
    lat: Number,
    lon: Number,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  preferences: {
    unit: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
