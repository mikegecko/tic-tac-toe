// TODO: Make a sidebar that displays game history

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const DisplayController = (() => {
    const restartBtn = document.getElementById('restart');
    const tiles = document.querySelectorAll('.tile');
    const marker = document.querySelector('.marker');
    const container = document.querySelector('.container');
    const overlay = document.querySelector('.overlay');
    const difficulty = document.querySelector('#difficulty');
    const addHandlers = () => {
        overlay.addEventListener('click', () => {
            Gameboard.clear();
            DisplayController.clear();
        });
        difficulty.addEventListener('change', (e) => {
            Gameboard.setDifficulty(e);
            Gameboard.clear();
            DisplayController.clear();
        });
        tiles.forEach(element => {
            element.addEventListener('click', (e) => {
                Gameboard.playRound(e);
            });
        });
        restartBtn.addEventListener('click', () => {
            Gameboard.clear();
            DisplayController.clear();
        });
        marker.addEventListener('click', (e) => {
            human.setMarker(e.target.checked);
            ai.setMarker(!e.target.checked);
            Gameboard.clear();
            DisplayController.clear();
        });
    }
    const update = () => {
        gameData = Gameboard.getData();
        for (let index = 0; index < tiles.length; index++) {
            tiles[index].innerText = gameData[index];
        }
    }
    const clear = () => {
        overlay.classList.add("hide");
        container.style.filter = "blur(0px)"
        tiles.forEach(tile => {
            tile.innerText = null;
        });
    }
    const displayRoundEnd = (string) => {
        switch (string) {
            case 'win':
                overlay.classList.remove("hide");
                overlay.innerHTML = 'You Won! <p>Click anywhere to restart...</p>'
                container.style.filter = "blur(4px)"
                break;
            case 'loss':
                overlay.classList.remove("hide");
                overlay.innerHTML = 'You Lose! <p>Click anywhere to restart...</p>'
                container.style.filter = "blur(4px)"
                break;
            case 'draw':
                overlay.classList.remove("hide");
                overlay.innerHTML = 'Draw! <p>Click anywhere to restart...</p>'
                container.style.filter = "blur(4px)"
                break;
            default:
                console.log('An error occurred...');
                break;
        }


    }
    return {
        addHandlers,
        clear,
        update,
        displayRoundEnd
    }

})();

const Gameboard = (() => {

    let data = [null, null, null,
        null, null, null,
        null, null, null
    ];
    let difficulty = 'easy';
    let round = 0;
    const getData = () => data;
    const setData = (tileID, marker) => {
        data[tileID] = marker;
    };
    const setDifficulty = (event) => {
        difficulty = event.target.value;
    }
    const getDifficulty = () => difficulty;

    const checkWin = (usermarker) => {
        let usercheckstring = usermarker + usermarker + usermarker;
        let newdata = getData();
        let rows = [newdata[0] + newdata[1] + newdata[2], newdata[3] + newdata[4] + newdata[5], newdata[6] + newdata[7] + newdata[8]];
        let columns = [newdata[0] + newdata[3] + newdata[6], newdata[1] + newdata[4] + newdata[7], newdata[2] + newdata[5] + newdata[8]];
        let diags = [newdata[0] + newdata[4] + newdata[8], newdata[2] + newdata[4] + newdata[6]];
        let result = false;

        if (round > 2) {
            rows.forEach(element => {
                if (element === usercheckstring) {
                    console.log(usermarker + ' is Winner!');
                    result = true;
                    return (true);
                }
            });
            columns.forEach(element => {
                if (element === usercheckstring) {
                    console.log(usermarker + ' is Winner!');
                    result = true;
                    return (true);
                }
            });
            diags.forEach(element => {
                if (element === usercheckstring) {
                    console.log(usermarker + ' is Winner!');
                    result = true;
                    return (true);
                }
            });
        } else {
            return (false);
        }
        return (result);
    }
    //Main Game loop
    const playRound = (playerEvent) => {
        let stopround = false;
        let temp;
        if (isValid(playerEvent.target.id)) {
            round++;
            console.log(round);
            if (round < 5) {
                human.play(playerEvent.target.id, true);
                if (checkWin(human.getMarker())) {
                    DisplayController.displayRoundEnd('win');
                    stopround = true;
                }
                if (!stopround) {
                    console.log(difficulty);
                    if (difficulty == 'impossible') {
                        ai.play(ai.aiSelectSmart(), false);
                    } else {
                        ai.play(ai.aiSelect(), false);
                    }
                }
                if (checkWin(ai.getMarker())) {
                    DisplayController.displayRoundEnd('loss');
                }

            } else {
                human.play(playerEvent.target.id, true);
                if (!checkWin(human.getMarker()) && !checkWin(ai.getMarker())) {
                    DisplayController.displayRoundEnd('draw');
                } else {
                    DisplayController.displayRoundEnd('win');
                }
            }
        }
        DisplayController.update();
        //log();
    }
    const isValid = (id) => {
        if (id >= 0 && id <= 8) {
            if (data[id] != null) {
                return (false);
            } else {
                return (true);
            }
        } else {
            return (false);
        }
    }
    const clear = () => {
        data = [null, null, null,
            null, null, null,
            null, null, null
        ];

        round = 0;
        console.log('clear');
    }
    const log = () => {
        console.table(data);
        console.log({
            round
        });
    }

    return {
        setData,
        clear,
        log,
        getData,
        isValid,
        playRound,
        getDifficulty,
        setDifficulty
    }
})();

