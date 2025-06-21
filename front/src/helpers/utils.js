export function timeToSeconds(time) {
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

export function fixPlayerName(a) {
  let playerName = a.playerName;
  let nameLoc = a.description.indexOf(a.playerName);
  if (nameLoc > 0 && a.description[nameLoc - 2] === '.') {
    playerName = a.description.slice(a.description.slice(0, nameLoc - 2).lastIndexOf(' ') + 1, nameLoc + a.playerName.length);
  }
  return playerName;
}