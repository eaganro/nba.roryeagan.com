export default function(teamTotals) {
  let fg;
  if ((teamTotals.fieldGoalsMade / teamTotals.fieldGoalsAttempted) === 1) {
    fg = 100;
  } else {
    fg = (Math.round((teamTotals.fieldGoalsMade / teamTotals.fieldGoalsAttempted) * 100 * 10) / 10).toFixed(1)
  }
  if (fg === 'NaN') {
    fg = 0;
  }
  let pt3;
  if ((teamTotals.threePointersMade / teamTotals.threePointersAttempted) === 1) {
    pt3 = 100;
  } else {
    pt3 = (Math.round((teamTotals.threePointersMade / teamTotals.threePointersAttempted) * 100 * 10) / 10).toFixed(1)
  }
  if (pt3 === 'NaN') {
    pt3 = 0;
  }
  let ft;
  if ((teamTotals.freeThrowsMade / teamTotals.freeThrowsAttempted) === 1) {
    ft = 100;
  } else {
    ft = (Math.round((teamTotals.freeThrowsMade / teamTotals.freeThrowsAttempted) * 100 * 10) / 10).toFixed(1)
  }
  if (ft === 'NaN') {
    ft = 0;
  }
  return [fg, pt3, ft];
}