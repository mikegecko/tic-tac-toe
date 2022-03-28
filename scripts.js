// TODO: Make a sidebar that displays game history

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const DisplayController = (() => {
    const restartBtn = document.getElementById('restart');
    const tiles = document.querySelectorAll('.tile');
    const marker = document.querySelector('.marker');
    const addHandlers = () => {
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
        console.log(marker.checked);
        tiles.forEach(tile => {
            tile.innerText = null;
        });
    }
    const displayRoundEnd = (string) => {
        //string should be 'win' 'loss' 'draw'
        console.log(string);
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

    let round = 0;
    const getData = () => data;
    const setData = (tileID, marker) => {
        data[tileID] = marker;
    };
    //TODO: specify winner by checking player marker | Add display winner/loser/draw functions to displayController
    const checkWin = (usermarker) => {
        let usercheckstring = usermarker + usermarker + usermarker;
        let newdata = getData();
        let rows = [newdata[0] + newdata[1] + newdata[2], newdata[3] + newdata[4] + newdata[5], newdata[6] + newdata[7] + newdata[8]];
        let columns = [newdata[0] + newdata[3] + newdata[6], newdata[1] + newdata[4] + newdata[7], newdata[2] + newdata[5] + newdata[8]];
        let diags = [newdata[0] + newdata[4] + newdata[8], newdata[2] + newdata[4] + newdata[6]];

        if (round > 2) {
            rows.forEach(element => {
                if (element === usercheckstring) {
                    console.log(usermarker + ' is Winner!');
                    return (true);
                } else {
                    return (false);
                }
            });
            columns.forEach(element => {
                if (element === usercheckstring) {
                    console.log(usermarker + ' is Winner!');
                    return (true);
                } else {
                    return (false);
                }
            });
            diags.forEach(element => {
                if (element === usercheckstring) {
                    console.log(usermarker + ' is Winner!');
                    return (true);
                } else {
                    return (false);
                }
            });
        } else {
            return (false);
        }
    }
    const playRound = (playerEvent) => {

        if (isValid(playerEvent.target.id)) {
            round++;
            if (round < 5) {
                human.play(playerEvent.target.id, true);
                if (checkWin(human.getMarker())) {
                    //Display win
                }
                ai.play(ai.aiSelect(), false);
                if (checkWin(ai.getMarker())) {
                    //Display loss
                }

            } else {
                human.play(playerEvent.target.id, true);
                if (!checkWin(human.getMarker()) && !checkWin(ai.getMarker())) {
                    //Game has ended in a draw...
                } else {
                    //someone won on last move
                }
            }
        }

        //check for win between here - maybe add delay or transition styling - update display
        //if-checkWin()-true-displayController.displayWinner()?
        //add checks for draw, loss is just a computer win
        //check for ai win - update display
        DisplayController.update();
        log();
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
        playRound
    }
})();
//TODO: 
//Maybe the AI should be its own object that inherits player factory?
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
    const aiSelect = () => {
        let data = Gameboard.getData();
        let id = getRandomInt(0, 8);
        while (!Gameboard.isValid(id)) {
            id = getRandomInt(0, 8);
        }
        return (id);
    }
    const aiSelectSmart = () => {
        //Analyze board state and maximize/minimize for best move
        //Check if location is a valid move
        let data = Gameboard.getData();
        let id = 0;
        return (id);
    }
    return {
        setMarker,
        getMarker,
        play,
        aiSelect

    }
};

const human = Player('X');
const ai = Player('O');
DisplayController.addHandlers();