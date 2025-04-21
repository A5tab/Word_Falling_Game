let timer = 5;
let score = 0;
let isGameRunning = true;
function runTimer() {

    const timeInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.getElementById('timerVal').textContent = timer;
            for (let i = 0; i < 2; i++) {
                makeBubbles();
            }
        } else {
            clearInterval(timeInt);
            isGameRunning = false;
            displayGameOver()
        }
    }, 1000);
}

function displayGameOver() {
    const gameOverScore = document.querySelector('#scoreVal')
    const gameOver = document.createElement("div");
    gameOver.className = "game-over";
    gameOver.textContent = "Game Over!!! Your score is " + gameOverScore.textContent;

    // restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.className = 'restartButton';
    restartButton.addEventListener('click', () => {
        console.log('restart');

        timer = 30;
        score = 0;
        isGameRunning = true;
        document.getElementById('scoreVal').textContent = score;
        document.getElementById('timerVal').textContent = timer;
        document.querySelector('.game-over').remove();
        runTimer();
        document.querySelectorAll('.bubble').forEach(bubble => bubble.remove());
    });
    gameOver.appendChild(restartButton);
    document.querySelector('.pbtm').appendChild(gameOver);
}

function increaseScore() {
    score += 10;
    document.querySelector('#scoreVal').textContent = score;
}

function genRndLetters() {
    const myArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const arrayIndex = Math.floor(Math.random() * myArr.length);
    return myArr[arrayIndex];
}

function makeBubbles() {
    let bubble = document.createElement("div");
    bubble.textContent = genRndLetters();
    bubble.className = "bubble";
    document.querySelector('.pbtm').appendChild(bubble);

    bubble.style.position = 'absolute';
    bubble.style.bottom = '0%';
    bubble.style.left = Math.floor((Math.random() * 70) + 10) + "%";

    let bottomPosition = 0;
    const bubbleMoveInt = setInterval(function () {
        if (!isGameRunning) {
            clearInterval(bubbleMoveInt);
            return;
        }
        if (bottomPosition < 90) {
            bottomPosition += 5;
            bubble.style.bottom = `${bottomPosition}%`;
        } else {
            bubble.remove();
            clearInterval(bubbleMoveInt);
        }
    }, 150);
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach(bubble => {
        if (bubble.textContent === key) {
            increaseScore();
            bubble.remove();  // Remove the bubble when the correct key is pressed
        }
    });
});

runTimer();
