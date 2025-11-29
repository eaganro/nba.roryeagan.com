import tinycolor from 'tinycolor2';

const nbaTeamColors = {
    ATL: { primary: '#E03A3E', secondary: '#C1D32F' },      // Red / Volt
    BOS: { primary: '#007A33', secondary: '#BA9653' },      // Green / Gold
    BKN: { primary: '#000000', secondary: '#555555' },      // Black / Dark Grey (Start Safe)
    CHA: { primary: '#1D1160', secondary: '#00788C' },      // Purple / Teal
    CHI: { primary: '#CE1141', secondary: '#000000' },      // Red / Black
    CLE: { primary: '#860038', secondary: '#FDBB30' },      // Wine / Gold
    DAL: { primary: '#00538C', secondary: '#002B5E' },      // Royal / Navy
    DEN: { primary: '#0E2240', secondary: '#FEC524' },      // Midnight Blue / Yellow
    DET: { primary: '#1D42BA', secondary: '#C8102E' },      // Royal / Red
    GSW: { primary: '#1D428A', secondary: '#FFC72C' },      // Blue / Yellow
    HOU: { primary: '#CE1141', secondary: '#000000' },      // Red / Black
    IND: { primary: '#002D62', secondary: '#FDBB30' },      // Navy / Yellow
    LAC: { primary: '#1D428A', secondary: '#C8102E' },      // Navy / Red (2025 Rebrand)
    LAL: { primary: '#552583', secondary: '#FDB927' },      // Purple / Gold
    MEM: { primary: '#5D76A9', secondary: '#12173F' },      // Light Blue / Navy
    MIA: { primary: '#98002E', secondary: '#F9A01B' },      // Red / Yellow
    MIL: { primary: '#00471B', secondary: '#000000' },      // Green / Black (Cream removed)
    MIN: { primary: '#0C2340', secondary: '#236192' },      // Navy / Lake Blue
    NOP: { primary: '#002B5C', secondary: '#B4975A' },      // Navy / Gold
    NYK: { primary: '#006BB6', secondary: '#F58426' },      // Blue / Orange
    OKC: { primary: '#007AC1', secondary: '#EF3B24' },      // Blue / Orange
    ORL: { primary: '#0077C0', secondary: '#000000' },      // Blue / Black (Silver removed)
    PHI: { primary: '#006BB6', secondary: '#ED174C' },      // Blue / Red
    PHX: { primary: '#1D1160', secondary: '#E56020' },      // Purple / Orange
    POR: { primary: '#E03A3E', secondary: '#000000' },      // Red / Black
    SAC: { primary: '#5A2D81', secondary: '#63727A' },      // Purple / Gray
    SAS: { primary: '#000000', secondary: '#444444' },      // Black / Charcoal (Silver removed)
    TOR: { primary: '#CE1141', secondary: '#000000' },      // Red / Black
    UTA: { primary: '#552583', secondary: '#000000' },      // Purple / Black (2025 Rebrand)
    WAS: { primary: '#002B5C', secondary: '#E31837' }       // Navy / Red
  };

// Convert hex color to RGB object
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate perceptual color distance using weighted Euclidean distance
// This accounts for human eye sensitivity (more sensitive to green, less to blue)
function colorDistance(hex1, hex2) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return Infinity;

  const rMean = (c1.r + c2.r) / 2;
  const dR = c1.r - c2.r;
  const dG = c1.g - c2.g;
  const dB = c1.b - c2.b;

  // Weighted distance formula for better perceptual accuracy
  const weightR = 2 + rMean / 256;
  const weightG = 4;
  const weightB = 2 + (255 - rMean) / 256;

  return Math.sqrt(weightR * dR * dR + weightG * dG * dG + weightB * dB * dB);
}

// Check if two colors are too similar (threshold ~220 works well for distinguishing team colors)
function areColorsTooClose(hex1, hex2, threshold = 220) {
  return colorDistance(hex1, hex2) < threshold;
}

// Get team colors for a matchup, using secondary for away if colors clash
function getMatchupColors(awayAbr, homeAbr) {
  const awayTeam = nbaTeamColors[awayAbr];
  const homeTeam = nbaTeamColors[homeAbr];

  if (!awayTeam || !homeTeam) {
    return {
      away: awayTeam?.primary || '#888888',
      home: homeTeam?.primary || '#888888'
    };
  }

  const homePrimary = homeTeam.primary;
  const awayPrimary = awayTeam.primary;

  // Home team always uses primary, away switches to secondary if too close
  const awayColor = areColorsTooClose(awayPrimary, homePrimary)
    ? awayTeam.secondary
    : awayPrimary;

  return {
    away: awayColor,
    home: homePrimary
  };
}

// Get a safe background color that remains visible even for light colors
// Light colors (gold, silver) are darkened and given higher opacity
// Dark colors (navy, black) use standard low opacity
function getSafeBackground(hexColor) {
  const color = tinycolor(hexColor);
  
  if (color.isLight()) {
    // Darken light colors and bump opacity to keep them visible
    return color.darken(25).setAlpha(0.25).toRgbString();
  }
  
  // For dark colors, standard low opacity is fine
  return color.setAlpha(0.15).toRgbString();
}

export default nbaTeamColors;
export { hexToRgb, colorDistance, areColorsTooClose, getMatchupColors, getSafeBackground };