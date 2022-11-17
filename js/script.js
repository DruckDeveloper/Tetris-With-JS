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
This nested array contains the different tetris shapes, where a number greater than zero represents a squeare of the shape, it will allow us to assign a color to the shape, and the 0 represents a empty space 
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


//    GAME MODEL 

class GameModel{
    constructor(ctx){
        // Context to build the game on the screen with the canvas
        this.ctx = ctx;
        // Just one piece falling at time so this call that piece
        this.fallingPiece = null ;
        // The grid with zeros user as the structure of the code
        this.grid = this.makeStartingGrid()
    }

    makeStartingGrid(){
        // The grid starts with an empty array
        let grid = []
        // Then the array create other arrays with the number of rows
        for(var i = 0 ; i < ROWS ; i++){
            grid.push([]);
            // and in each of this arrays we create zero values as the number of columns
            for(var j=0 ; j < COLS ; i++){
                grid[grid.length-1].push(0);
            }
        }
        return grid;
    }

    /*This method compares the positions of the pieces located on the board and compares them with the coordinates of the newly generated piece.*/
    collision(x, y, candidate=null) {
        const shape = candidate || this.fallingPiece.shape 
        console.log(shape);
        const n = shape.length 
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (shape[i][j] > 0) {
                    let p = x + j 
                    let q = y + i  
                    if (p >= 0 && p < COLS && q < ROWS) {
                        // in bounds
                        if (this.grid[q][p] > 0) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
        return false
    }
    /*
    este metodo modifica el grid para dibujar la pieza una vez que esta cae y se coloca en el tablero 
    */
    renderGameState() {
        for (let i = 0; i < this.grid.length; i++) {
            //draw the piece when it already fell on the board
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j] 
                this.ctx.fillStyle = COLORS[cell] 
                this.ctx.fillRect(j, i, 1, 1)
            }
        }
        /*
            this condicion render the piece while is falling
        */
        if (this.fallingPiece !== null) {
            this.fallingPiece.renderPiece()
        }
    }

}

/*
this class piece made the pieces of the tetris
*/
class Piece {
    constructor(shape, ctx) {
        this.shape = shape 
        this.ctx = ctx 
        this.y = 0 
        this.x = Math.floor(COLS / 2)
    }
    //this method build a piece on the board 
    renderPiece() {
        this.shape.map((row, i) => {
            row.map((cell, j) => {
                //if a frame of the shape is greather than zero it will be fill with the color array while is falling
                if (cell > 0) {
                    this.ctx.fillStyle = COLORS[cell] 
                    //draw the piece and place it 
                    this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
                }
            })
        })
    }
}
