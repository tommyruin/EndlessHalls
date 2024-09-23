document.addEventListener('DOMContentLoaded', function() {
const canvas = document.getElementById('mazeCanvas');
const miniMapCanvas = document.getElementById('miniMapCanvas');
const ctx = canvas.getContext('2d');
const miniMapCtx = miniMapCanvas.getContext('2d');

const tileSize = 200;  // Increase sub-cell size to 60x60 pixels
const miniTileSize = 10; // Reduced size to fit the larger map


// Define the 30 x 30 maze layout, based on your updated cell structure.
const maze = [
  //Row 0
  [1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 1,  1, 2, 1,  1, 1, 1,  1, 17, 1,  1, 1, 1,  1, 14, 1,  1, 1, 1,  1, 13, 1,  1, 1, 1,  1, 1, 1], 
  //Row 1
  [1, 1, 1,  1, 2, 1,  1, 1, 1,  1, 17, 1,  1, 1, 1,  1, 14, 1,  1, 1, 1,  1, 13, 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 4,  4, 'PO', 'H',  'H', 0, 1,  1, 0, 'H',  'H', 0, 'H',  'H', 0, 1,  1, 17, 1,  1, 0, 'H',  'H', 'RR', 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],

  // Row 2
  [1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],
  [1, 1, 6,  6, 0, 'H',  'H', 0, 'H',  'H', 0, 'H',  'H', 0, 'H',  'H', 0, 21,  1, 'YO', 'H',  'H', 0, 1,  1, 0, 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],

  // Row 3
  [1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],
  [1, 1, 1,  1, 0, 'H',  'H', 'SK', 1,  1, 'YR', 'H',  'H', 0, 19, 1, 0, 'H',  'H', 0, 'H',  'H', 0, 1,  1, 0, 11,  11, 1, 1],
  [1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 'V', 1,  1, 1, 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1],

  // Row 4
  [1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 'V', 1,  1, 1, 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 9,  9, 0, 'H',  'H', 0, 1,  1, 0, 'H',  'H', 0, 'H',  'H', 'GO', 'H',  'H', 0, 'H',  'H', 0, 1,  1, 20, 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],

  // Row 5
  [1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],
  [1, 1, 1,  1, 0, 'H',  'H', 0, 1,  1, 'RO', 'H',  'H', 0, 'H',  'H', 'GR', 'H',  'H', 0, 'H',  'H', 0, 1,  1, 0, 8,  8, 1, 1],
  [1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1],

  // Row 6
  [1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 1,  1, 0, 'H',  'H', 0, 1,  1, 0, 1,  1, 'PR', 'H',  'H', 0, 'H',  'H', 0, 1,  1, 0, 'H',  'H', 'SK', 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],

  // Row 7
  [1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1],
  [1, 1, 10,  10, 0, 1,  1, 'BR', 'H',  'H', 0, 'H',  'H', 0, 'H',  'H', 'SK', 'H',  'H', 0, 1,  1, 'BO', 'H',  'H', 0, 7,  7, 1, 1],
  [1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1],

  // Row 8
  [1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 'V', 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 1,  1, 0, 1,  1, 0, 'H',  'H', 0, 1,  1, 'S', 1,  1, 0, 'H',  'H', 0, 1,  1, 0, 'H',  'H', 0, 5,  5, 1, 1],
  [1, 1, 1,  1, 12, 1,  1, 1, 1,  1, 15, 1,  1, 1, 1,  1, 16, 1,  1, 1, 1,  1, 1, 1,  1, 3, 1,  1, 1, 1],

  //Row 9
  [1, 1, 1,  1, 12, 1,  1, 1, 1,  1, 15, 1,  1, 1, 1,  1, 16, 1,  1, 1, 1,  1, 1, 1,  1, 3, 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1],
  [1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1,  1, 1, 1],
];

// Define colors for the orbs and runes
const colors = {
  'PO': 'purple',
  'YO': 'yellow',
  'RO': 'red',
  'GO': 'green',
  'BO': 'blue',
  'PR': 'purple',
  'YR': 'yellow',
  'RR': 'red',
  'GR': 'green',
  'BR': 'blue'
};

const orbNames = {
    'RO': 'Red Orb',
    'YO': 'Yellow Orb',
    'GO': 'Green Orb',
    'BO': 'Blue Orb',
    'PO': 'Purple Orb'
};
const wallImage = new Image();
wallImage.src = 'assets/WallTile2.png';

const verticalTileImage = new Image();
verticalTileImage.src = 'assets/VerticalTile.png';

const horizontalTileImage = new Image();
horizontalTileImage.src = 'assets/HorizontalTile.png';

const roomTile = new Image();
roomTile.src = 'assets/RoomTile.png';

const stairTile = new Image();
stairTile.src = 'assets/StairTile.png';

const redOrbImg = new Image();
redOrbImg.src = 'assets/RedOrb.png';

const yellowOrbImg = new Image();
yellowOrbImg.src = 'assets/YellowOrb.png';

const greenOrbImg = new Image();
greenOrbImg.src = 'assets/GreenOrb.png';

const blueOrbImg = new Image();
blueOrbImg.src = 'assets/BlueOrb.png';

const purpleOrbImg = new Image();
purpleOrbImg.src = 'assets/PurpleOrb.png';

const blueRune = new Image();
blueRune.src = 'assets/BlueRune.png';

const redRune = new Image();
redRune.src = 'assets/Redrune.png';

const yellowRune = new Image();
yellowRune.src = 'assets/YellowRune.png';

const greenRune = new Image();
greenRune.src = 'assets/GreenRune.png';

const purpleRune = new Image();
purpleRune.src = 'assets/PurpleRune.png';

const activatedRune = new Image();
activatedRune.src = 'assets/ActivatedRune.png';

const characterUp = new Image();
characterUp.src = 'assets/CharacterUp.png';

const characterDown = new Image();
characterDown.src = 'assets/CharacterDown.png';

const characterLeft = new Image();
characterLeft.src = 'assets/CharacterLeft.png';

const characterRight = new Image();
characterRight.src = 'assets/CharacterRight.png';

const skeletonImage = new Image();
skeletonImage.src = 'assets/Skeleton.png';

// Load and play the audio file
const backgroundSound = new Audio('assets/tunnel.ogg');
backgroundSound.loop = true;

let audioStarted = false;  
let isMuted = false;       

const stepSound = new Audio('assets/sfx_step_grass_l.flac');
stepSound.volume = 0.5;
// Volume control elements
const volumeSlider = document.getElementById('volume-slider');
const muteButton = document.getElementById('mute-btn');

// Store skeleton positions and associated fixed notes
const skeletonNotes = {
    '16-22': "We've been walking round in circles for days... It seems as if the halls are repeating themselves",
    '25-19': "These orbs and runes seem key. Maybe if you match them all...",
    '7-10': "I swore I passed the same hallway thrice, but no—it changes when I look away. The halls are endless, but not without pattern. If you see the same place again, it's likely you've been there before."
};

// Set the initial character image to CharacterUp
let currentCharacterImage = characterUp;

// Tile size constants for better readability
const orbSize = tileSize / 4;  // Set size of the orbs
const runeSize = tileSize / 2;   // Set size of the runes


// Define warp tiles and their corresponding destination tiles
const warpPairs = {
  2: { toX: 25, toY: 26 },  // Warp point 2 warps to warp point 3
  3: { toX: 4, toY: 3 },    // Warp point 3 warps to warp point 2

  4: { toX: 26, toY: 25 },  // Warp point 4 warps to warp point 5
  5: { toX: 3, toY: 4 },    // Warp point 5 warps to warp point 4

  6: { toX: 26, toY: 22 },  // Similarly, other warp points...
  7: { toX: 3, toY: 7 },

  8: { toX: 3, toY: 13 },
  9: { toX: 26, toY: 16 },

  10: { toX: 26, toY: 10 },
  11: { toX: 3, toY: 22 },

  12: { toX: 22, toY: 3 },
  13: { toX: 4, toY: 26 },

  14: { toX: 10, toY: 26 },
  15: { toX: 16, toY: 3 },

  16: { toX: 10, toY: 3 },
  17: { toX: 16, toY: 26 },

  19: { toX: 3, toY: 13 },
  20: { toX: 16, toY: 26 },
  21: { toX: 3, toY: 22 }
};

// Find the coordinates of the start point 'S' in the maze
function findStartPoint() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      if (maze[row][col] === 'S') {
        return { x: col, y: row };
      }
    }
  }
  return { x: 1, y: 1 };  // Fallback if 'S' not found
}


