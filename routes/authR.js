import express from 'express';
import { register, login, refresh, logout } from '../controllers/authC.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
export default router;