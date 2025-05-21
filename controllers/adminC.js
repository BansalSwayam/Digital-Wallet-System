import Transaction from '../models/transactionM.js';
import User from '../models/userM.js';

export const getFlagged = async (_, res) => {
  const flagged = await Transaction.find({ flagged: true });
  res.json({ flagged });
};

export const getSummary = async (_, res) => {
  const users = await User.find({});
  const total = users.reduce((sum, u) => sum + u.balance, 0);
  res.json({ totalBalance: total });
};

export const topUsers = async (_, res) => {
  const users = await User.find({}).sort({ balance: -1 }).limit(5);
  res.json({ topUsers: users });
};
