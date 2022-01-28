//////////////////////////////////////////////////////////////////////////////// CONSTANTS

const healthBar = document.querySelector('.healthleft');
const playerDisplay = document.querySelector('.player');
const playerButton = document.querySelectorAll('.dropdown-item');
let character = "";
const attackButton = document.querySelector('.attackButton');
const enemies = [AttEnemy, DefEnemy, MedEnemy];

//////////////////////////////////////////////////////////////////////////////// START BUTTON


startButton = document.getElementsByClassName('startButton')[0];

startButton.addEventListener("click", function () {
    game.start();
    startButton.style.visibility = "hidden";
});

//////////////////////////////////////////////////////////////////////////////// CLASSES


class Character{
    constructor(name, attack, defense, attVar, defVar){
        this.name = name;
        this.health = 100;
        this.attack = attack;
        this.defense = defense;
        this.attVar = attVar;
        this.defVar = defVar;

    }
}

class MedPlayer extends Character{
    constructor(name, health, attack, defense, attVar, defVar){
        super(name, health, attack, defense, attVar, defVar);
        this.name = name;
        this.health = 100;
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefPlayer extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttPlayer extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 17;
        this.defense = 7;
        this.attVar = 5;
        this.defVar = 5;
    }
}

class MedEnemy extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefEnemy extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttEnemy extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 17;
        this.defense = 7;
        this.attVar = 5;
        this.defVar = 5;
    }
}

//////////////////////////////////////////////////////////////////////////////// GAME

class Game {
    constructor(player, enemy) {
        this.player = player;
        // this.enemies = [new AttEnemy("M"), new DefEnemy("D"), new MedEnemy("F")]
        // this.loop = loop;
    }

    chooseEnemy() {
        []
    }

    start() {
        const game = new Game();
        this.chooseEnemy();
        this.loop = true;

        // start main loop
        /*
        while (loop) {
            checkForWinner();
        };
        */
    }

}

/////////////////////////////////////////////////////////////////////////// PICK AN ENEMY

Game.prototype.chooseEnemy = function () {
    let enemyName = enemies[Math.floor((Math.random() * 3) + 1)];
    if (enemyName === 'AttEnemy') {
        game.enemy = new AttEnemy;
    } else if (enemyName === 'DefEnemy') {
        game.enemy = new DefEnemy;
    } else {
        game.enemy = new MedEnemy;
    }
    console.log(game.enemy);

}
//////////////////////////////////////////////////////////////////////////////// PICK A PLAYER

playerButton.forEach(button => button.addEventListener("click", function (event) {
    character = event.target.value;
    playerDisplay.innerHTML = character;
}));


//////////////////////////////////////////////////////////////////////////////// COMPARE

function attVarResult(){
    return Math.floor((Math.random() * attacker.attVar) + 1);
}

function defVarResult() {
    return Math.floor((Math.random * defender.defVar) + 1);
}

function attDamage() {
    return attacker.attack + attVarResult();
}

function defDamage(defender) {
    defVarResult();
    if (defVarResult() >= 5) {
        console.log('BLOCKED!')
        return defender.defense + 100
    } else {
        return defender.defense - (defVarResult());
    }
}

function compare(){
    attDamage();
    defDamage();
    if (attDamage() > defDamage()) {
        console.log('HIT');
        defender.health = defender.health - (attResult() - defResult());
    }
}


function victory() {
    if (player.health === 0) {
        console.log("You lost!")
    } else if (enemy.health === 0) {
        console.log("Conglaturation. You're winner!")
    }
}

//////////////////////////////////////////////////////////////////////////////// ATTACK BUTTON


attackButton.addEventListener('click', () => {
    let attacker = this.player;
    let defender = this.enemy;
    compare();
    victory();
    attacker = this.enemy;
    defender = this.player;
    setTimeout(function() {
        compare();
        victory();
      }, 10000);  
})



const game = new Game();

const startButton = document.querySelector('.startButton');
// const healthBar = document.querySelector('.healthleft');
// const playerDisplay = document.querySelector('.player');
// const playerButton = document.querySelectorAll('.dropdown-item');
const playerDropdown = document.querySelector('.dropdown-toggle');
startButton = document.getElementsByClassName('startButton')[0];

startButton.addEventListener("click", function () {
    game.start();
    startButton.style.visibility = "hidden";
    playerDropdown.style.visibility = "hidden";
});


const playerButton = document.querySelectorAll('.dropdown-item');

playerButton.forEach(button => button.addEventListener("click", function (event) {
    character = event.target.value;
    game.choosePlayer(character);
}));


Game.prototype.choosePlayer = function (character) {
    player = new character
};

