import express from 'express';
import auth from '../middleware/authMW.js';
import { getFlagged, getSummary, topUsers } from '../controllers/adminC.js';

const router = express.Router();
router.get('/flagged', auth, getFlagged);
router.get('/summary', auth, getSummary);
router.get('/top-users', auth, topUsers);
export default router;
