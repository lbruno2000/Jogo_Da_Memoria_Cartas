const cards = document.querySelectorAll('.card');
let hasFlippeCard = false;
let firstCard, secondCard;
let lockBoard = false; // tempo da carta para conseguir escolher outra

// function flipCards() {
//     this.classList.toggle('flip'); //toggle tira e adiciona
// }

function flipCards() {

    if (lockBoard) return;
    if (this === firstCard) return; // não deixa clicar duas vezes nesta carta, após se errar, ela retornar

    this.classList.add('flip');
    if (!hasFlippeCard) {
        hasFlippeCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippeCard = false;
    checkForMath();
}

function checkForMath() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);

    resetBoard();
}

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippeCard, lockBoard] = [false, false]; //criar novo array
    [firstCard, secondCard] = [null, null];
}

//Função para embaralhar as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12); //conta que vai sortear a ordem das cartas, até 12
                            //Math.floor arredonda o valor-resultado
        card.style.order = randomPosition;
    })
})();

//colocando a função dentro do parentêsis, é chamado de imediate, que assim que chamar o javascript, 
//ja chama essa função antes de tudo.

cards.forEach((card) => {
    card.addEventListener('click', flipCards)
})