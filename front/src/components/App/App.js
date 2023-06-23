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

  // useEffect(() => {
  //   fetch(`/game?gameId=${gameId}`).then(r =>  r.json()).then(gamesData => {
  //     console.log(gamesData);
  //     setGames(gamesData);
  //   });
  // }, [date]);

  useEffect(() => {
    fetch(`/data/boxData/${gameId}`).then(r =>  r.json()).then(boxData => {
      setBox(boxData);
      setAwayTeamId(boxData.awayTeamId);
      setHomeTeamId(boxData.homeTeamId);
    });
  }, [gameId]);

  useEffect(() => {
    fetch(`/data/playByPlayData/${gameId}`).then(r =>  r.json()).then(playData => {
      setPlayByPlay(playData);
    });
  }, [gameId]);

  const changeDate = (e) => {
    setDate(e.target.value);
  }

  const changeGame = (id) => {
    setGameId(id);
  }

  return (
    <div className=''>
      <Schedule games={games} date={date} changeDate={changeDate} changeGame={changeGame}></Schedule>
      <Play play={playByPlay} homeId={homeTeamId} awayId={awayTeamId}></Play>
      <Boxscore box={box}></Boxscore>
    </div>
  );
}