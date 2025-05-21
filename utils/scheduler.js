import Transaction from '../models/transactionM.js';
import { sendMockEmail } from './emailMock.js';

export function scheduleFraudScan() {
  setInterval(async () => {
    const txs = await Transaction.find({ flagged: false });
    txs.forEach(tx => {
      if ((tx.type === 'withdraw' && tx.amount > 10000) ||
          (tx.type === 'transfer' && Date.now() - tx.timestamp < 60000)) {
        tx.flagged = true;
        tx.reason = 'Scheduled fraud scan';
        tx.save();
        sendMockEmail(`${tx.from || 'user'}@mockmail.com`, 'Scheduled Fraud Detection Alert', `Transaction flagged during scan.\nType: ${tx.type}\nAmount: $${tx.amount}`);
      }
    });
  }, 86400000); // Every 24h
}
