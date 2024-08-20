const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const folderPath = 'D:/BinanceDataGetter/data';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((filename) => {
    if (filename.endsWith('.zip')) {
      const filePath = path.join(folderPath, filename);

      const zip = new AdmZip(filePath);
      const entries = zip.getEntries();

      if (entries.length === 0) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting zip archive:', err);
          } else {
            console.log(`Deleted empty zip archive: ${filename}`);
          }
        });
      }
    }
  });
});
