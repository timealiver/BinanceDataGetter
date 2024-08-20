const https = require('https');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Ensure data directory exists
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

let startDate = moment('2022-01-01');
let endDate = moment('2024-06-25');

for (let date = startDate; date <= endDate; date.add(1, 'days')) {
  const formattedDate = date.format('YYYY-MM-DD');
  const url = `https://data.binance.vision/data/spot/daily/klines/BTCUSDT/1h/BTCUSDT-1h-${formattedDate}.zip`;
  const file = fs.createWriteStream(
    path.join('./data', `BTCUSDT-1h-${formattedDate}.zip`),
  );

  const request = https.get(url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log(`Download Completed for ${formattedDate}.`);
    });
  });
}
