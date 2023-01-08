let game = function () {
    let bar1 = document.querySelector('#player1');
    let bar2 = document.querySelector('#player2');
    let player1Score = document.querySelector('#player1-score p');
    let player2Score = document.querySelector('#player2-score p');
    let time = 60;
    let movement = 20;
    let movementPlayers = 20;
    let width = document.documentElement.clientWidth - movement;
    let height = document.documentElement.clientHeight;
    let controlGame;
    let player1;
    let player2;

    
    function start() {
        init();
        controlGame = setInterval(play, time);
        
    }

    function init() {
        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1;
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.key = null;
        player2.keyPress = false;
        player2.key = null;
        

    }


    function play() {
        movePlayer();
        moveBall();
        checkIfLost();
        restart();
        console.log('juego comenzo!');
    };

    function restart() {
        if (checkIfLost() === 'player1 win') {
            ball.style.left = '20px';
            player1Score.textContent = Number(player1Score.textContent) + 1;
            

        } else if (checkIfLost() === 'player2 win') {
            ball.style.left = (document.documentElement.clientWidth - 20) + 'px';
            player2Score.textContent = Number(player2Score.textContent) + 1;
            
        }
        
    };




    function checkIfLost() {
        if (ball.offsetLeft >= width) {
            document.body.style.background = '#f00';
            setTimeout(() => {
                document.body.style.background = 'black';
            }, 10)

            return 'player1 win';

        }
        if (ball.offsetLeft < 0) {
            document.body.style.background = 'blue';
            setTimeout(() => {
                document.body.style.background = 'black';
            }, 10);

            return 'player2 win';

        }



    };

    function moveBall() {
        checkStateBall();
        switch (ball.state) {
            case 1: //right, bottom
                ball.style.left = (ball.offsetLeft + movement) + 'px';
                ball.style.top = (ball.offsetTop + movement) + 'px';
                break;
            case 2: // right, top
                ball.style.left = (ball.offsetLeft + movement) + 'px';
                ball.style.top = (ball.offsetTop - movement) + 'px';
                break;
            case 3: // left, bottom
                ball.style.left = (ball.offsetLeft - movement) + 'px';
                ball.style.top = (ball.offsetTop + movement) + 'px';
                break;
            case 4: // left, top
                ball.style.left = (ball.offsetLeft - movement) + 'px';
                ball.style.top = (ball.offsetTop - movement) + 'px';
                break;


        }
    };

    function checkStateBall() {
        if (collidePlayer2()) {
            ball.direction = 2;
            if (ball.state === 1) ball.state = 3;
            if (ball.state === 2) ball.state = 4;
        } else if (collidePlayer1()) {
            ball.direction = 1;
            if (ball.state === 3) ball.state = 1;
            if (ball.state === 4) ball.state = 2;
        }
        if (ball.direction === 1) {
            if (ball.offsetTop >= height) ball.state = 2;
            else if (ball.offsetTop <= 0) ball.state = 1
        } else {
            if (ball.offsetTop >= height) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }
    };

    function collidePlayer1() {


        if (ball.offsetLeft <= (bar1.clientWidth) &&
            ball.offsetTop >= bar1.offsetTop &&
            ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {
            return true;
        }
        return false;
    }

    function collidePlayer2() {
        if (ball.offsetLeft >= (width - bar2.clientWidth) &&
            ball.offsetTop >= bar2.offsetTop &&
            ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {
            return true;
        }
        return false;
    }


    function movePlayer() {

        if (player1.keyPress) {
            if (player1.key === 'w' && bar1.offsetTop >= 0) {
                bar1.style.top = (bar1.offsetTop - movementPlayers) + 'px';
            }
            if (player1.key === 's' && (bar1.offsetTop + bar1.clientHeight) <= height) {
                bar1.style.top = (bar1.offsetTop + movementPlayers) + 'px';
            }


        }
        if (player2.keyPress) {
            if (player2.key === 'ArrowUp' && bar2.offsetTop >= 0) {
                bar2.style.top = (bar2.offsetTop - movementPlayers) + 'px';
            }
            if (player2.key === 'ArrowDown' && (bar2.offsetTop + bar2.clientHeight) <= height) {
                bar2.style.top = (bar2.offsetTop + movementPlayers) + 'px';
            }
        }

    };


    document.addEventListener('keydown', e => {

        switch (e.key) {
            case 'w':
            case 's':
                player1.key = e.key;
                player1.keyPress = true;
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                player2.key = e.key;
                player2.keyPress = true;
                break;
        }
    });

    document.addEventListener('keyup', e => {
        if (e.key === 'w' || e.key === 's') {
            player1.keyPress = false;
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            player2.keyPress = false;
        }
    });


    start();


}();



