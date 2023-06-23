import './Player.scss';
export default function Player({ actions }) {
  const dotActions = {
    'Made Shot': 1,
    'Rebound': 1,
    'Missed Shot': 1,
    'Foul': 1,
    'Turnover': 1,
    'Free Throw': 1,
  }
  let dots = actions.map(a => {
    let pos = 250 * (a.period - 1) + (((12 - Number(a.clock.slice(2, 4))) * 60) + Number(a.clock.slice(5, 7))) * (250 / (12 * 60))
    return (
      <div className="dot" style={{left: `${pos}px`}}></div>
    )
  })
  return (
    <div className='player'>
      {dots}
    </div>
  );
}