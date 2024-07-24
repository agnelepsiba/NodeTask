const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/input.txt');

const modifyFile = () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const modifiedData = data.toUpperCase(); // Example modification
    fs.writeFile(filePath, modifiedData, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      }
    });
  });
};

module.exports = modifyFile;
