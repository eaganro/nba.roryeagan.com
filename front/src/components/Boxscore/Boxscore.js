import './Boxscore.scss';
export default function Boxscore({ box }) {
  const awayBox = box?.awayTeam?.players.filter(p => p.statistics.minutes).map(p => {
    return (
      <div key={p.personId}>
        <span>{p.firstName} {p.familyName}</span>
        <span>{p.statistics.minutes}</span>
        <span>{p.statistics.fieldGoalsMade}</span>
        <span>{p.statistics.fieldGoalsAttempted}</span>
        <span>{p.statistics.fieldGoalsPercentage}</span>
        <span>{p.statistics.threePointersMade}</span>
        <span>{p.statistics.threePointersAttempted}</span>
        <span>{p.statistics.threePointersPercentage}</span>
        <span>{p.statistics.freeThrowsMade}</span>
        <span>{p.statistics.freeThrowsAttempted}</span>
        <span>{p.statistics.freeThrowsPercentage}</span>
        <span>{p.statistics.reboundsOffensive}</span>
        <span>{p.statistics.reboundsDefensive}</span>
        <span>{p.statistics.reboundsTotal}</span>
        <span>{p.statistics.assists}</span>
        <span>{p.statistics.steals}</span>
        <span>{p.statistics.blocks}</span>
        <span>{p.statistics.turnovers}</span>
        <span>{p.statistics.foulsPersonal}</span>
        <span>{p.statistics.points}</span>
        <span>{p.statistics.plusMinusPoints}</span>
      </div>
    )
  });

  const homeBox = box?.homeTeam?.players.filter(p => p.statistics.minutes).map(p => {
    return (
      <div key={p.personId}>
        <span>{p.firstName} {p.familyName}</span>
        <span>{p.statistics.minutes}</span>
        <span>{p.statistics.fieldGoalsMade}</span>
        <span>{p.statistics.fieldGoalsAttempted}</span>
        <span>{p.statistics.fieldGoalsPercentage}</span>
        <span>{p.statistics.threePointersMade}</span>
        <span>{p.statistics.threePointersAttempted}</span>
        <span>{p.statistics.threePointersPercentage}</span>
        <span>{p.statistics.freeThrowsMade}</span>
        <span>{p.statistics.freeThrowsAttempted}</span>
        <span>{p.statistics.freeThrowsPercentage}</span>
        <span>{p.statistics.reboundsOffensive}</span>
        <span>{p.statistics.reboundsDefensive}</span>
        <span>{p.statistics.reboundsTotal}</span>
        <span>{p.statistics.assists}</span>
        <span>{p.statistics.steals}</span>
        <span>{p.statistics.blocks}</span>
        <span>{p.statistics.turnovers}</span>
        <span>{p.statistics.foulsPersonal}</span>
        <span>{p.statistics.points}</span>
        <span>{p.statistics.plusMinusPoints}</span>
      </div>
    )
  });

  return (
    <div className='box'>
      <div>
        <span>PLAYER</span>
        <span>MIN</span>
        <span>FGM</span>
        <span>FGA</span>
        <span>FG%</span>
        <span>3PM</span>
        <span>3PA</span>
        <span>3P%</span>
        <span>FTM</span>
        <span>FTA</span>
        <span>FT%</span>
        <span>OREB</span>
        <span>DREB</span>
        <span>REB</span>
        <span>AST</span>
        <span>STL</span>
        <span>BLK</span>
        <span>TO</span>
        <span>PF</span>
        <span>PTS</span>
        <span>+/-</span>
      </div>
      <div>
        Away
      </div>
      {awayBox}
      <div>
        Home
      </div>
      {homeBox}
    </div>
  );
}