const Player = (mark) => {
    let marker = mark;

    const setMarker = (bool) => {
        if (bool) {
            marker = 'O';

        } else {
            marker = 'X';
        }
    }

    const play = (id, isHuman) => {
        if (Gameboard.isValid(id)) {
            if (isHuman) {
                Gameboard.setData(id, human.getMarker());
            } else {
                Gameboard.setData(id, ai.getMarker());
            }
        } else {
            console.log('Not a valid move');
        }

    }
    const getMarker = () => marker;
    //Dumb move select
    const aiSelect = () => {
        let data = Gameboard.getData();
        let id = getRandomInt(0, 8);
        while (!Gameboard.isValid(id)) {
            id = getRandomInt(0, 8);
        }
        return (id);
    }
    //Checks for a win state and returns +10 or -10 depending on player/computer
    const evaluate = (board) => {
        let playercheck = human.getMarker() + human.getMarker() + human.getMarker();
        let computercheck = ai.getMarker() + ai.getMarker() + ai.getMarker();
        let newdata = board;
        let rows = [newdata[0] + newdata[1] + newdata[2], newdata[3] + newdata[4] + newdata[5], newdata[6] + newdata[7] + newdata[8]];
        let columns = [newdata[0] + newdata[3] + newdata[6], newdata[1] + newdata[4] + newdata[7], newdata[2] + newdata[5] + newdata[8]];
        let diags = [newdata[0] + newdata[4] + newdata[8], newdata[2] + newdata[4] + newdata[6]];
        let result = 0;
        for (let r = 0; r < rows.length; r++) {
            if (rows[r] === playercheck) {
                return (-10);
            }
            if (rows[r] === computercheck) {
                return (+10);
            }
        }
        for (let c = 0; c < columns.length; c++) {
            if (columns[c] === playercheck) {
                return (-10);
            }
            if (columns[c] === computercheck) {
                return (+10);
            }
        }
        for (let d = 0; d < diags.length; d++) {
            if (diags[d] === playercheck) {
                return (-10);
            }
            if (diags[d] === computercheck) {
                return (+10);
            }
        }
        return (0);
    }
    const minimax = (board, depth, isMaximizer) => {
        //Assign weight to the current board state
        let score = evaluate(board);
        let openSpaces = 0;
        board.forEach(element => {
            if (element === null)
                openSpaces++;
        });
        //if maximizer or minimizer wins; return score
        if (score == 10)
            return score;
        if (score == -10)
            return score;
        if (openSpaces == 0) {
            return (0);
        }

        //Maximizer
        if (isMaximizer) {
            let best = -1000;

            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    //Make a move
                    board[i] = ai.getMarker();
                    //Call minimax recursively to choose max value
                    best = Math.max(best, minimax(board, depth + 1, !isMaximizer));
                    //Undo move
                    board[i] = null;
                }

            }
            return best;
        }
        //Minimizer
        else {
            let best = 1000;

            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    //Make a move
                    board[i] = human.getMarker();
                    //Call minimax recursively to choose max value
                    best = Math.min(best, minimax(board, depth + 1, !isMaximizer));
                    //Undo move
                    board[i] = null;
                }

            }
            return best;
        }

    }
    const aiSelectSmart = () => {
        //Assign weights to different board states +10 for win -10 for loss & 0 / nothing for an inconclusive round
        //Play each possible open move and check its state - does this recursively
        //???
        //Profit
        let data = Gameboard.getData();
        let id = 0;

        let bestValue = -1000;
        for (let index = 0; index < data.length; index++) {
            if (data[index] === null) {
                //Make a move
                data[index] = ai.getMarker();
                //Compute value of this move
                let moveValue = minimax(data, 0, false);
                //Undo the move we just made
                data[index] = null;
                if (moveValue > bestValue) {
                    bestValue = moveValue;
                    id = index;
                }
            }

        }
        return (id);
    }
    return {
        setMarker,
        getMarker,
        play,
        aiSelect,
        aiSelectSmart

    }
};

const human = Player('X');
const ai = Player('O');
DisplayController.addHandlers();