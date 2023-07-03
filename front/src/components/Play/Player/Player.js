import './Player.scss';
export default function Player({ actions }) {

  const playerName = actions[0].playerNameI;

  const dotActions = {
    'Made Shot': 1,
    'Missed Shot': 1,
    'Rebound': 1,
    'Missed Shot': 1,
    'Foul': 1,
    'Turnover': 1,
    'Free Throw': 1,
  }
  let playTime = []
  let dots = actions.filter(a => {
    

    return a.actionType !== 'Substitution' && a.actionType !== 'Jump Ball' && a.actionType !==  'Violation'
  }).map(a => {
    let pos = 97.5 + 350 * (a.period - 1) + (((12 - Number(a.clock.slice(2, 4))) * 60) - Number(a.clock.slice(5, 7))) * (350 / (12 * 60));
    let color = 'orange';
    if (a.description.includes('MISS')) {
      color = 'brown';
    } else if (a.description.includes('PTS')) {
      color = 'gold';
    } else if (a.description.includes('REBOUND')) {
      color = 'blue';
    } else if (a.description.includes('AST')) {
      color = 'green';
    } else if (a.actionType === 'Turnover') {
      color = 'red';
    } else if (a.description.includes('BLK')) {
      color = 'purple';
    } else if (a.description.includes('STL')) {
      color = 'pink';
    } else if (a.actionType === 'Foul') {
      color = 'black';
    } 
    return (
      <div key={a.actionId} className="dot" style={{left: `${pos}px`, backgroundColor: color}}></div>
    )
  })
  return (
    <div className='player'>
      <div className='playerName'>{playerName}</div>
      {dots}
    </div>
  );
}