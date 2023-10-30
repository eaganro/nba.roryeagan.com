import './Schedule.scss';

export default function Schedule({ games, date, changeDate, changeGame }) {

  const gamesList = games.map(g => {
    return (
      <div className='game' key={g.gameId} onClick={() => changeGame(g.gameId)}>
        <div>{g.away} - {g.home}</div>
        <div>{'sco'} - {'sco'}</div>
        <div>{'time'}</div>
      </div>
    )
  });

  return (
    <div className='schedule'>
      <input className='dateInput' type="date" value={date} onChange={changeDate}></input>
      <div className="games">
        {gamesList}
      </div>
    </div>
  );
}