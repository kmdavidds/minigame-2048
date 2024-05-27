let board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

spawnRandom();
renderBoard();

$(document).on("keydown", (event) => {
    if (event.key.length >= 7) {
        calculateBoard(event.key);
        renderBoard();
        setTimeout(() => {
            spawnRandom();
            renderBoard();
        }, 100);
    }
});

$("#up").on("click", () => {
    calculateBoard("ArrowUp");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, 100);
});
$("#right").on("click", () => {
    calculateBoard("ArrowRight");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, 100);
});
$("#down").on("click", () => {
    calculateBoard("ArrowDown");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, 100);
});
$("#left").on("click", () => {
    calculateBoard("ArrowLeft");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, 100);
});

function calculateBoard(key) {
    switch (key) {
        case "ArrowUp":
            pushUp();
            addUp();
            break;
        case "ArrowRight":
            pushRight();
            addRight()
            break;
        case "ArrowDown":
            pushDown();
            addDown();
            break;
        case "ArrowLeft":
            pushLeft();
            addLeft();
            break;
    
        default:
            break;
    }
}

function addUp() {
    for (let i = 1; i <= 3; i++) { 
        for (let j = 0; j <= 3; j++) {
            if (board[i-1][j] === board[i][j]) {
                board[i-1][j] += board[i][j];
                board[i][j] = 0;
            } else if (board[i-1][j] === 0) {
                board[i-1][j] = board[i][j];
                board[i][j] = 0;
            }
        }
    }
}

function pushUp() {
    for (let i = 1; i <= 3; i++) { 
        for (let j = 0; j <= 3; j++) {
            for (let k = 0; k <= 2; k++) {
                if (board[k][j] === 0) {
                    board[k][j] = board[i][j];
                    board[i][j] = 0;
                }
            }
        }
    }
}

function addRight() {
    for (let i = 0; i <= 3; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j+1] === board[i][j]) {
                board[i][j+1] += board[i][j];
                board[i][j] = 0;
            } else if (board[i][j+1] === 0) {
                board[i][j+1] = board[i][j];
                board[i][j] = 0;
            }
        }
    }
}

function pushRight() {
    for (let i = 2; i >= 0; i--) { 
        for (let j = 0; j <= 3; j++) {
            for (let k = 3; k >= 1; k--) {
                if (board[j][k] === 0) {
                    board[j][k] = board[j][i];
                    board[j][i] = 0;
                }
            }
        }
    }
}

function addDown() {
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j <= 3; j++) {
            if (board[i+1][j] === board[i][j]) {
                board[i+1][j] += board[i][j];
                board[i][j] = 0;
            } else if (board[i+1][j] === 0) {
                board[i+1][j] = board[i][j];
                board[i][j] = 0;
            }
        }
    }
}

function pushDown() {
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j <= 3; j++) {
            for (let k = 3; k >= 1; k--) {
                if (board[k][j] === 0) {
                    board[k][j] = board[i][j];
                    board[i][j] = 0;
                }
            }
        }
    }
}

function addLeft() {
    for (let i = 0; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (board[i][j-1] === board[i][j]) {
                board[i][j-1] += board[i][j];
                board[i][j] = 0;
            } else if (board[i][j-1] === 0) {
                board[i][j-1] = board[i][j];
                board[i][j] = 0;
            }
        }
    }
}

function pushLeft() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            for (let k = 0; k <= 2; k++) {
                if (board[j][k] === 0) {
                    board[j][k] = board[j][i];
                    board[j][i] = 0;
                }
            }
        }
    }
}

function renderBoard() {
    for (let i = 0, x; i <= 15; i++) {
        x = board[Math.floor(i/4)][i%4];
        if (x == 0) x = "";
        $("#"+i).text(x);
    }
}

function spawnRandom() {
    let targetX = Math.floor(Math.random()*4);
    let targetY = Math.floor(Math.random()*4);
    while (board[targetX][targetY] !== 0) {
        targetX = Math.floor(Math.random()*4);
        targetY = Math.floor(Math.random()*4);
    }
    board[targetX][targetY] = 2;
}