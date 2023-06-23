import Player from './Player/Player';

import './Play.scss';

export default function Play({ play, homeId, awayId }) {
  let awayPlayers = {

  };
  let homePlayers = {

  };
  play.forEach(a => {

    if(a.teamId === awayId) {
      if (!awayPlayers[a.personId]) {
        awayPlayers[a.personId] = [a];
      } else {
        awayPlayers[a.personId].push(a);
      }
    } else if(a.teamId === homeId) {
      if (!homePlayers[a.personId]) {
        homePlayers[a.personId] = [a];
      } else {
        homePlayers[a.personId].push(a);
      }
    }
  });


  const awayRows = Object.values(awayPlayers).map(p => {
    return (
      <Player actions={p}></Player>
    );
  });

  const homeRows = Object.values(homePlayers).map(p => {
    return (
      <Player actions={p}></Player>
    );
  });

  return (
    <div className='play'>
      away
      {awayRows}
      home
      {homeRows}
    </div>
  );
}