const width = 28;
const grid = document.querySelector(".grid");
const scoreOnScreen = document.querySelector("#score");
let squares = [];
let score = 0;

const layout = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
// 28*28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

function createBoard() {
    for(let i=0; i<layout.length; i++){
        //creating a square
        const square = document.createElement('div');

        //put square in grid
        grid.appendChild(square);

        //put square in squares array
        squares.push(square);

        if (layout[i] === 0){
            squares[i].classList.add("pac-dot")
        } else if(layout[i] === 1){
            squares[i].classList.add("wall");
        } else if(layout[i] === 2){
            squares[i].classList.add('ghost-lair');
        } else if(layout[i] === 3){
            squares[i].classList.add("power-pellet");
        } 
    }
}
createBoard();

// starting position of pacman 
let pacmanCurrentIndex= 490;
squares[pacmanCurrentIndex].classList.add('pacman');

function control(event){
    squares[pacmanCurrentIndex].classList.remove('pacman');
    if(event.key === "ArrowDown"){
        if(!squares[pacmanCurrentIndex + width].classList.contains('wall') && 
        pacmanCurrentIndex + width < width*width &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')){
            pacmanCurrentIndex += width;
        }
    } else if(event.key === "ArrowUp"){
        if(!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')){
            pacmanCurrentIndex -= width;
        }
    } else if(event.key === "ArrowLeft"){
        if(!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')){
            pacmanCurrentIndex -= 1;
            if (pacmanCurrentIndex === 364){
                pacmanCurrentIndex = 391;
            }
        }
    } else if(event.key === "ArrowRight"){
        if(!squares[pacmanCurrentIndex + 1].classList.contains('wall') && 
        pacmanCurrentIndex % width !== width-1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')){
            pacmanCurrentIndex += 1;
            if(pacmanCurrentIndex === 391){
                pacmanCurrentIndex = 364;
            }
        }
    }
    // The keyCode method is not recommended as it is old
    // Left: 37, Right: 39, Up: 38, Down: 40
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
}
document.addEventListener("keyup",control);

function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++;
        scoreOnScreen.innerHTML = score;
    }
}

function powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        score += 10;
        scoreOnScreen.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        ghosts.forEach(ghost => {
            ghost.isScared = true;
        })
        setTimeout(function(){
            ghosts.forEach(ghost => ghost.isScared = false);
        },10000)
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost');
});

ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost){
    const directions = [-1, +1, -width, +width];
    let movingDirection = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function(){
        if(!squares[ghost.currentIndex + movingDirection].classList.contains('wall') &&
        !squares[ghost.currentIndex + movingDirection].classList.contains('ghost')){
            squares[ghost.currentIndex].classList.remove(ghost.
            className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            ghost.currentIndex += movingDirection;

            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add('ghost');
        } else{
            movingDirection = directions[Math.floor(Math.random() * directions.length)]
        }

        //when ghost is scared
        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            scoreOnScreen.innerHTML = score;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
        checkForGameOver();
    }, ghost.speed)
}

//check for gameover
function checkForGameOver(){
    if(!squares[pacmanCurrentIndex].classList.contains('scared-ghost') && 
    squares[pacmanCurrentIndex].classList.contains('ghost'))
    {
        
        ghosts.forEach(ghost => clearInterval(ghost.timerId));

        document.removeEventListener('keyup', control);

        document.getElementById("gameOver").style.display = 'block';
    }
}

function checkForWin(){
    if(score >= 300){
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
        document.getElementById("gameOver").innerHTML = "Game Over! YOU WIN :)";
        document.getElementById("gameOver").style.display = 'block';
    }
}