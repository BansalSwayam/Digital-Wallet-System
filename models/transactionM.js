import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  type: String,
  currency: { type: String, default: 'USD' },
  timestamp: { type: Date, default: Date.now },
  flagged: { type: Boolean, default: false },
  reason: String,
  softDeleted: { type: Boolean, default: false },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
