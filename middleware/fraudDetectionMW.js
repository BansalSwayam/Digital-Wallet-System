import Transaction from '../models/transactionM.js';
import { sendMockEmail } from '../utils/emailMock.js';

const fraudDetection = async (req, res, next) => {
  const { amount, type, from } = req.body;
  let flagged = false;
  let reason = '';

  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const recentTxs = await Transaction.find({ from, timestamp: { $gte: oneMinuteAgo } });

  if (type === 'transfer' && recentTxs.length >= 3) {
    flagged = true;
    reason = 'Multiple transfers in a short period';
  }

  if (type === 'withdraw' && amount >= 10000) {
    flagged = true;
    reason = 'Large withdrawal';
  }

  if (flagged) {
    sendMockEmail(`${from}@mockmail.com`, 'Suspicious Transaction Alert', `A ${type} of amount $${amount} was flagged.\nReason: ${reason}`);
  }

  req.flagged = flagged;
  req.reason = reason;
  next();
};

export default fraudDetection;
