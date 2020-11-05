import { ITEMS, score, round, RADIO_SELECT, VERSUS, ROUND, USER_OPTIONS, GROUP_INPUT } from "./variables.js";
import { modalWinner, modalFinished, turnOff } from "./creatingItems.js";

let currentRound = round;
let userSelection = null;
let botSelection = null;

const onOffRadioButton = (off) => {
    RADIO_SELECT.forEach(item => {
        (off) 
        ? item.setAttribute("disabled", true)
        : item.removeAttribute("disabled");
    })
}

const addRound = () => {
    if (currentRound >= 20) {
        turnOff();
        setTimeout(() => {
            (score.player === score.bot) 
            ? modalFinished('Remis!') 
            : (score.player > score.bot) 
            ? modalFinished(`Hurra! Wygrałeś!`) 
            : modalFinished(`Niestety tym razem się nie udało :(`);
        }, 1000);
        onOffRadioButton(true);
    }

    (currentRound <= 19) && (currentRound += 1);
    ROUND.innerText = `Runda: ${currentRound}`;
}

const addPoints = (person, id) => {
    score[person] += 1;
    document.getElementById(id).innerText = score[person];
}

const returnTextWin = (bot, thing) => {
    if (bot === thing) {
        addPoints("player", "user-score");
        return "Wygrałeś!";
    } else {
        addPoints("bot", "bot-score");
        return "Przegrałeś!";
    }
}

const whoWon = () => {
    let winner = null;

    imagesShow(userSelection, "image-user");
    imagesShow(botSelection, "image-bot");

    addRound();

    if (userSelection === botSelection) return "Remis";
    
    switch (userSelection) {
        case "paper":
            winner = returnTextWin(botSelection, "rock");
            break;
        case "rock":
            winner = returnTextWin(botSelection, "scissors");
            break;
        case "scissors":
            winner = returnTextWin(botSelection, "paper");
            break;
    }
    
    return winner;
}

const autoPlayer = () => {
    const I = Math.floor(Math.random() * ITEMS.length);
    return ITEMS[I];
}

const imagesShow = (thing, id) => {
    const IMAGE = document.getElementById(id);
    IMAGE.setAttribute('src', `../assets/images/${thing}.png`);
}

const gamePlay = () => {
    RADIO_SELECT.forEach(item => {
        (item.checked) && (userSelection = item.id);
    });

    botSelection = autoPlayer();

    if (userSelection !== null && botSelection !== null) {
        const VERSUS = document.getElementById('versus');
        (VERSUS.className.includes('hidden')) && VERSUS.classList.remove('hidden');

        const WINNER = whoWon();
        modalWinner(WINNER);
    } else {
        onOffRadioButton(true);
    }
}

const play = () => {
    
    for (let i = 0; i < GROUP_INPUT.length; i++) {
        let label = GROUP_INPUT[i].getElementsByTagName('label')[0];
        let img = label.getElementsByTagName('img')[0];

        img.addEventListener("mouseenter", () => {
            GROUP_INPUT[i].classList.add('active-animation');
        });

        img.addEventListener("mouseout", () => {
            GROUP_INPUT[i].classList.remove('active-animation');
        });
    }
    
    RADIO_SELECT.forEach(item => {
        item.addEventListener('click', gamePlay);
    });
}

const removeChecked = (items) => {
    items.forEach(item => {
        item.checked = false;
    });
}

const clearElements = (items) => {
    if (items.length > 0) {

        items.forEach(item => {
            if (document.getElementById(item.id) != null) {
                let value = (item.hasOwnProperty('value')) ? item.value : '';

                (item.hasOwnProperty('type'))
                ? document.getElementById(item.id).value = value
                : document.getElementById(item.id).innerText = value;
            }
        });
    }
}

const gameOverAndNew = () => {
    score.player = 0;
    score.bot = 0;
    currentRound = 1;
    userSelection = null;
    botSelection = null;

    const ELEMENTS = [
        {
            id: 'input-name',
            type: 'input'
        },
        {
            id: 'user-score',
            value: score.player
        },
        {
            id: 'bot-score',
            value: score.bot
        },
        {
            id: 'round--number',
            value: `Runda ${currentRound}`
        },
        {
            id: 'user-name'
        },
        {
            id: 'round-winner'
        }
    ];
    clearElements(ELEMENTS);

    const MODAL_COMPLETED = document.getElementById('modal-finished');
    const IMAGES = document.querySelectorAll('.field__image');
    
    if (IMAGES.length > 0) {
        IMAGES.forEach(item => {
            item.removeAttribute("src");
        });
    }
    
    (VERSUS != null) && (VERSUS.classList.add('hidden'));
    (MODAL_COMPLETED != null) && (MODAL_COMPLETED.classList.add('hidden'));

    const WINNER = document.getElementsByClassName('.text--winner')[0];
    (WINNER != null) && (WINNER.innerText = "");

    onOffRadioButton(false);
    removeChecked(document.getElementsByName('options'));
}

export { play, gameOverAndNew, currentRound };