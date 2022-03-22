// TODO: Make a sidebar that displays game history
//Gameboard object should be an IIFE
//Player objects should be a factory
//Displaycontroller object should be an IIFE
//




function fill(element) {
    element.target.innerHTML = 'X';
    console.log(element.target.id);
}

const DisplayController = (() => {
    const restartBtn = document.getElementById('restart');
    const tiles = document.querySelectorAll('.tile');
    const addHandlers = () => {
        tiles.forEach(element => {
            element.addEventListener('click', fill);
        });
        restartBtn.addEventListener('click', Gameboard.clear);
    }

    

    return{addHandlers}

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
        console.log('Round:' + round);
    }
    return {
        play,
        clear,
        log
    }
})();

const Player = () => {
    const marker = 'X' //This should be X or O
};

DisplayController.addHandlers();