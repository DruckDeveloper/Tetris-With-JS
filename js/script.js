//  IMPORTANT CONST THAT WILL BE USED ALONG THE CODE

// The const infite while loope to make the game run
const GAME_CLOCK = 1000;
// THE WIDE OF EACH BLOCK IN THE GAME
const BLOCK_SIDE_LENGTH = 30;

// NUMBERS OF ROWS AND COLUMNS THAT WILL BE USED IN THE GAME
const ROWS = 20;
const COLS = 10;
// Score given to the gamer for each complete row realized
const SCORE_WORTH = 10;

/*
This nested array contains the different tetris shapes, where 1 represents a squeare of the shape and the 0 represents a empty space 
*/
const SHAPES = [
    [], 
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ], 
    [
        [2,0,0],
        [2,2,2],
        [0,0,0],
    ], 
    [
        [0,0,3],
        [3,3,3],
        [0,0,0],
    ], 
    [
        [4,4],
        [4,4],
    ], 
    [
        [0,5,5],
        [5,5,0],
        [0,0,0],
    ], 
    [
        [0,6,0],
        [6,6,6],
        [0,0,0],
    ], 
    [
        [7,7,0],
        [0,7,7],
        [0,0,0],
    ]
]

// Array with all the colors used in the shapes being the first one an empty space (0) black color
const COLORS = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#10FF01",
    "F000FF"
]