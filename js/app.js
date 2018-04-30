let game = {
    'cards': ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-birthday-cake', 'fa-birthday-cake'],
    'totalMatch': function(){return this.cards.length /2},
    'opend': [],
    'rank3stars': 12,
	'rank2stars': 16,
    'rank1stars': 20,
    'matchup': 0,
    'moves': 0,
    'score':0
}

function startGame(){

    //const cards = Array.prototype.slice.call(document.getElementsByClassName('card')); //HTMLCollection to an Array  
    const deck  = document.getElementById('deck'); // captura todo o deck
    const suCards = shuffle(game.cards); // Embaralha os cards   
    const fragment = document.createDocumentFragment();
    
   // console.log(game.totalCard());
   
    for (let c = 0; c < suCards.length; c++) {
        
        let li = document.createElement('li');
        li.classList.add('card');
        
        let i = document.createElement('i');
        i.classList.add('fa',suCards[c]);
        
        li.appendChild(i);

        fragment.appendChild(li);
    }
   
    deck.appendChild(fragment); //refluxo e redesenho -- só uma vez!
    deck.addEventListener('click', checkCard);
    
}

function checkCard(evt) {
    //virifica se o alvo é um item da lista
    if (evt.target.nodeName === 'LI') {
        //Verifica se elemento já não está sendo exibido e naum naum foi aberto
        if (!evt.target.classList.contains('show', 'open') && !evt.target.classList.contains('match')) {
            game.opend.push(evt.target);
            evt.target.classList.add('show', 'open');
            checkMatchup(game.opend);
        } 

        //Fim do jogo
        if (game.matchup == game.totalMatch()) {       
            setTimeout(function () {
                window.alert("Fim do jogo");
            }, 1000);
        }
    }
}

function checkMatchup(evt) {
    // verivica se existe mais de um elemento em exibição
    if (evt.length > 1) {
        let open1 = evt[0].children[0].className;
        let open2 = evt[1].children[0].className;
        if (open1 == open2) {
            console.log('igual');
            fixOpen(game.opend);
        } else {
            console.log('diferente');
            fixClosed(game.opend);
        }
        game.opend = [];
        game.moves++;
    } 
}

function fixOpen(item) {
    for (var i = 0; i < item.length; i++) {
        item[i].classList.add('match');
        item[i].classList.remove('show', 'open');
    }
    game.matchup++;
}

function fixClosed(item) {
    setTimeout(function () {
        for (var i = 0; i < item.length; i++) {
            console.log(item[i].className); //second console output
            item[i].classList.remove('show', 'open');
        }
    }, 1000);
}

function calcScore(){

    if(game.rank1stars <= game.moves){

    } else if (game.rank2stars <= game.moves){

    } else {
        
    }

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

startGame();


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