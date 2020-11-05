import { APP, ROUND, score, round } from "./variables.js";
import { userName, startAgainGame } from "./app.js";

const createElements = ({ type, id, nameClass, onClick, message, inputType, inputName, inputValue, messageHTML, labelFor }) => {
    const ITEM = document.createElement(type);
    
    if (id) ITEM.id = id;
    if (nameClass) ITEM.className = nameClass;
    if (onClick) ITEM.onclick = onClick;
    if (message) ITEM.innerText = message;
    if (messageHTML) ITEM.innerHTML = messageHTML;
    if (inputType) ITEM.type = inputType;
    if (inputName) ITEM.name = inputName;
    if (inputValue) ITEM.value = inputValue;
    if (labelFor) ITEM.setAttribute("for", labelFor);
        
    return ITEM;
}

const createDiv = (id = "", nameClass = "") => {
    const DIV = document.createElement('div');
    
    if (id !== "") DIV.id = id;
    if (nameClass !== "") DIV.className = nameClass;
    
    return DIV;
}

const addToDOM = items => {
    if (typeof items === "array" || typeof items === "object" && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            if (i === (items.length - 1)) return;
            items[i+1].appendChild(items[i])
        }
    }
}

const createButtonStart = () => {
    const BTN_OPEN_MODAL = createElements({
        type: "button",
        id: "open-modal",
        nameClass: "button btn--open-modal",
        messageHTML: "<span>Nowa gra</span>"
    });

    addToDOM([BTN_OPEN_MODAL , APP]);
}

const createModalUserName = () => {
    const MODAL_USER_NAME = document.getElementById('modal');
    if (MODAL_USER_NAME == null) {

        const MODAL = createDiv("modal", "container__modal hidden");
        const BODY_MODAL = createDiv("", "modal");
        const OPTIONS = createDiv("", "modal__body");
        const INPUT_GROUP = createDiv("", "name");

        const ELEMENTS_INPUT_GROUP = [
            { 
                type: "label", 
                nameClass: "name__label",
                labelFor: "input-name",
                message: "Podaj imię"
            },
            { 
                type: "input", 
                id: "input-name",
                nameClass: "name__input",
                inputType: "text"
            },
            { 
                type: "P",
                nameClass: "error--message"
            },
        ];

        const CREATED_EL_INPUT_GROUP = ELEMENTS_INPUT_GROUP.map(item => createElements(item));
        CREATED_EL_INPUT_GROUP.map(item => INPUT_GROUP.appendChild(item))

        const ELEMENTS = [
            { 
                type: "P",
                nameClass: "text--monoton",
                message: "Nowa gra"
            },
            { 
                type: "button", 
                id: "new-game-btn",
                nameClass: "button btn--new-game",
                message: "Zatwierdź"
            }
        ];
        
        const CREATED_ELEMENTS = ELEMENTS.map(item => createElements(item));
        CREATED_ELEMENTS.map((item, idx) => {
            OPTIONS.appendChild(item)
            if (idx === 0) {
                OPTIONS.appendChild(INPUT_GROUP);
            }
        });

        addToDOM([ OPTIONS, BODY_MODAL, MODAL, APP]);

    } else {
        modalUserName.style.display = "block";
    }
}

const createScore = () => {
    document.getElementById('user-name').innerText = userName;
    document.getElementById('bot-name').innerText = "Bot";
    document.getElementById('user-score').innerText = `${score.player}`
    document.getElementById('bot-score').innerText = `${score.bot}`;
}

const createOptions = () => {
    const DIRECTORY = '../assets/images';
    let  LABELS = document.querySelectorAll('.option__label');

    LABELS.forEach(item => {
        if (item.hasAttribute('for')) {
            if (item.getAttribute('for') === 'rock') {
                item.innerHTML = `<img src="${DIRECTORY}/rock.png" class="option__image" />`;
            } else if (item.getAttribute('for') === 'paper') {
                item.innerHTML = `<img src="${DIRECTORY}/paper.png" class="option__image" />`;
            } else if (item.getAttribute('for') === 'scissors') {
                item.innerHTML = `<img src="${DIRECTORY}/scissors.png" class="option__image" />`;
            }
        }
    });
}

const createRound = () => {
    ROUND.innerText = `Runda: ${round}`;
}

const modalWinner = winner => {
    document.getElementById('round-winner').innerText = `${winner}`;
}

const createBoardGame = () => {

    const IMAGE_USER = createElements({
        type: "img",
        id: "image-user",
        nameClass: "field__image",
    });

    const IMAGE_BOT = createElements({
        type: "img",
        id: "image-bot",
        nameClass: "field__image",
    });

    document.getElementById('user-field').appendChild(IMAGE_USER);
    document.getElementById('bot-field').appendChild(IMAGE_BOT);
}

const modalFinished = (message) => {
    const MODAL = document.getElementById('modal-finished');
    if (MODAL === null) {
        const FINISHED = createDiv("modal-finished", "container__modal modal-finished");
        const BODY_FINISHED = createDiv("", "modal-finished__body");
        const ELEMENTS = [
            {
                type: "p",
                nameClass: "text--winner",
                message: `${message}`
            },
            { 
                type: "button", 
                id: "start-again",
                nameClass: "button btn--start-again btn--new-game",
                onClick: startAgainGame,
                message: "Zacznij od nowa"
            }
        ];
        const CREATED_ELEMENTS = ELEMENTS.map(item => createElements(item));
        CREATED_ELEMENTS.forEach(item => BODY_FINISHED.appendChild(item));

        addToDOM([ BODY_FINISHED, FINISHED, APP ]);
    } else {
        MODAL.classList.remove('hidden');
        document.getElementsByClassName('text--winner')[0].innerText =`${message}`;
    }
}

const turnOff = () => {
        const DIV_CONTAINER = createDiv("turn-off", "background-end");
        const DIV_TURN_OFF = createDiv("", "background-end--turn-off");
    
        addToDOM([ DIV_TURN_OFF, DIV_CONTAINER, APP]);
}

const stars = () => {
    const AMOUNT = 100;
    const HEIGHT = 248;
    let width = screen.width;
    let listOfStars = "";
    let star_w, star_h, star;
  
    for (let i = 0; i < AMOUNT; i++) {
      star_w = (Math.round(Math.random() * width) / 10).toFixed(1); 
      star_h = (Math.round(Math.random() * HEIGHT) / 10).toFixed(1);
      star = `${star_w}rem ${star_h}rem #FFF`;
      if (i === (AMOUNT - 1)) {
        listOfStars += `${star};`;
        break;
      }
      listOfStars += `${star}, `;
    }
    // const element = document.getElementsByTagName('h1')[0];
    // element.style["boxShadow"] = listOfStars;
  }

export { modalWinner, createModalUserName, createButtonStart, createScore, createOptions, createRound, createBoardGame, modalFinished, turnOff };

