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
                //TODO: Move the following code into a gameloop object
                //Rewrite so it changes data - then read from data and update display

                human.play(e.target.id, true);
                ai.play(ai.aiSelect(), false);
                Gameboard.log();
                update();

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
        clear
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
        getData
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
    const isValid = (id) => {
        let data = Gameboard.getData();
        if (id >= 0 && id <= 8) {
            if (data[id] != null) {
                return (false);
            } else {
                return (true);
            }
        }
        else{
            return(false);
        }
    }
    const play = (id, isHuman) => {
        //TODO: check if the location is a valid move
        if (isValid(id)) {
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
    //Analyze board state and maximize/minimize for best move
    //Check if location is a valid move
    const aiSelect = () => {
        let data = Gameboard.getData();
        let id = getRandomInt(0, 8);
        while(!isValid(id)){
            id = getRandomInt(0, 8);
        }
        return(id);
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