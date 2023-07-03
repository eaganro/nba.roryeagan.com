import { useState, useEffect } from 'react';

import Schedule from '../Schedule/Schedule';
import Boxscore from '../Boxscore/Boxscore';
import Play from '../Play/Play';

import './App.scss';
export default function App() {

  const [date, setDate] = useState("2022-11-28")
  const [games, setGames] = useState([]);
  const [box, setBox] = useState({});
  const [playByPlay, setPlayByPlay] = useState([]);
  const [gameId, setGameId] = useState("0022200299");
  const [awayTeamId, setAwayTeamId] = useState(null);
  const [homeTeamId, setHomeTeamId] = useState(null);

  const [awayActions, setAwayActions] = useState([]);
  const [homeActions, setHomeActions] = useState([]);
  const [scoreTimeline, setScoreTimeline] = useState([]);



  useEffect(() => {
    fetch(`/games?date=${date}`).then(r =>  {
      if (r.status === 404) {
        console.log('eher');
        return [];
      } else {
        return r.json()
      }
    }).then(gamesData => {
      console.log(gamesData);
      setGames(gamesData);
    });
  }, [date]);

  useEffect(() => {
    Promise.all([fetch(`/data/boxData/${gameId}`), fetch(`/data/playByPlayData/${gameId}`)]).then(d => {
      return Promise.all(d.map(r => r.json()));
    }).then(d => {
      const boxData = d[0];
      setBox(boxData);
      console.log(boxData)
      setAwayTeamId(boxData.awayTeamId);
      setHomeTeamId(boxData.homeTeamId);

      const play = d[1];
      setPlayByPlay(play);
      // processPlayData(play);
    })
  }, [gameId]);

  useEffect(() => {
    processPlayData(playByPlay);
  }, [awayTeamId]);

  const changeDate = (e) => {
    setDate(e.target.value);
  }

  const changeGame = (id) => {
    setGameId(id);
  }

  const processPlayData = (data) => {
    if (data.length === 0) {
      return [];
    }
    console.log(calculatePlaytimeSections(data));
    console.log(awayTeamId, data)
    let awayPlayers = {

    };
    let homePlayers = {
  
    };

    let awayAssistActions = []
    let homeAssistActions = []

    let scoreTimeline = [];
    let sAway = '0';
    let sHome = '0';
    data.forEach(a => {
      if (a.scoreAway !== '') {
        if (a.scoreAway !== sAway) {
          scoreTimeline.push({
            away: a.scoreAway,
            home: a.scoreHome,
            clock: a.clock,
            period: a.period
          });
          sAway = a.scoreAway;
        }
        if (a.scoreHome !== sHome) {
          scoreTimeline.push({
            away: a.scoreAway,
            home: a.scoreHome,
            clock: a.clock,
            period: a.period
          });
          sHome = a.scoreHome;
        }
      }

      if(a.teamId === awayTeamId) {
        if (!awayPlayers[a.playerName]) {
          awayPlayers[a.playerName] = [a];
        } else {
          awayPlayers[a.playerName].push(a);
        }
        if (a.description.includes('AST')) {
          awayAssistActions.push(a);
        }
      } else if(a.teamId === homeTeamId) {
        if (!homePlayers[a.playerName]) {
          homePlayers[a.playerName] = [a];
        } else {
          homePlayers[a.playerName].push(a);
        }
        if (a.description.includes('AST')) {
          homeAssistActions.push(a);
        }
      }
    });

    console.log(scoreTimeline);
    setScoreTimeline(scoreTimeline);

    awayAssistActions.forEach(a => {
      let startName = a.description.lastIndexOf('(') + 1;
      let lastSpace = a.description.lastIndexOf(' ');
      let endName = startName + a.description.slice(startName, lastSpace).lastIndexOf(' ');
      let name = a.description.slice(startName, endName);
      if (name.includes(' ') && name.split(' ')[1] !== 'Jr.' && name.split(' ')[1].length > 3) {
        name = name.split(' ')[1];
      }
      awayPlayers[name].push({
        actionType: 'Assist',
        clock: a.clock,
        description: a.description.slice(startName, -1),
        actionId: a.actionId + 'a',
        teamId: a.teamId,
        scoreHome: a.scoreHome,
        scoreAway: a.scoreAway,
        personId: awayPlayers[name][0].personId,
        playerName: awayPlayers[name][0].playerName,
        playerNameI: awayPlayers[name][0].playerNameI,
        period: a.period
      });
    });

    homeAssistActions.forEach(a => {
      let startName = a.description.lastIndexOf('(') + 1;
      let lastSpace = a.description.lastIndexOf(' ');
      let endName = startName + a.description.slice(startName, lastSpace).lastIndexOf(' ');
      let name = a.description.slice(startName, endName);
      if (name.includes(' ') && name.split(' ')[1] !== 'Jr.' && name.split(' ')[1].length > 3) {
        name = name.split(' ')[1];
      }
      homePlayers[name].push({
        actionType: 'Assist',
        clock: a.clock,
        description: a.description.slice(startName, -1),
        actionId: a.actionId + 'a',
        teamId: a.teamId,
        scoreHome: a.scoreHome,
        scoreAway: a.scoreAway,
        personId: homePlayers[name][0].personId,
        playerName: homePlayers[name][0].playerName,
        playerNameI: homePlayers[name][0].playerNameI,
        period: a.period
      })
    });

    console.log(homePlayers);

    setAwayActions(awayPlayers);
    setHomeActions(homePlayers);
  }

  return (
    <div className=''>
      <Schedule games={games} date={date} changeDate={changeDate} changeGame={changeGame}></Schedule>
      <Play awayPlayers={awayActions} homePlayers={homeActions} scoreTimeline={scoreTimeline}></Play>
      <Boxscore box={box}></Boxscore>
    </div>
  );
}


function timeToSeconds(time) {
  // Convert time string in the format "PT12M00.00S" to seconds
  const match = time.match(/PT(\d+)M(\d+)\.(\d+)S/);
  
  if (match) {
    const minutes = parseInt(match[1] || 0);
    const seconds = parseInt(match[2] || 0);
    const milliseconds = parseInt(match[3] || 0);
    return minutes * 60 + seconds + milliseconds / 100;
  }
  
  return 0;
}