import './Schedule.scss';

export default function Schedule({ games, date, changeDate, changeGame }) {

  const gamesList = games.map(g => {
    return (
      <div key={g.gameId} onClick={() => changeGame(g.gameId)}>
        {g.away} - {g.home}
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