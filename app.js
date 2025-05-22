import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authR.js';
import walletRoutes from './routes/walletR.js';
import adminRoutes from './routes/adminR.js';
import { scheduleFraudScan } from './utils/scheduler.js';
import cookieParser from 'cookie-parser';




dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    scheduleFraudScan();
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error(err));
