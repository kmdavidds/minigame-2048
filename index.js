let board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

const spawnDelay = 500;
const buttonAnimationDelay = 200;

spawnRandom();
renderBoard();

$(document).on("keydown", (event) => {
    if (event.key.length >= 7) {
        calculateBoard(event.key);
        renderBoard();
        setTimeout(() => {
            spawnRandom();
            renderBoard();
        }, spawnDelay);
    }
});

$("#up").on("click", () => {
    calculateBoard("ArrowUp");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, spawnDelay);
});
$("#right").on("click", () => {
    calculateBoard("ArrowRight");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, spawnDelay);
});
$("#down").on("click", () => {
    calculateBoard("ArrowDown");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, spawnDelay);
});
$("#left").on("click", () => {
    calculateBoard("ArrowLeft");
    renderBoard();
    setTimeout(() => {
        spawnRandom();
        renderBoard();
    }, spawnDelay);
});

function calculateBoard(key) {
    switch (key) {
        case "ArrowUp":
            $("#up").addClass("pressed");
            setTimeout(() => {
                $("#up").removeClass("pressed");
            }, buttonAnimationDelay);
            for (let i = 0; i < 4; i++) {
                pushUp();
                addUp();
            }
            break;
        case "ArrowRight":
            $("#right").addClass("pressed");
            setTimeout(() => {
                $("#right").removeClass("pressed");
            }, buttonAnimationDelay);
            for (let i = 0; i < 4; i++) {
                pushRight();
                addRight()
            }
            break;
        case "ArrowDown":
            $("#down").addClass("pressed");
            setTimeout(() => {
                $("#down").removeClass("pressed");
            }, buttonAnimationDelay);
            for (let i = 0; i < 4; i++) {
                pushDown();
                addDown();
            }
            break;
        case "ArrowLeft":
            $("#left").addClass("pressed");
            setTimeout(() => {
                $("#left").removeClass("pressed");
            }, buttonAnimationDelay);
            for (let i = 0; i < 4; i++) {
                pushLeft();
                addLeft();
            }
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

        if (x >= 128) {
            $("#"+i).addClass("medium-number");
        } else {
            $("#"+i).removeClass("medium-number");
        }

        if (x >= 1024) {
            $("#"+i).addClass("large-number");
        } else {
            $("#"+i).removeClass("large-number");
        }

        if (x == 2048) {
            alert("You have won. Congratulations!")
            for (let i = 0, x; i <= 15; i++) {
                board[Math.floor(i/4)][i%4] = 0;
                $("#"+i).text("");
            }
        }
    }
}

function spawnRandom() {
    let targetX = Math.floor(Math.random()*4);
    let targetY = Math.floor(Math.random()*4);
    let count = 0;
    while (board[targetX][targetY] !== 0 && count <= 69) {
        targetX = Math.floor(Math.random()*4);
        targetY = Math.floor(Math.random()*4);
        count++;
    }
    if (count <= 69) {
        board[targetX][targetY] = 2;
        let index = targetX * 4 + targetY;
        $("#"+index).addClass("spawning");
        setTimeout(() => {
            $("#"+index).removeClass("spawning");
        }, 6900);
    } else {
        alert("You have lost. Try again!")
        for (let i = 0, x; i <= 15; i++) {
            board[Math.floor(i/4)][i%4] = 0;
            $("#"+i).text("");
        }
    }
}