export const ITEMS = ["rock", "paper", "scissors"];

export const APP = document.getElementById('app');
export const BOARD_GAME = document.getElementById('board-game');
export const START_BG = document.getElementById('background');
export const TRON_GRID = document.getElementsByClassName('container__grid--tron')[0];
export const VERSUS = document.getElementById('versus');
export const DIV_ROUND = document.getElementsByClassName('round')[0];
export const ROUND = document.getElementById('round--number');
export const USER_OPTIONS = document.getElementById('user-options');
export const GROUP_INPUT = USER_OPTIONS.getElementsByClassName('option');
export const RADIO_SELECT = document.getElementsByName('options');

export let round = 1;
export let score = {
    player: 0,
    bot: 0
};