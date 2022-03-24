// TODO: Make a sidebar that displays game history
//Gameboard object should be an IIFE
//Player objects should be a factory
//Displaycontroller object should be an IIFE
//GameLoop should be an IIFE





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

    return {
        addHandlers,
        clear,
        update
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
        round++;
    };
    const playRound = (playerEvent) => {
        //TODO: Fix issue where player selects invalid move but computer still plays round
        human.play(playerEvent.target.id, true);
        //check for win between here - maybe add delay or transition styling - update display
        ai.play(ai.aiSelect(), false);
        //check for ai win - update display
        log();
        DisplayController.update();
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
        //TODO: Fix issue where computer still plays round if player selects invalid move
        if (Gameboard.isValid(id)) {
            if (isHuman) {
                Gameboard.setData(id, human.getMarker());
                console.log(human.getMarker());
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