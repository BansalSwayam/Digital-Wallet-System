import express from 'express';
import auth from '../middleware/authMW.js';
import fraudCheck from '../middleware/fraudDetectionMW.js';
import { deposit, withdraw, transfer, history } from '../controllers/walletC.js';

const router = express.Router();
router.post('/deposit', auth, deposit);
// router.post('/withdraw', auth, fraudCheck, withdraw);
router.post(
  '/withdraw',
  auth,
  (req, res, next) => {
    req.body.type = 'withdraw'; 
    next();
  },
  fraudCheck,
  withdraw
);

router.post('/transfer/c/:to', auth, fraudCheck, transfer);
router.get('/history', auth, history);
export default router;
