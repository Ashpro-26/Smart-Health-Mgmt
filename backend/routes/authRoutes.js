import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  resetPassword,
  verifyResetCode
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/reset-password', resetPassword);
router.post('/verify-reset-code', verifyResetCode);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router; 