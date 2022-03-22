// TODO: Make a sidebar that displays game history
//Gameboard object should be an IIFE
//Player objects should be a factory
//Displaycontroller object should be an IIFE
//




function fill(element) {
    element.target.innerText = human.getMarker();
    console.log(element.target.id);
}

const DisplayController = (() => {
    const restartBtn = document.getElementById('restart');
    const tiles = document.querySelectorAll('.tile');
    const marker = document.querySelector('.marker');
    const addHandlers = () => {
        tiles.forEach(element => {
            element.addEventListener('click', fill);
        });
        restartBtn.addEventListener('click', () => {
            Gameboard.clear();
            DisplayController.clear();
        });
        marker.addEventListener('click', (e) => {
            human.setMarker(e);
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
    let data = [];
    let round = 0;
    //Maybe this should just be the button ID instead of row/column
    const play = (row, column, playerMarker) => {
        round++;
    };
    const clear = () => {
        data = [];
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
        play,
        clear,
        log
    }
})();

const Player = () => {
    let marker = 'X';
    const setMarker = (bool) => {
        if (bool.target.checked) {
            marker = 'O'
        } else {
            marker = 'X';
        }
    }
    const getMarker = () => marker;

    return {
        setMarker,
        getMarker
    }
};

const human = Player();
DisplayController.addHandlers();