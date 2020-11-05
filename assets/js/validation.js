const infoError = (input) => {
    const MSG_ERROR = document.getElementsByClassName('error--message')[0];
    input.classList.add('error__input');
    MSG_ERROR.textContent = "Niepoprawne dane";
}

const validName = (string, input) => {
    string = string.trim();
    if (!/^[a-zA-Z]{2,10}$/.test(string)) {
        infoError(input);
        return false;
    } else {
        (input.classList.contains('error__input')) && input.classList.remove('error__input');
        const MSG_ERROR = document.getElementsByClassName('error--message')[0];
        MSG_ERROR.textContent = "";
        return true;
    }
}

export { validName };