//////////////////////////////////////////////////////////////////////////////// CONSTANTS

const playerHealthBar = document.querySelector('.player-healthleft');
const enemyHealthBar = document.querySelector('.enemy-healthleft');
const playerNameDisplay = document.querySelector('.player h2');
const enemyNameDisplay = document.querySelector('.enemy h2')
const playerButton = document.querySelectorAll('.dropdown-item');
const attackButton = document.querySelector('.attackButton');
const enemies = ['AttEnemy', 'DefEnemy', 'MedEnemy'];
const startButton = document.querySelector('.startButton');
const playerDropdown = document.querySelector('.dropdown-toggle');
let game = {};

startButton.style.visibility = "hidden";

let character = "";
let attacker = {};
let defender = {};

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
        this.name = 'Monkey with a stick';
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
        this.name = 'Turtle';
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttPlayer extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = 'Cougar';
        this.attack = 17;
        this.defense = 7;
        this.attVar = 5;
        this.defVar = 5;
    }
}

class MedEnemy extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = 'Connor';
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefEnemy extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = 'Sean';
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttEnemy extends Character {
    constructor(name, attack, defense, attVar, defVar) {
        super(name, attack, defense, attVar, defVar);
        this.name = 'Tommy';
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
        this.enemy = enemy;
    }
}

//////////////////////////////////////////////////////////////////////////////// PICK A PLAYER

playerButton.forEach(button => button.addEventListener("click", function (event) {
    character = event.target.value;
    playerNameDisplay.innerHTML = character;
    startButton.style.visibility = "unset";

}));


//////////////////////////////////////////////////////////////////////////////// START BUTTON

startButton.addEventListener("click", function () {
    start();
    startButton.style.visibility = "hidden";
    playerDropdown.style.visibility = "hidden";
});

function start() {
    game = new Game();
    game.chooseEnemy();
    game.confirmPlayer();
};


/////////////////////////////////////////////////////////////////////////// CONFIRM PLAYER

Game.prototype.confirmPlayer = function () {
    if (character === 'AttPlayer') {
        this.player = new AttPlayer;
    } else if (character === 'DefPlayer') {
        this.player = new DefPlayer;
    } else {
        this.player = new MedPlayer;
    }
    playerNameDisplay.innerHTML = this.player.name;
    console.log(this.player);
};


/////////////////////////////////////////////////////////////////////////// PICK AN ENEMY

Game.prototype.chooseEnemy = function() {
    let num = Math.floor(Math.random() * 3);
    console.log(enemies[num]);
    if (enemies[num] === 'AttEnemy') {
        this.enemy = new AttEnemy;
    } else if (enemies[num] === 'DefEnemy') {
        this.enemy = new DefEnemy;
    } else {
        this.enemy = new MedEnemy;
    }
    enemyNameDisplay.innerHTML = this.enemy.name;
    console.log(this.enemy);
}

//////////////////////////////////////////////////////////////////////////////// COMPARE

function attVarResult(){
    console.log(Math.floor((Math.random() * this.attVar) + 1));
}

function defVarResult() {
    console.log(Math.floor((Math.random * this.defVar) + 1));
}

function attDamage() {
    console.log(this.attack + attVarResult());
}

function defDamage(defender) {
   let num = defVarResult();
    if (num >= 5) {
        console.log('BLOCKED!')
        return defender.defense + 100
    } else {
        return defender.defense - (num);
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
    attacker = this.player;
    defender = this.enemy;
    compare();
    victory();
    attacker = this.enemy;
    defender = this.player;
    setTimeout(function() {
        compare();
        victory();
      }, 10000);  
})

let hi = 0;


