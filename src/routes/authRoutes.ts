import express from 'express';
import { signup, login } from '../controllers/authController';

import { protect } from '../middleware/authMiddleware';
import { getUserProfile } from '../controllers/publicationController';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', protect, getUserProfile);


export default router;
