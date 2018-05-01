let game = {
    'cards': ['fa-diamond', 'fa-diamond',
        'fa-paper-plane-o', 'fa-paper-plane-o',
        'fa-anchor', 'fa-anchor',
        'fa-bolt', 'fa-bolt',
        'fa-cube', 'fa-cube',
        'fa-leaf', 'fa-leaf',
        'fa-bicycle', 'fa-bicycle',
        'fa-birthday-cake', 'fa-birthday-cake'
    ],
    'totalMatch': function () {
        return this.cards.length / 2
    },
    'seconds': 0,
    'totalStars': 0,
    'opend': [],
    'rank3stars': 12,
    'rank2stars': 16,
    'rank1stars': 20,
    'matchup': 0,
    'moves': 0,
    'score': 0,
    'totalTime': function () {
        time = this.seconds;
        var hours = Math.floor(time / 3600);
        time -= hours * 3600;
        var minutes = Math.floor(time / 60);
        time -= minutes * 60;
        var seconds = parseInt(time % 60, 10);
        return formatTimer = hours + 'h ' + (minutes < 10 ? '0' + minutes : minutes) + 'm ' + (seconds < 10 ? '0' + seconds : seconds) + 's ';
    }
}

function startGame() {

    const deck = document.getElementById('deck'); // captura todo o deck
    const suCards = shuffle(game.cards); // Embaralha os cards   
    const fragment = document.createDocumentFragment(); // inicia um novo fragmento

    //constroi o deck no embaralhado 
    for (let c = 0; c < suCards.length; c++) {

        let li = document.createElement('li');
        li.classList.add('card');

        let i = document.createElement('i');
        i.classList.add('fa', suCards[c]);

        li.appendChild(i);

        fragment.appendChild(li);
    }

    deck.appendChild(fragment); //refluxo e redesenho -- só uma vez!
    deck.addEventListener('click', checkClickedCard); // escura o evento click no deck

}

function checkClickedCard(evt) {
    //virifica se o alvo é realmente um card
    if (evt.target.nodeName === 'LI') {
        //Verifica se elemento já não está sendo exibido e naum naum foi aberto
        if (!evt.target.classList.contains('show', 'open') && !evt.target.classList.contains('match')) {
            game.opend.push(evt.target);
            evt.target.classList.add('show', 'open');
            checkMatchup(game.opend);
        }

        initTime(); //inicia o contador
        updateView(); //Atualiza a View em cada movimento     
        endGame(); // verifica so o jogo pode ser finalizado
    }
}

function checkMatchup(evt) {
    // verivica se existe mais de um elemento em exibição
    if (evt.length > 1) {
        //isola cada item clicado para comparação
        let open1 = evt[0].children[0].className;
        let open2 = evt[1].children[0].className;
        if (open1 == open2) {
            fixOpen(game.opend);
        } else {
            fixClosed(game.opend);
        }
        game.opend = []; // a cada dois cards abertos zera a lista
        game.moves++; // a cada dois cards abertos conta um movimento
    }
}

//Força os cards combinados a ficarem abertos
function fixOpen(item) {
    for (var i = 0; i < item.length; i++) {
        item[i].classList.add('match');
        item[i].classList.remove('show', 'open');
    }
    game.matchup++;
}

//Força os cards não combinados a fecharem
function fixClosed(item) {
    setTimeout(function () {
        for (var i = 0; i < item.length; i++) {
            item[i].classList.remove('show', 'open');
        }
    }, 1000);
}

//Percorre as estrelas a e atualiza a pontuação
function setStars(rating) {
    const stars = document.querySelectorAll(".fa-star");
    for (var i = 0; i < stars.length; i++) {
        if (i >= rating) {
            stars[i].classList.remove('fa-star');
            stars[i].classList.add('fa-star-o');
        }
    }
}

//verifica o fim do jogo
function endGame() {
    // Verifica se o total de cartas combinadas conicide com o total de possibilidades no dack
    if (game.matchup == game.totalMatch()) {



        const res = document.querySelector('.close');
        res.addEventListener('click', closenModal);

        openModal();
    }
}

//abre amodal
function openModal() {
    //Atualiza os valores da modal
    //Configura a altura da modal
    const containerHeigth = document.querySelector('.container').offsetHeight + 'px';
    const modal = document.querySelector('.modal');
    modal.style.height = containerHeigth;
    const pontiacaoFinal = document.querySelector('.pontuacao-final');
    const tempoFinal = document.querySelector('.tempo-final');
    setTimeout(function () {
        pontiacaoFinal.innerHTML = game.totalStars;
        tempoFinal.innerHTML = game.totalTime();
        modal.classList.remove('d-none'); // remove a classe que esconde a modal
        modal.classList.add('d-block'); // adiciona a classe que exibe a modal
    }, 1000);
}

//fecha a modal
function closenModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('d-block');
    modal.classList.add('d-none');
}

function restartGame() {
    const res = document.getElementsByClassName('restart');
    for (let i = 0; i < res.length; i++) {
        res[i].addEventListener('click', reset);
    }
}

//reinicia o jogo recarregando a página
function reset() {
    window.location.reload();
}

function updateView() {

    //atualiza os movimentos
    const move = document.querySelector(".moves");
    if (game.moves > 1) {
        move.innerHTML = game.moves + " Moves";
    } else {
        move.innerHTML = game.moves + " Move";
    }

    //atualiza as estrelas
    if (game.moves <= game.rank3stars) {
        setStars(3);
        game.totalStars = '3 estrelas';
    } else if (game.moves <= game.rank2stars) {
        setStars(2);
        game.totalStars = '2 estrelas';
    } else if (game.moves <= game.rank1stars) {
        setStars(1);
        game.totalStars = '1 estrela';
    } else {
        setStars(0);
        game.totalStars = '0 estrela';
    }

}

//Cronometro
function initTime() {
    //garante que a contagem inicie apenas com o primeiro click
    if (game.seconds === 0) {
        timer = setInterval(function () {
            game.seconds = game.seconds + 1
        }, 1000);
    }
}

//Reinicia cronometro
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
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
restartGame();