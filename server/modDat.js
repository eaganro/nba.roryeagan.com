import * as fs from 'fs';

fs.readdir('./data/boxData', (err, files) => {
  files.forEach(file => {
    fs.rename(`./data/boxData/${file}`, `./data/boxData/${file.slice(-10)}`, () => {});
  });
});