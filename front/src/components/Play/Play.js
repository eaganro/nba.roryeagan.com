import { useState } from 'react';
// import getWindowDimensions from '../hooks/windowDimensions';

import Player from './Player/Player';

import './Play.scss';

export default function Play({ awayPlayers, homePlayers, allActions, scoreTimeline, awayPlayerTimeline, homePlayerTimeline }) {

  const [descriptionArray, setDescriptionArray] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  // const { windowHeight, windowWidth } = getWindowDimensions();
  // console.log(window.innerWidth);
  // setTimeout(() => console.log(windowWidth), 2000);
  const playtimes = {};
  Object.keys(awayPlayers).forEach(player => {
    playtimes[player] = {
      times: [],
      on: false
    };
  });
  Object.keys(awayPlayers).forEach(player => {
    awayPlayers[player].forEach(action => {
      if (action.actionType === 'Substitution') {

      } else {
        if (playtimes[player].on === false) {
          playtimes[player].on = true;
        }
      }
    });
  });
  // console.log(windowWidth)
  const width = windowWidth * 0.9 - 100;
  console.log(width)
  const qWidth = width / 4;

  const awayRows = Object.keys(awayPlayers).map(name => {
    return (
      <Player key={name} actions={awayPlayers[name]} timeline={awayPlayerTimeline[name]} name={name} width={width}></Player>
    );
  });

  const homeRows = Object.keys(homePlayers).map(name => {
    return (
      <Player key={name} actions={homePlayers[name]} timeline={homePlayerTimeline[name]} name={name} width={width}></Player>
    );
  });

  let maxAwayLead = 0;
  let maxHomeLead = 0;
  scoreTimeline.forEach(t => {
    const scoreDiff = Number(t.away) - Number(t.home);
    maxAwayLead = Math.max(maxAwayLead, scoreDiff);
    maxHomeLead = Math.min(maxHomeLead, scoreDiff);
    t.scoreDiff = scoreDiff;
  });

  let maxLead = Math.max(maxAwayLead, maxHomeLead * -1);

  let maxY = Math.floor(maxLead / 5) * 5 + 10

  let startx = 0;
  let starty = 0;
  const timeline = scoreTimeline.map((t, i) => {
    let x1 = startx;
    let x2 =  (((t.period - 1) * 12 * 60 + 12 * 60 - timeToSeconds(t.clock)) / (4 * 12 * 60)) * (qWidth * 4);
    startx = x2;

    let y1 = starty;
    let y2 = t.scoreDiff * - 300 / maxY;
    starty = y2;
    return ([
      <line key={'one' + i} x1={100 + x1} y1={300 + y1} x2={100 + x2} y2={300 + y1} style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />,
      <line key={'two' + i} x1={100 + x2} y1={300 + y1} x2={100 + x2} y2={300 + y2} style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />
    ])
  }).flat();

  timeline.push(<line key={'secondLast'} x1={100 + startx} y1={300 + starty} x2={100 + qWidth * 4} y2={300 + starty} style={{ stroke: 'rgb(255,0,0)', strokeWidth:2 }} />)
  timeline.unshift(<line key={'Last'} x1={0} y1={300} x2={width + 100} y2={300} style={{ stroke: 'black', strokeWidth:1 }} />)
  timeline.unshift(<line key={'q1'} x1={100 + qWidth} y1={10} x2={100 + qWidth} y2={590} style={{ stroke:'black', strokeWidth:1 }} />)
  timeline.unshift(<line key={'q2'} x1={100 + qWidth * 2} y1={10} x2={100 + qWidth * 2} y2={590} style={{ stroke: 'black', strokeWidth: 1 }} />)
  timeline.unshift(<line key={'q3'} x1={100 + qWidth * 3} y1={10} x2={100 + qWidth * 3} y2={590} style={{ stroke: 'black', strokeWidth: 1 }} />)

  const descriptionList = descriptionArray.map(a => (<div>{a.description} - {a.clock}</div>));

  let showMouse = true;
  const mouseOver = (e) => {
    if (showMouse) {
      let el = e.target;
      while (el.className !== 'play') {
        el = el.parentElement;
      }
      let pos = e.clientX - el.offsetLeft - 100;

      let a = 0;

      let goneOver = false;
      let sameTime = 1;
      for (let i = 1; i < allActions.length && goneOver === false; i += 1) {
        const actionPos = (((allActions[i].period - 1) * 12 * 60 + 12 * 60 - timeToSeconds(allActions[i].clock)) / (4 * 12 * 60)) * (qWidth * 4);
        if (actionPos > pos) {
          goneOver = true;
        } else {
          if (allActions[a].clock === allActions[i].clock) {
            sameTime += 1;
          } else {
            sameTime = 1;
          }
          a = i;
        }
      }
      const hoverActions = [];
      for (let i = 0; i < sameTime; i += 1) {
        hoverActions.push(allActions[a - i]);
      }
      // console.log(hoverActions.map(a => a.description));
      setDescriptionArray(hoverActions);


      showMouse = false;
      setTimeout(() => showMouse = true, 200);
    }
  }

  return (
    <div onMouseMove={mouseOver} className='play' style={{ width: width + 100 }}>
      <div className="descriptionArea">{descriptionList}</div>
      <svg height="600" width={width + 100} className='line'>
        {timeline}
      </svg>
      <div className='teamSection'>
        away
        {awayRows}
      </div>
      <div className='teamSection'>
        home
        {homeRows}
      </div>
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
