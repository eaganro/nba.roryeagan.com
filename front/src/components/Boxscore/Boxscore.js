import './Boxscore.scss';
import processTeamStats from './processTeamStats';
export default function Boxscore({ box }) {
  const awayBox = processTeamStats(box?.awayTeam)
  const homeBox = processTeamStats(box?.homeTeam)

  return (
    <div className='box'>
      {awayBox}
      {homeBox}
    </div>
  );
}