import './Score.scss';

export default function Score({ homeTeam, awayTeam, score, date}) {

  const gameDate = new Date(date)

  return (
    <div className='scoreElement'>
      <div>{gameDate.toDateString()}</div>
      <div className='scoreArea'>
        <div>{score ? score.away : '--'}</div>
        <img height="80" width="80" className='awayImg' src={`img/teams/${awayTeam}.png`}></img>
        <div className='at'>AT</div>
        <img height="80" width="80" className='homeImg' src={`img/teams/${homeTeam}.png`}></img>
        <div>{score ? score.home : '--'}</div>
      </div>
    </div>
  );
}