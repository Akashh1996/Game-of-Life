const canvas = document.querySelector('.main');
const ctx1 = canvas.getContext('2d');
let generationNumber = document.querySelector(".generationNumber")

let resolution = 30;

let input = document.querySelector("input")

input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        if (input.value >= 10 && input.value <= 35)
            resolution = input.value
    }
    render(grid)
})
canvas.width = 800;
canvas.height = 800;

let generation = 0
let grid

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildGrid(COLS, ROWS) {
    let myArray = []
    for (let i = 0; i < COLS; i++) {
        myArray[i] = []
        for (let j = 0; j < ROWS; j++) {
            myArray[i][j] = Math.floor(Math.random() * 2)
        }

    }
    return myArray
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < COLS && yCell < ROWS) {
                        const currentNeighbour = grid[col + i][row + j];
                        numNeighbours += currentNeighbour;

                    }
                }
            }

            if (cell === 1 && numNeighbours < 2) {
                nextGen[col][row] = 0;
            } else if (cell === 1 && numNeighbours > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && numNeighbours === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    generation++
    generationNumber.innerHTML = generation
    return nextGen;
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            ctx1.beginPath();
            ctx1.rect(col * resolution, row * resolution, 40, 40);
            if (cell === 1) {
                ctx1.fillStyle = "black"
            } else {
                ctx1.fillStyle = "white"
            }
            ctx1.fill();
            ctx1.stroke()
        }
    }
}

function updateLife() {

    grid = nextGen(grid);
    render(grid);
}


let text = "Welcome to Conway's Game of Life"
let myText = document.querySelector(".myText")
let myText2 = document.querySelector(".myText2")
let i = 0
let time = 100

function typeWriter() {
    if (i < text.length) {
        myText2.innerHTML += text.charAt(i)

        myText.innerHTML += text.charAt(i)
        i++;
        setTimeout(typeWriter, time);
    }
   

}
typeWriter()
grid = buildGrid(COLS, ROWS);

let start = document.querySelector(".start")
let stop = document.querySelector(".stop")
let startGame
start.addEventListener("click", function () {
    document.querySelector("ul").style.display = "none"
    myText.style.display = "none"
    myText2.style.display = "none"
    startGame = setInterval(updateLife, 200)

})
stop.addEventListener("click", function () {
    clearInterval(startGame)
})
document.querySelector(".new").addEventListener("click", function () {
    document.querySelector("ul").style.display = "none"
    clearInterval(startGame)
    grid = buildGrid(COLS, ROWS);
    generation = 0
    generationNumber.innerHTML = 0

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            ctx1.beginPath();
            ctx1.rect(col * resolution, row * resolution, 40, 40);
            ctx1.fillStyle = "white"
            ctx1.fill();
            ctx1.stroke()
        }
    }

})