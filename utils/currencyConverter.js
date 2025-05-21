import fetch from 'node-fetch';

let exchangeRates = { INR: 80 }; // fallback value

export const updateExchangeRates = async () => {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await res.json();
    exchangeRates = data.rates;
    console.log('Exchange rates updated:', exchangeRates);
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
  }
};

export const convertToUSD = (amount, currency) => {
  if (currency === 'USD') return amount;
  const rate = exchangeRates[currency] || 1;
  return amount / rate;
};

export const convertFromUSD = (amount, currency) => {
  if (currency === 'USD') return amount;
  const rate = exchangeRates[currency] || 1;
  return amount * rate;
};