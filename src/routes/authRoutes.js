import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router; 