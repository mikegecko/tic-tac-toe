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
            element.addEventListener('click', (e) => {
                fill(e);
                Gameboard.play(e.target.id, true);
                Gameboard.log();
            });
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
    let data = ['0', '0', '0',
                '0', '0', '0',
                '0', '0', '0'];

    let round = 0;

    const play = (tileID,human) => {
        if(human){
            data[tileID] = human.getMarker;
            round++;
        }
        else{
            data[tileID] = human.getAiMarker;
            round++;
        }
        
    };
    const clear = () => {
        data = ['0', '0', '0',
                '0', '0', '0',
                '0', '0', '0'];

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
//TODO: rewrite this so you have one player is a human and the other is the AI
const Player = () => {
    let marker = 'X';
    let aiMarker = 'O';
    const setMarker = (bool) => {
        if (bool.target.checked) {
            marker = 'O';
            aiMarker = 'X';
        } else {
            aiMarker = 'O';
            marker = 'X';
        }
    }
    const getMarker = () => marker;
    const getAiMarker = () => aiMarker;
    return {
        setMarker,
        getMarker,
        getAiMarker
    }
};

const human = Player();
DisplayController.addHandlers();