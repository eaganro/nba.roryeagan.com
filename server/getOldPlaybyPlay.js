import gamesObj from './public/data/schedule/schedule.json' assert { type: 'json' };
import * as fs from 'fs';
import * as cheerio from 'cheerio';

let requestList = [];
Object.entries(gamesObj).forEach(([k,v]) => {
  if (new Date() > new Date(k)) {
    v.forEach(gameId => {
      requestList.push([gameId, Math.random()])
    });
  }
});
requestList.sort((a, b) => a[1] - b[1]);

const getPage = function(i) {
  if (i === requestList.length) {
    return;
  }
  const gameId = requestList[i][0];
  const gameIdNums = gameId.slice(-10);
  console.log(`${i} - ${gameId}`);

  fs.stat(`public/data/boxData/${gameIdNums}.json`, (err, stat) => {
    if (stat === undefined) {
      fetchFunc(gameId, i);
    } else {
      getPage(i + 1);
    }
  });
}

const fetchFunc = function(gameId, i) {
  fetch(`https://www.nba.com/game/${gameId}`)
    .then(res=> res.text()).then(data => {
      const $ = cheerio.load(data);
      const obj = JSON.parse($('#__NEXT_DATA__').html());
      const playByPlay = obj.props.pageProps.playByPlay.actions;
      const box = obj.props.pageProps.game;
      makeFile(playByPlay, box, gameId.slice(-10));
      setTimeout(() => {
        getPage(i + 1);
      }, Math.random() * 0)
    });
}

const makeFile = function(playByPlay, box, gameId) {
  fs.writeFile(`public/data/playByPlayData/${gameId}.json`, JSON.stringify(playByPlay), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.writeFile(`public/data/boxData/${gameId}.json`, JSON.stringify(box), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

// requestList.forEach((v, i) => {
//   getPage(i);
//   setTimeout(() => {}, 200);
// });

getPage(0);