import { Game } from './Game.js'

const objGame = new Game('Acerte as Cores');

// Obtém os elementos HTML relevantes
const circles = document.querySelectorAll('.circle');
const colorName = document.querySelector('.color-name');
const message = document.querySelector('#message');
const continueButton = document.querySelector('#continue');
const backButton = document.querySelector('#back');
let correctColorIndex = 2; // Índice do círculo correto (0-5)
let numAttempts = 0;
let correctGuessesPerAttempt = 0;
let performance;
const gameName = 'Jogo de Cores';
let day;
let month;
let year;
let actualDate;

// Array de cores para o jogo
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

// Função para iniciar o jogo
function startGame() {
    // Incrementar o número de tentativas
    numAttempts++;
    captureActualDate();

    // Verificar se atingiu o limite de tentativas
    if (numAttempts > 5) {

        objGame.gameSaves();

        // Limpar a mensagem e exibir apenas o botão de voltar
        message.textContent = '';
        continueButton.style.display = 'none';
        backButton.style.display = 'block';
        backButton.addEventListener('click', handleBackButtonClick);
        return;
    }

    // Escolher uma cor aleatória para adivinhar
    correctColorIndex = Math.floor(Math.random() * colors.length);

    // Exibir o nome da cor a ser adivinhada em português
    const colorNames = {
        red: 'Vermelho',
        green: 'Verde',
        blue: 'Azul',
        yellow: 'Amarelo',
        purple: 'Roxo',
        orange: 'Laranja',
    };
    colorName.textContent = colorNames[colors[correctColorIndex]];

    // Definir as cores dos círculos
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = colors[i];
        circles[i].addEventListener('click', handleCircleClick);
    }

    // Limpar a mensagem e esconder os botões
    message.textContent = '';
    continueButton.style.display = 'none';
    backButton.style.display = 'none';
}

// Função para lidar com o clique em um círculo
function handleCircleClick(event) {

    objGame.attemptCounter();

    const clickedColorIndex = Array.from(circles).indexOf(event.target);

    if (clickedColorIndex === correctColorIndex) {

        objGame.sumPoint();

        // O jogador acertou
        correctGuessesPerAttempt++;
        message.textContent = 'Você acertou! Parabéns!\n' + correctGuessesPerAttempt + ' de 5';
    } else {
        // O jogador errou
        message.textContent = 'Você errou. Tente novamente.';
    }

    // Remover os ouvintes de clique dos círculos
    for (const circle of circles) {
        circle.removeEventListener('click', handleCircleClick);
    }

    // Exibir o botão de continuar
    continueButton.style.display = 'block';
    continueButton.addEventListener('click', startGame);
    backButton.style.display = 'block';
    backButton.addEventListener('click', handleBackButtonClick);
}

function verifyNumAttempts() {
    if (numAttempts > 1) {
        performance = parseInt((correctGuessesPerAttempt / (numAttempts - 1)) * 100);
    }

    return performance
}

function classifyPerformance() {
    performance = verifyNumAttempts();
    if (performance >= 80){
        performance = 'Alto';
    }
    else if (performance >= 60){
        performance = 'Médio';
    }
    else {
        performance = 'Baixo';
    };

    return performance
}

function captureActualDate() {
    const date = new Date();
    day =  String(date.getDate()).padStart(2, '0');
    month = String(date.getMonth() + 1).padStart(2, '0');
    year = date.getFullYear();
    actualDate = day + '/' + month + '/' + year;

    return actualDate
}

function resetGame() {
    numAttempts = 0; // Reseta o número de tentativas
    correctGuessesPerAttempt = 0; // Reseta os acertos por tentativa
    message.textContent = ''; // Limpa a mensagem
    continueButton.style.display = 'none'; // Esconde o botão de continuar
    backButton.style.display = 'none'; // Esconde o botão de voltar
}

// Função para lidar com o clique no botão "Voltar"
function handleBackButtonClick() {
    resetGame(); // Redefine o jogo
    startGame(); // Reinicia o jogo
}

// Iniciar o jogo quando a página carregar
window.addEventListener('load', startGame);