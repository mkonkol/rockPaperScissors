import { BOARD_GAME, USER_OPTIONS, START_BG, TRON_GRID, DIV_ROUND } from "./variables.js";
import { createButtonStart, createModalUserName, createScore, createOptions, createRound, createBoardGame } from "./creatingItems.js";
import { validName } from "./validation.js";
import { play, gameOverAndNew, currentRound } from "./games.js";

let userName = null;
let gameOver = false;

// init()
(() => {
    createButtonStart();
    createModalUserName();
})();

const MODAL = document.getElementById('modal');
const BTN_OPEN_MODAL = document.getElementById('open-modal');
const BTN_NEW_GAME = document.getElementById('new-game-btn');
const INPUT_NAME = document.getElementById('input-name');

const hiddenClass = (element, hide = true) => {
  if (element !== null) {
    (hide) 
    ? element.classList.add('hidden')
    : element.classList.remove('hidden');
  }
}

const startAgainGame = () => {
  gameOver = (currentRound >= 20) ? true : false;
  openModal();
}

const clearFields = () => {
  gameOverAndNew();
  gameOver = false;
}

const openModal = () => {
  if (gameOver) {
    if (currentRound >= 20) {
      clearFields();
    } else {
      if (confirm("Chcesz zakończyć aktualną grę?")) {
        clearFields();
      } else {
        return;
      }
    }
  }

  hiddenClass(MODAL, false);
  hiddenClass(BTN_OPEN_MODAL);
  hiddenClass(BOARD_GAME);
  hiddenClass(USER_OPTIONS);
  
  const TURN_OFF = document.getElementById('turn-off');
  (TURN_OFF != null) && TURN_OFF.remove();
}

BTN_OPEN_MODAL.addEventListener('click', openModal);

const newGame = () => {
  gameOver = true;
  const INPUT_NAME_VALUE = INPUT_NAME.value;
  const VALID = validName(INPUT_NAME_VALUE, INPUT_NAME);
  
  if (!VALID) return;
  
  userName = INPUT_NAME_VALUE;
  
  hiddenClass(MODAL);
  hiddenClass(BTN_OPEN_MODAL, false);
  hiddenClass(USER_OPTIONS, false);
  hiddenClass(BOARD_GAME, false);
  hiddenClass(START_BG.querySelector('.container:first-child'));

  TRON_GRID.style.animationPlayState = 'paused';

  START_BG.classList.add('background-game');
  DIV_ROUND.classList.add('light');
  BTN_OPEN_MODAL.classList.add('small');

  createRound();
  createScore(); 
  createBoardGame();
  createOptions();
  play();
}

BTN_NEW_GAME.addEventListener('click', newGame);
INPUT_NAME.addEventListener('keyup', e => {
  if (e.which === 13) {
    e.preventDefault();
    BTN_NEW_GAME.onclick = newGame();
  }
});

let spacebar = false;
window.onkeypress = event => {
  if (event.which === 32) {
    if (spacebar) {
      TRON_GRID.style.animationPlayState = 'running';
      spacebar = false;
    } else {
      TRON_GRID.style.animationPlayState = 'paused';
      spacebar = true;
    }
  }
}

window.onclick = function(event) {
    if (event.target == MODAL && !gameOver) {
      hiddenClass(MODAL);
      hiddenClass(BTN_OPEN_MODAL, false);
      hiddenClass(USER_OPTIONS, false);
      hiddenClass(START_BG.querySelector('.container:first-child'), false);

      BTN_OPEN_MODAL.classList.remove('small');
    }
}

export { userName, openModal, startAgainGame };