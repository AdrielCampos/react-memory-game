
let op = [];


function showCard(evt) {
    if (evt.target.nodeName === 'LI') {
        if (!evt.target.classList.contains('show', 'open') && !evt.target.classList.contains('match')) {
            op.push(evt.target);
            evt.target.classList.add('show', 'open');
            checkCards(op);
        } else {console.log("sem trapaçca")}
    }
}

function checkCards(evt) {
    if (evt.length > 1) {
        let open1 = evt[0].children[0].className;
        let open2 = evt[1].children[0].className;
        if (open1 == open2) {
            console.log('igual');
            fixOpen(op);
        } else {
            console.log('diferente');
            fixClosed(op);
        }
        op = [];
    }
}

function fixOpen(item) {
    for (var i = 0; i < item.length; i++) {
        item[i].classList.add('match');
        item[i].classList.remove('show', 'open');
    }
}

function fixClosed(item) {
    setTimeout(function () {
        for (var i = 0; i < item.length; i++) {
            console.log(item[i].className); //second console output
            item[i].classList.remove('show', 'open');
        }
    }, 1000);
}

function countTimer() {
    matchingGame.elapsedTime++;
    var minute = Math.floor(matchingGame.elapsedTime / 60);
    var second = matchingGame.elapsedTime % 60;

    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    $("#elapsed-time").html(minute + ":" + second);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Embaralha o card imediatamente após o carregamanto da página
(function () {

    const cards = Array.prototype.slice.call(document.getElementsByClassName('card')); //HTMLCollection to an Array  
    const suCard = shuffle(cards); // Embaralha os cards
    
    const fragment = document.createDocumentFragment(); //usa um DocumentFragment em vez de uma <div>
    for (let i = 0; i < suCard.length; i++) {
        fragment.appendChild(suCard[i]);
    }
    document.getElementById('deck').appendChild(fragment); //refluxo e redesenho -- só uma vez!

})();


const clickButton = document.getElementById("deck");

clickButton.addEventListener('click', showCard);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */