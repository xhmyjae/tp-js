class gridGame
{

    constructor(grid, cells, colors, level, difficulty, timer, name, scoreboard)
    {
        this.grid = grid;
        this.cells = cells;
        this.colors = colors;
        this.level = level;
        this.difficulty = difficulty;
        this.timer = timer;
        this.name = name;
        this.scoreboard = scoreboard;
    }

    /**
     * It randomly generates a path for the player to follow
     *
     * @return The path array is being returned.
     *
     * NOT FINISHED
     */
    randomPath()
    {
        // Randomly generate a path for the player to follow
        let path = [];
        let pathLength = this.cells.length / 3;
        console.log(pathLength);
        // the cells must be neighbours to each other
        for (let i = 0; i < pathLength; i++)
        {
            let randomCell = Math.floor(Math.random() * this.cells.length);
            while (path.includes(randomCell))
            {
                randomCell = Math.floor(Math.random() * this.cells.length);
            }
            path.push(randomCell);
        }
        path.forEach(cell =>
        {
            this.cells[cell].classList.add("path");
        });
        console.log(path);
        return path;
    }

    // colorCell(cell)
    // {
    //     if (isClicking) {
    //         cell.addEventListener("mousemove", () => {
    //             cell.style.backgroundColor = "#FD6C6C";
    //             isClicking = true;
    //         });
    //     } else {
    //         cell.addEventListener("mousedown", () => {
    //             cell.style.backgroundColor = "#FD6C6C";
    //         });
    //     }
    // }

    // finishGame()
    // {
    //
    // }

    /**
     * It takes the player's name and time and adds it to the scoreboard in local storage
     */
    addToScoreboard()
    {
        // Add the player and its timer to the scoreboard in local storage
        let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
        if (scoreboard === null) {
            scoreboard = [];
        }
        scoreboard.push({
            name: this.name,
            time: this.timer.innerHTML
        });
        console.log(scoreboard);

        // sort scoreboard based on time and get the top 5 in a new variable
        let topFive = scoreboard.sort((a, b) => {
            return a.time.split(":")[1] - b.time.split(":")[1];
        }).slice(0, 4);

        console.log(topFive);

        // save the scoreboard in local storage
        localStorage.setItem("scoreboard", JSON.stringify(topFive));

        // update the scoreboard
        this.scoreboard.innerHTML = "";
        scoreboard.forEach(player => {
            this.scoreboard.innerHTML += `<span class="challenger-name">${player.name} : ${player.time}</span>`;
        });
    }

    /**
     * It takes a timer element and increases the timer by 1 second every second
     *
     * @return A timer that increases every second.
     */
    increaseTimer()
    {
        let min = 0;
        let sec = 1;
        this.timer.innerHTML = min.toString()+':0';
        let timers = setInterval(() => {
            if (sec === 60) {
                min++;
                sec = 0;
            }
            this.timer.innerHTML = min.toString()+':'+sec.toString();
            sec++;
        }, 1000);
        return timers;
    }

    /**
     * This function stops the timer
     *
     * @param timers The timer you want to stop.
     */
    stopTimer(timers)
    {
        clearInterval(timers);
    }

    /**
     * It creates a grid of cells based on the difficulty level
     */
    createGrid()
    {
        let gridSize = 0;
        if (this.difficulty === 1) {
            gridSize = 5;
        } else if (this.difficulty === 2) {
            gridSize = 6;
        } else {
            gridSize = 8;
        }

        for (let i = 0; i < gridSize; i++) {
            let row = document.createElement("tr");
            row.classList.add("row");
            this.grid.appendChild(row);
            for (let j = 0; j < gridSize; j++) {
                let cell = document.createElement("td");
                cell.classList.add("cell");
                row.appendChild(cell);
            }
        }

        this.cells = document.querySelectorAll(".cell");
    }

}


let start = document.querySelector(".start");
let startBtn = document.querySelector("#start-btn");
//let reset = document.querySelector(".reset");
let resetBtn = document.querySelector("#reset-btn");
let inputNameContainer = document.querySelector(".input-name");
let inputName = document.querySelector("#input-name");
let inputNameBtn = document.querySelector("#name-btn");
let grid = document.querySelector("#grid-table");
let timer = document.querySelector(".timer");
let inGame = document.querySelector(".in-game");
let scoreBoardChallengers = document.querySelector(".score-board-challengers");
let cells = document.querySelectorAll(".cell");

let game = new gridGame(grid, cells, 0, 1, 1, timer, 0, scoreBoardChallengers);

//let isPlaying = false;
let interval;


/* Adding an event listener to the start button. */
startBtn.addEventListener("click", () => {
    //isPlaying = true;
    inputNameContainer.classList.remove("hide");
    start.classList.add("hide");
});

/* Adding an event listener to the inputNameBtn. */
inputNameBtn.addEventListener("click", () => {
    if ((inputName.value !== "") && (inputName.value.length <= 14)) {
        game.name = inputName.value;
        inputName.value = "";

        inGame.classList.remove("hide");
        inputNameContainer.classList.add("hide");

        game.createGrid();
        game.randomPath();
        interval = game.increaseTimer();
    } else {
        alert("Please enter a valid name");
    }
});

/* Resetting the game. */
resetBtn.addEventListener("click", () => {
    //isPlaying = false;
    inGame.classList.add("hide");
    start.classList.remove("hide");

    let cells = document.querySelectorAll(".row");
    cells.forEach(cell => {
        cell.remove();
    });

    game.stopTimer(interval);

    // Adding the result on reset for test
    game.addToScoreboard();
});

/* Adding the scoreboard in local storage to the page. */
window.onload = function() {
    // add scoreboard in local storage to the page
    let scoreboard = localStorage.getItem("scoreboard");
    if (scoreboard !== null) {
        scoreboard = JSON.parse(scoreboard);
        scoreboard.forEach(player => {
            game.scoreboard.innerHTML += `<span class="challenger-name">${player.name} : ${player.time}</span>`;
        });
    }
}
