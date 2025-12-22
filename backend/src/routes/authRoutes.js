import express from 'express';
import { registerUser, loginUser, checkEmail } from '../controllers/authController.js';

export const router = express.Router();

router.post('/check-email', checkEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);


