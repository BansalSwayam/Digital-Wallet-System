import Transaction from '../models/transactionM.js';
import User from '../models/userM.js';
import { convertToUSD, convertFromUSD, updateExchangeRates } from '../utils/currencyConverter.js';

export const deposit = async (req, res) => {
  const { amount, currency = 'USD' } = req.body;
  console.log(currency);
  
  if (amount <= 0) return res.status(400).json({ msg: 'Invalid amount' });
  await updateExchangeRates();
  const user = await User.findById(req.user.id);
  const amountInUSD = convertToUSD(amount, currency);
  console.log(amountInUSD);
  
  user.balance += amountInUSD;
  console.log(user.balance);
  
  await user.save();
  await new Transaction({ to: user.username, amount, currency, type: 'deposit' }).save();
  res.json({ msg: 'Deposit successful', balance: convertFromUSD(user.balance, currency) });
};

export const withdraw = async (req, res) => {
  const { amount, currency = 'USD' } = req.body;
  await updateExchangeRates();
  const user = await User.findById(req.user.id);
  const amountInUSD = convertToUSD(amount, currency);
  if (amountInUSD > user.balance) return res.status(400).json({ msg: 'Insufficient balance' });
  user.balance -= amountInUSD;
  await user.save();
  await new Transaction({ from: user.username, amount, currency, type: 'withdraw', flagged: req.flagged, reason: req.reason }).save();
  res.json({ msg: 'Withdraw successful', balance: convertFromUSD(user.balance, currency) });
};

export const transfer = async (req, res) => {
  const { to, amount, currency = 'USD' } = req.body;
  await updateExchangeRates();
  const fromUser = await User.findById(req.user.id);
  const toUser = await User.findOne({ username: to });
  const amountInUSD = convertToUSD(amount, currency);
  if (!toUser || amount <= 0 || fromUser.balance < amountInUSD)
    return res.status(400).json({ msg: 'Invalid transfer' });
  fromUser.balance -= amountInUSD;
  toUser.balance += amountInUSD;
  await fromUser.save();
  await toUser.save();
  await new Transaction({ from: fromUser.username, to, amount, currency, type: 'transfer', flagged: req.flagged, reason: req.reason }).save();
  res.json({ msg: 'Transfer successful', balance: convertFromUSD(fromUser.balance, currency) });
};

export const history = async (req, res) => {
  const user = req.user.username;
  const transactions = await Transaction.find({ $or: [{ from: user }, { to: user }] });

  const formattedHistory = transactions.map(tx => {
    const type = tx.to === user && tx.from !== user ? 'credited' : 'debited';
    return {
      type,
      amount: tx.amount,
      currency: tx.currency,
      from: tx.from,
      to: tx.to,
      timestamp: tx.timestamp,
      flagged: tx.flagged,
      reason: tx.reason || null
    };
  });

  res.json({ history: formattedHistory });
};
