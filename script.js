// Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;
let winningSequence = [];

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

// Funções
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        checkGame(); // Verifica o estado do jogo após o movimento
        togglePlayer();
    }
}

function reset() {
    warning = '';
    winningSequence = [];

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for (let i in square) {
        square[i] = '';
    }

    playing = true; // Inicia o jogo

    renderSquare();
    renderInfo();
    removeWinnerStyles();
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if (square[i] !== '') {
            item.innerHTML = square[i];
        } else {
            item.innerHTML = '';
        }
    }
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    if (player === 'x') {
        player = 'o';
    } else {
        player = 'x';
    }
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu!';
        playing = false; // O jogo terminou
        highlightWinner();
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu!';
        playing = false; // O jogo terminou
        highlightWinner();
    } else if (isFull()) {
        warning = 'Deu empate!';
        playing = false; // O jogo terminou
    }
}

function checkWinnerFor(player) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3', // Possibilidades na Horizontal.
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2', // Possibilidades na Vertical.
        'a3,b3,c3',

        'a1,b2,c3', // Possibilidade na Diagonal
        'a3,b2,c1'
    ];

    for (let p in possibilities) {
        let pArray = possibilities[p].split(',');

        let hasWon = pArray.every(option => square[option] === player);
        if (hasWon) {
            winningSequence = pArray; //Armazena a sequencia vencedora
            return true;
        }
    }
    return false;
}

function isFull() {
    for (let f in square) {
        if (square[f] === '') {
            return false;
        }
    }
    return true;
}

// Função para destacar a sequencia vencedora
function highlightWinner() {
    winningSequence.forEach(item => {
        let winnerItem = document.querySelector(`div[data-item="${item}"]`);
        winnerItem.classList.add('winner'); // Adiciona a classe para mudar o fundo para verde
    });
}


// Função para remover qualquer estilo de vencedor (caso de um novo jogo)
function removeWinnerStyles() {
    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove('winner');
    });
}
