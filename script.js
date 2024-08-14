let timer = 30;
let score = 0;

function runTimer() {
    const timeInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.getElementById('timerVal').textContent = timer;
            makeBubbles();
        } else {
            clearInterval(timeInt);
            displayGameOver()
        }
    }, 1000);
}

function displayGameOver() {
    
    const gameOverScore = document.querySelector('#scoreVal')
    const gameOver = document.createElement("div");
    gameOver.className = "game-over";
    gameOver.textContent = "Game Over!!! Your score is " + gameOverScore.textContent;

    gameOver.style.position = 'absolute';
    gameOver.style.top = '50%';
    gameOver.style.left = '50%';
    gameOver.style.transform = 'translate(-50%, -50%)';
    gameOver.style.fontSize = '2rem';
    gameOver.style.color = 'green';
    gameOver.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    gameOver.style.padding = '20px';
    gameOver.style.borderRadius = '10px';
    gameOver.style.textAlign = 'center';

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
    let divGen = `<div class="bubble">${genRndLetters()}</div>`;
    document.querySelector('.pbtm').innerHTML += divGen;

    const bubble = document.querySelector('.pbtm .bubble:last-child');
    bubble.style.position = 'absolute';
    bubble.style.bottom = '0%';
    bubble.style.left = Math.floor(Math.random() * 70) + "%";

    let bottomPosition = 0;
    const bubbleMoveInt = setInterval(function () {
        if (bottomPosition < 90) {
            bottomPosition += 18;
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