// Initialize the player's starting position based on the start point 'S'
let player = findStartPoint();
const inventory = [];  // Player's collected orbs

//Draw main display

function drawCurrentCell() {
    const topLeftRow = Math.max(0, player.y - 1);
    const topLeftCol = Math.max(0, player.x - 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through the 3x3 block to draw walls, paths, and other elements
    for (let row = topLeftRow; row <= player.y + 1; row++) {
        for (let col = topLeftCol; col <= player.x + 1; col++) {
            if (maze[row] && maze[row][col] !== undefined) {
                const cell = maze[row][col];

                // Draw walls using the image
                if (cell === 1) {
                    ctx.drawImage(wallImage, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);
                } else if (cell === 'V') {
                    ctx.drawImage(verticalTileImage, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);  // Draw vertical tile
                } else if (cell === 'H') {
                    ctx.drawImage(horizontalTileImage, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);  // Draw horizontal tile
                } else if (typeof cell === 'number' && [2, 17, 14, 13, 12, 15, 16, 20, 3].includes(cell)) {
                    // Use vertical tile image for specific numbered warp tiles
                    ctx.drawImage(verticalTileImage, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);
                } else if (typeof cell === 'number' && [4, 6, 8, 10, 11, 8, 7, 5, 19, 9].includes(cell)) {
                    // Use horizontal tile image for specific numbered warp tiles
                    ctx.drawImage(horizontalTileImage, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);
                } else if (cell === 'S') {
                    // Use StairTile
                    ctx.drawImage(stairTile, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);
                } else {
                    // Ensure background is always drawn as room tile for all valid elements
                    ctx.drawImage(roomTile, (col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);

                    // Handle drawing skeletons on top of the room tile but below the player
                    if (cell === 'SK') {
                        ctx.drawImage(skeletonImage, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
                    }
                }

                // Draw border around every tile
                ctx.strokeRect((col - topLeftCol) * tileSize, (row - topLeftRow) * tileSize, tileSize, tileSize);
            }
        }
    }
// Loop to draw runes **below** the player
for (let row = topLeftRow; row <= player.y + 1; row++) {
    for (let col = topLeftCol; col <= player.x + 1; col++) {
        if (maze[row] && maze[row][col] !== undefined) {
            const cell = maze[row][col];

            // Draw runes before the player
            if (cell === 'RR') {
                ctx.drawImage(redRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
            } else if (cell === 'YR') {
                ctx.drawImage(yellowRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
            } else if (cell === 'GR') {
                ctx.drawImage(greenRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
            } else if (cell === 'BR') {
                ctx.drawImage(blueRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
            } else if (cell === 'PR') {
                ctx.drawImage(purpleRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
            } else if (cell === 'RR-activated') {
    ctx.drawImage(activatedRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
} else if (cell === 'GR-activated') {
    ctx.drawImage(activatedRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
} else if (cell === 'YR-activated') {
    ctx.drawImage(activatedRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
} else if (cell === 'PR-activated') {
    ctx.drawImage(activatedRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize);
} else if (cell === 'BR-activated') {
    ctx.drawImage(activatedRune, (col - topLeftCol) * tileSize + (tileSize - runeSize) / 2, (row - topLeftRow) * tileSize + (tileSize - runeSize) / 2, runeSize, runeSize); }
        }
    }
}

// Draw the player character on top of runes
ctx.drawImage(currentCharacterImage, (player.x - topLeftCol) * tileSize, (player.y - topLeftRow) * tileSize, tileSize, tileSize);

// Loop again to draw orbs **above** the player
for (let row = topLeftRow; row <= player.y + 1; row++) {
    for (let col = topLeftCol; col <= player.x + 1; col++) {
        if (maze[row] && maze[row][col] !== undefined) {
            const cell = maze[row][col];

            // Draw orbs after the player
            if (cell === 'RO') {
                ctx.drawImage(redOrbImg, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
            } else if (cell === 'YO') {
                ctx.drawImage(yellowOrbImg, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
            } else if (cell === 'GO') {
                ctx.drawImage(greenOrbImg, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
            } else if (cell === 'BO') {
                ctx.drawImage(blueOrbImg, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
            } else if (cell === 'PO') {
                ctx.drawImage(purpleOrbImg, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
            } else if (cell === 'SK') {
                ctx.drawImage(skeletonImage, (col - topLeftCol) * tileSize + (tileSize - orbSize) / 2, (row - topLeftRow) * tileSize + (tileSize - orbSize) / 2, orbSize, orbSize);
        }
    }
}
}


// Update the mini-map
    drawMiniMap();
}

//Draw MiniMap
function drawMiniMap() {
    miniMapCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

    // Loop through the entire maze to draw it on the mini-map
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[0].length; col++) {
            const cell = maze[row][col];

            // Draw walls in black
            if (cell === 1) {
                miniMapCtx.fillStyle = 'black';
                miniMapCtx.fillRect(col * miniTileSize, row * miniTileSize, miniTileSize, miniTileSize);

            // Draw pathways, start tile, vertical/horizontal corridors, and warp tiles in white
            } else if (
                cell === 0 || 
                cell === 'S' || 
                cell === 'V' || 
                cell === 'H' || 
                (typeof cell === 'number' && cell > 1)
            ) {
                miniMapCtx.fillStyle = 'white';
                miniMapCtx.fillRect(col * miniTileSize, row * miniTileSize, miniTileSize, miniTileSize);

            // Draw orbs as circles and runes as diamonds
            } else if (colors[cell]) {
                miniMapCtx.fillStyle = 'white';  // Ensure background is white before drawing orb/rune
                miniMapCtx.fillRect(col * miniTileSize, row * miniTileSize, miniTileSize, miniTileSize);

                if (cell.endsWith('O')) {
                    drawCircle(miniMapCtx, col * miniTileSize + miniTileSize / 2, row * miniTileSize + miniTileSize / 2, miniTileSize / 3, colors[cell]);
                } else if (cell.endsWith('R')) {
                    drawDiamond(miniMapCtx, col * miniTileSize + miniTileSize / 2, row * miniTileSize + miniTileSize / 2, miniTileSize / 2, colors[cell]);
                }
            }

            // Draw greyed-out runes (activated)
            if (cell === 'activatedRune') {
                miniMapCtx.fillStyle = 'white';  // Ensure background is white before drawing grey rune
                miniMapCtx.fillRect(col * miniTileSize, row * miniTileSize, miniTileSize, miniTileSize);
                drawDiamond(miniMapCtx, col * miniTileSize + miniTileSize / 2, row * miniTileSize + miniTileSize / 2, miniTileSize / 2, 'grey');
            }

            // Draw mini-map cell border
            miniMapCtx.strokeRect(col * miniTileSize, row * miniTileSize, miniTileSize, miniTileSize);
        }
    }

    // Draw the player's position on the mini-map
    miniMapCtx.fillStyle = 'yellow';
    miniMapCtx.fillRect(player.x * miniTileSize, player.y * miniTileSize, miniTileSize, miniTileSize);
}

// Function to draw a circle (orb) on the mini-map
function drawCircle(context, x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

// Function to draw a diamond (rune) on the mini-map
function drawDiamond(context, x, y, size, color) {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x, y - size); // Top
  context.lineTo(x + size, y); // Right
  context.lineTo(x, y + size); // Bottom
  context.lineTo(x - size, y); // Left
  context.closePath();
  context.fill();

}// Handle warp logic
function handleWarp() {
  const currentCell = maze[player.y][player.x];
  if (warpPairs[currentCell]) {
    player.x = warpPairs[currentCell].toX;
    player.y = warpPairs[currentCell].toY;
  }
}

// Function to update the player coordinates and cell definition
function updateCoordinates() {
    const coordinatesDisplay = document.getElementById('coordinatesDisplay');
    const cellDefinitionDisplay = document.getElementById('cellDefinitionDisplay');

    // Display the player's coordinates (x, y)
    coordinatesDisplay.innerHTML = `Player Position: X = ${player.x}, Y = ${player.y}`;

    // Get the current cell definition based on the player's position
    const currentCell = maze[player.y][player.x];

    // Display the current cell definition
    cellDefinitionDisplay.innerHTML = `Current Cell: ${currentCell}`;
}


// Initialize the display when the game starts
updateCoordinates();


// Initial call to set the player's starting coordinates when the game loads
updateCoordinates();

// Function to handle warp mechanics (you can review this based on your specific warp logic)
function handleWarp() {
  const currentCell = maze[player.y][player.x];
  if (warpPairs[currentCell]) {
    player.x = warpPairs[currentCell].toX;
    player.y = warpPairs[currentCell].toY;
  }
}

// Interact button to collect orbs and activate runes
function interact() {
    const cell = maze[player.y][player.x];
    const positionKey = `${player.x}-${player.y}`;  // Create the position key based on player's current position

    // Interaction for orbs
    if (cell === 'PO' || cell === 'YO' || cell === 'RO' || cell === 'GO' || cell === 'BO') {
        inventory.push(cell);
        maze[player.y][player.x] = 0;  // Remove the orb after collection
        updateMessage(`You collected a ${orbNames[cell]}!`);
        drawCurrentCell();
        updateInventory();  // Update the inventory display
    } 
    // Interaction for runes
    else if (cell === 'YR' || cell === 'RR' || cell === 'GR' || cell === 'BR' || cell === 'PR') {
        const orbType = cell.charAt(0) + 'O';  // Find the orb type for the corresponding rune
        const orbIndex = inventory.indexOf(orbType);  // Get the index of the orb in the inventory

        if (orbIndex !== -1) {  // Check if the orb is in the inventory
            updateMessage(`You activated the ${orbNames[orbType]} rune!`);
            maze[player.y][player.x] = cell + '-activated';  // Mark the rune as activated
            activatedRunesCount++;  // Increment activated runes count
            inventory.splice(orbIndex, 1);  // Remove orb from inventory
            updateInventory();  // Update inventory display
            drawCurrentCell();

            // Check if all runes are activated
            if (activatedRunesCount === totalRunes) {
                updateMessage("After activating the final rune, you feel a light draft flow into the chamber. Looking up, the corridor ahead appears different from when you first entered the room. A glint of gold, and the flicker of torches beckon you forward. It seems you have found a way out of the Endless Halls.");
                freezeGame();  // Call freeze game when completed
            }
        } else {
            updateMessage(`There's a magical rune on the floor... It seem's as if you don't have the right item to activate it.`);
        }
    } 
    // Interaction for skeletons
    else if (cell === 'SK') {
        // Check if there's a note for the current skeleton position
        if (skeletonNotes.hasOwnProperty(positionKey)) {
            const note = skeletonNotes[positionKey];
            updateMessage(`You found a skeleton... It seems to be holding a journal:"${note}"`);
        } else {
            updateMessage("This skeleton has no note.");
        }
    }
}

// Event listeners for button clicks
document.getElementById('up-btn').addEventListener('click', () => movePlayer('up'));
document.getElementById('down-btn').addEventListener('click', () => movePlayer('down'));
document.getElementById('left-btn').addEventListener('click', () => movePlayer('left'));
document.getElementById('right-btn').addEventListener('click', () => movePlayer('right'));
document.getElementById('interact-btn').addEventListener('click', interact);

let keyDown = false; // Flag to track whether a key is currently pressed

// Event listener for keyboard controls (Arrow keys and WASD)
function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            event.preventDefault();
            movePlayer('up');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            event.preventDefault();
            movePlayer('down');
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            event.preventDefault();
            movePlayer('left');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            event.preventDefault();
            movePlayer('right');
            break;
        case 'Enter':
            event.preventDefault(); // Prevent default behavior
            interact(); // Call the interact function
            break;
    }
}

// Attach the keydown event listener
document.addEventListener('keydown', handleKeydown);// Call this function whenever the player moves
function movePlayer(direction) {
    startBackgroundMusic();  // Start the music on first key press
   let newX = player.x;
   let newY = player.y;

   // Update character image based on movement direction
   if (direction === 'up') {
      newY--;
      currentCharacterImage = characterUp;
   }
   if (direction === 'down') {
      newY++;
      currentCharacterImage = characterDown;
   }
   if (direction === 'left') {
      newX--;
      currentCharacterImage = characterLeft;
   }
   if (direction === 'right') {
      newX++;
      currentCharacterImage = characterRight;
   }

   // Check if the move is valid
   if (
      newX >= 0 && newX < maze[0].length &&
      newY >= 0 && newY < maze.length &&
      (
         maze[newY][newX] === 0 || maze[newY][newX] === 'S' || maze[newY][newX] === 'V' ||
         maze[newY][newX] === 'H' || maze[newY][newX] === 'SK' ||
         ['PO', 'YO', 'RO', 'GO', 'BO'].includes(maze[newY][newX]) ||  // Orbs
         ['YR', 'RR', 'GR', 'BR', 'PR'].includes(maze[newY][newX]) ||  // Runes
         (typeof maze[newY][newX] === 'number' && maze[newY][newX] > 1) ||  // Warp tiles greater than 1
         maze[newY][newX].endsWith('-activated')
      )
   ) {
      player.x = newX;
      player.y = newY;
      playStepSound();  // Play the step sound when the player moves
      handleWarp();  // Check for warp after moving
      drawCurrentCell();  // Redraw the updated cell
      updateCoordinates();  // Update the player coordinates display
   }
}

// Function to change character sprite direction
function changeCharacterDirection(direction) {
    if (direction === 'up') {
        characterImage = characterUp; // Set the character image to 'up'
    } else if (direction === 'down') {
        characterImage = characterDown; // Set the character image to 'down'
    } else if (direction === 'left') {
        characterImage = characterLeft; // Set the character image to 'left'
    } else if (direction === 'right') {
        characterImage = characterRight; // Set the character image to 'right'
    }
    drawCurrentCell(); // Redraw the current cell with the updated character image
}


let activatedRunesCount = 0;  // Track the number of activated runes
const totalRunes = 5;  // Assuming there are 5 runes in the game

// Function to update the inventory display
function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear the current inventory

    // Display each collected orb in the inventory
    inventory.forEach(orb => {
        const listItem = document.createElement('li');
        listItem.textContent = orbNames[orb] || orb;  // Use full name or fallback to shorthand
        inventoryList.appendChild(listItem);
    });
}

// Function to update interaction message on the screen
function updateMessage(message) {
    const messageElement = document.getElementById('interaction-message');
    messageElement.textContent = message;  // Display the message in the div
}


// Function to freeze the game and darken the canvas
function freezeGame() {
    // Remove the event listeners for movement and interaction
    document.getElementById('up-btn').removeEventListener('click', () => movePlayer('up'));
    document.getElementById('down-btn').removeEventListener('click', () => movePlayer('down'));
    document.getElementById('left-btn').removeEventListener('click', () => movePlayer('left'));
    document.getElementById('right-btn').removeEventListener('click', () => movePlayer('right'));
    document.getElementById('interact-btn').removeEventListener('click', interact);

    // Remove keyboard controls event listener
    document.removeEventListener('keydown', handleKeydown);

    // Darken the game canvas
    darkenCanvas();
}

// Function to darken the canvas
function darkenCanvas() {
    ctx.globalAlpha = 0.5;  // Set transparency to 50%
    ctx.fillStyle = 'black';  // Set fill color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Draw over the entire canvas
    ctx.globalAlpha = 1.0;  // Reset transparency to default
}

// Function to start background music
function startBackgroundMusic() {
    if (!audioStarted) {
        backgroundSound.play().catch(error => {
            console.log('Background music could not play automatically:', error);
        });
        audioStarted = true;
    }
}

// Function to play step sound
function playStepSound() {
    stepSound.currentTime = 0;  // Reset sound to the beginning
    stepSound.play().catch(error => {
        console.log('Step sound could not play:', error);
    });
}

// Update the volume based on the slider value
volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value;
    backgroundSound.volume = volume;  // Set background volume to the slider value
    stepSound.volume = volume;        // Set step sound volume to the slider value

    if (volume > 0) {
        isMuted = false;
        muteButton.textContent = 'Mute';
    }
});

// Mute or unmute the sounds
muteButton.addEventListener('click', function() {
    if (isMuted) {
        backgroundSound.volume = volumeSlider.value;  // Restore volume
        stepSound.volume = volumeSlider.value;        // Restore volume for steps
        muteButton.textContent = 'Mute';
    } else {
        backgroundSound.volume = 0;  // Mute the background sound
        stepSound.volume = 0;        // Mute the step sound
        muteButton.textContent = 'Unmute';
    }
    isMuted = !isMuted;  // Toggle mute state
});
});
