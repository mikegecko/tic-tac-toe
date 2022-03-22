// TODO: Make a sidebar that displays game history
//Gameboard object should be an IIFE
//Player objects should be a factory
//Displaycontroller object should be an IIFE
//GameLoop should be an IIFE



//This should be moved somewhere better/rewritten
function fill(element) {
    element.target.innerText = human.getMarker();
    //console.log(element.target.id);
}

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
                fill(e);
                human.play(e.target.id, true);
                ai.play(ai.aiSelect(), false);
                Gameboard.log();
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
    const clear = () => {
        console.log(marker.checked);
        tiles.forEach(tile => {
            tile.innerHTML = null;
        });
    }

    return {
        addHandlers,
        clear
    }

})();

const Gameboard = (() => {
    let data = ['0', '0', '0',
        '0', '0', '0',
        '0', '0', '0'
    ];

    let round = 0;
    const getData = () => data;
    const setData = (tileID, marker) => {
        data[tileID] = marker;
        round++;
    };
    const clear = () => {
        data = ['0', '0', '0',
            '0', '0', '0',
            '0', '0', '0'
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
    const play = (id, isHuman) => {
        if (isHuman) {
            Gameboard.setData(id, human.getMarker());
            console.log(human.getMarker());
        } else {
            Gameboard.setData(id, ai.getMarker());
        }

    }
    const getMarker = () => marker;
    const aiSelect = () => {
        oldData = Gameboard.getData();
        //Analyze board state and maximize/minimize for best move
        return (getRandomInt(0, 8));
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