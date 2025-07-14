const cekresi = require('../cekresiCore');

export default async function handler(req, res) {
  const { noresi, ekspedisi } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const result = await cekresi(noresi, ekspedisi);
  res.status(200).json(result);
}

//   Created By Kai Contact https://wa.me/6282126446272 Pake Sc Error? Join Saja Disini dan report menggunakan disqus yang disediakan di desk > https://whatsapp.com/channel/0029VanrndJICVfcrjFr3x2R  > https://whatsapp.com/channel/0029VanrndJICVfcrjFr3x2R > https://whatsapp.com/channel/0029VanrndJICVfcrjFr3x2R Mau Jasa bikin web? porto? Chat Saja   Menerima tapi html css JavaScript aja soalnya yang lain malas //*