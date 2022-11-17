//  IMPORTANT CONST THAT WILL BE USED ALONG THE CODE

// The const infite while loope to make the game run
const GAME_CLOCK = 1000 ;
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
    ],
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
        this.grid = this.makeStartingGrid();
    }

    makeStartingGrid() {
        // The grid starts with an empty array
        let grid = []
        // Then the array create other arrays with the number of rows
        for (var i = 0; i < ROWS; i++) {
            grid.push([]);
            // and in each of this arrays we create zero values as the number of columns
            for (var j = 0; j < COLS; j++) {
                grid[grid.length - 1].push(0);
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
    this method modifies the grid to draw the piece once it falls and is placed on the board
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

    //this method renders the piece as it falls
    moveDown() {
        if (this.fallingPiece === null) {
            this.renderGameState() 
            return
        } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
            const shape = this.fallingPiece.shape 
            const x = this.fallingPiece.x 
            const y = this.fallingPiece.y 
            shape.map((row, i) => {
                row.map((cell, j) => {
                    let p = x + j 
                    let q = y + i 
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        this.grid[q][p] = shape[i][j]
                    }
                })
            })

            // check game over if the follaing piece is in the position y: 0 and in the line 1 on the board
            if (this.fallingPiece.y === 0) {
                alert("Game over!") 
                this.grid = this.makeStartingGrid()
            }
            this.fallingPiece = null
        } else {
            this.fallingPiece.y += 1
        }
        this.renderGameState()
    }
    // This method allow the piece move to left or right
    move(right) {
        if (this.fallingPiece === null) {
            return
        }

        let x = this.fallingPiece.x 
        let y = this.fallingPiece.y 
        // If the key value is right 
        if (right) {
            // move right adding a x + value
            if (!this.collision(x + 1, y)) {
                this.fallingPiece.x += 1
            }
        } else {
            // move left substracting a x - value
            if (!this.collision(x - 1, y)) {
                this.fallingPiece.x -= 1
            }
        }
        this.renderGameState()
    }

    //This method change the direction of the shape when a shape is falling and the user needs to ratate it 
    rotate() {
        if (this.fallingPiece !== null) {
            let shape = [...this.fallingPiece.shape.map((row) => [...row])]
            // this loop changes the coordinates of the pieces in the matrix when it is rotating
            for (let y = 0; y < shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [shape[x][y], shape[y][x]] = 
                    [shape[y][x], shape[x][y]]
                }
            }
            // reverse order of rows while it doesn't collide with anything
            shape.forEach((row => row.reverse()))
            if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape)) {
                this.fallingPiece.shape = shape
            }
        }
        this.renderGameState()
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


// FUNTIONAL TETRIS JS
// Call to the HTML items
let canvas = document.getElementById("game-canvas") 
let scoreboard = document.getElementById("scoreboard") 
// Canva's context
let ctx = canvas.getContext("2d") 
// Scale of the context (30,30)
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH) 
// A new instance created by the class GameModel
let model = new GameModel(ctx)
// Score meditor
let score = 0 

// Repeated call to the function newGameState during one second each time, allowing the constant canva's context refreshing
setInterval(() => {
    newGameState()
}, GAME_CLOCK); 


// Calling the fullSend funtion who is in charge of send the new pieces when the older is positioned on the boardgame
let newGameState = () => {
    fullSend() 
    // If is not a piece falling, this function is executed
    if (model.fallingPiece === null) {
         // Random variable
        const rand = Math.round(Math.random() * 6) + 1
        // Searcher of piece variable in the array SHAPES
        const newPiece = new Piece(SHAPES[rand], ctx) 
         // Now the fallingPiece variable is the newPiece choosen by the variable on the top and its moving down
        model.fallingPiece = newPiece 
        model.moveDown()
    } else {
        model.moveDown()
    }
}

//This method check if a row was complete 
const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        //The row will ondly delated when retur true 
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            //increment the player score when a row is completed and 
            score += SCORE_WORTH 
            model.grid.splice(i, 1) 
            //leaves the row at 0 
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }
    //update the player's score on the screen 
    scoreboard.innerHTML = "Score: " + String(score)
}


//Game event listener who asigned a GameModel method to eachone
document.addEventListener("keydown", (e) => {
    e.preventDefault() 
    switch(e.key) {
        //W = ROTATE
        case "w":
            model.rotate() 
            break 
        //D = MOVE RIGHT
        case "d":
            model.move(true) 
            break 
        //S = MOVE DOWN (USING THE MOVEDOWN FUNCTION TWICE EACHTIME WHEN IS PRESS THE S KEY)
        case "s": 
            model.moveDown() 
            break 
        //A = MOVE LEFT
        case "a":
            model.move(false) 
            break
    }
})