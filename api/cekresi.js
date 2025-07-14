const cekresi = require('../cekresiCore');

export default async function handler(req, res) {
  const { noresi, ekspedisi } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const result = await cekresi(noresi, ekspedisi);
  res.status(200).json(result);
}
