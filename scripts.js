// TODO: Make a sidebar that displays game history
//Gameboard object should be an IIFE
//Player objects should be a factory
//Displaycontroller object should be an IIFE
//GameLoop should be an IIFE



//This should be moved somewhere better
function fill(element) {
    element.target.innerText = human.getMarker();
    //console.log(element.target.id);
}

const DisplayController = (() => {
    const restartBtn = document.getElementById('restart');
    const tiles = document.querySelectorAll('.tile');
    const marker = document.querySelector('.marker');
    const addHandlers = () => {
        tiles.forEach(element => {
            element.addEventListener('click', (e) => {
                //I should probably make a game loop for the following calls...
                fill(e);
                human.play(e.target.id, true);
                //ai.play(ai.getMarker);
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
                '0', '0', '0'];

    let round = 0;
    const getData = () => data;
    const setData = (tileID,marker) => {
        data[tileID] = marker;
        round++;
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
        setData,
        clear,
        log,
        getData
    }
})();
//TODO: rewrite this so you have one player is a human and the other is the AI
//Maybe the AI should be its own object that inherits player factory?
const Player = () => {
    let marker = 'X';
    
    const setMarker = (bool) => {
        if (bool) {
            marker = 'O';
            
        } else {
            marker = 'X';
        }
    }
    const play = (id,isHuman) => {
        if(isHuman){
            Gameboard.setData(id,human.getMarker());
            
            console.log(human.getMarker());
        }
        else{
            data[tileID] = ai.getMarker();
            
        }
        
    }
    const getMarker = () => marker;
    
    return {
        setMarker,
        getMarker,
        play
        
    }
};

const human = Player();
const ai = Player();
DisplayController.addHandlers();
