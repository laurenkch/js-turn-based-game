//////////////////////////////////////////////////////////////////////////////// CONSTANTS

const playerHealthBar = document.querySelector('.player-healthleft');
const enemyHealthBar = document.querySelector('.enemy-healthleft');
const playerNameDisplay = document.querySelector('.player h2');
const enemyNameDisplay = document.querySelector('.enemy h2')
const playerButton = document.querySelectorAll('.dropdown-item');
const attackButton = document.querySelector('.attackButton');
const startButton = document.querySelector('.startButton');
const playerDropdown = document.querySelector('.dropdown-toggle');

startButton.style.visibility = "hidden";
attackButton.style.visibility = "hidden";

const enemies = ['AttEnemy', 'DefEnemy', 'MedEnemy'];
let game = {};
let character = "";
let game = {};
//////////////////////////////////////////////////////////////////////////////// CLASSES


class Character{
    constructor(name, health, attack, defense, attVar, defVar){
        this.name = name;
        this.health = health;
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
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.name = 'Turtle';
        this.health = 100;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttPlayer extends Character {       
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.name = 'Cougar';
        this.health = 100;
        this.attack = 17;
        this.defense = 7;
        this.attVar = 5;
        this.defVar = 5;
    }
}

class MedEnemy extends Character {
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health,attack, defense, attVar, defVar);
        this.name = 'Zookeeper Connor';
        this.health = 100;
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefEnemy extends Character {     
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.name = 'Zookeeper Sean';
        this.health = 100;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttEnemy extends Character {
    constructor(name,health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.name = 'Zookeeper Tommy';
        this.health = 100;
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

playerButton.forEach(button => button.addEventListener('click', function (event) {
    character = event.target.value;
    playerNameDisplay.innerHTML = character;
    startButton.style.visibility = 'unset';
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
    attackButton.style.visibility = "unset";
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

/////////PLAYER TURN

Game.prototype.attVarResult = function(){
    // console.log(Math.floor((Math.random() * this.player.attVar) + 1));
    return Math.floor((Math.random() * this.player.attVar) + 1);
}

Game.prototype.defVarResult = function() {
    // console.log(Math.floor(Math.random * this.enemy.defVar) + 1);
    return Math.floor((Math.random() * this.enemy.defVar) + 1);
}

Game.prototype.attDamage = function() {
    // game.attVarResult();
    // console.log(this.player.attack + game.attVarResult());
    return this.player.attack + game.attVarResult();
}

Game.prototype.defDamage = function() {
    let defResultEn = game.defVarResult();
    console.log(defResultEn);
    if (defResultEn >= 5) {
        console.log('BLOCKED!')
        return this.enemy.defense + 100
    } else {
        return this.enemy.defense - (defResultEn);
    }
}

Game.prototype.comparePlayerTurn = function(){
    let attackDamP = game.attDamage();
    console.log(attackDamP);
    let defDamEn = game.defDamage();
    console.log(defDamEn);
    if (attackDamP > defDamEn) {
        console.log('HIT');
        console.log(this.enemy.health)
        console.log(attackDamP - defDamEn)
        console.log(this.enemy.health - (attackDamP - defDamEn));
        this.enemy.health = this.enemy.health - (attackDamP - defDamEn);
        console.log(this.enemy.health);
    }
}

/////////ENEMY TURN

Game.prototype.attVarResEnemy = function(){
    // console.log(Math.floor((Math.random() * this.enemy.attVar) + 1));
    return Math.floor((Math.random() * this.enemy.attVar) + 1);
}

Game.prototype.defVarResEnemy = function() {
    // console.log(Math.floor((Math.random * this.player.defVar) + 1));
    return Math.floor((Math.random() * this.player.defVar) + 1);
}

Game.prototype.attDamEnemy = function() {
    // console.log(this.enemy.attack + game.attVarResult());
    return this.enemy.attack + game.attVarResult();
}

Game.prototype.defDamEnemy = function() {
    let defResultP = game.defVarResEnemy();
    // console.log(defResultP);
    if (defResultP >= 5) {
        console.log('BLOCKED!')
        return this.player.defense + 100
    } else {
        return this.player.defense - (defResultP);
    }
}

Game.prototype.compareEnemyTurn = function(){
    let attackDamEn = game.attDamEnemy();
    // console.log(attackDamEn);
    let defDamP = game.defDamEnemy();
    if (attackDamEn > defDamP) {
        console.log('HIT');
        this.player.health = this.player.health - (attackDamEn - defDamP);
        console.log(this.player.health);
    }
}

////////VICTORY

Game.prototype.victory = function(){
    if (this.player.health <= 0) {
        console.log("You lost!")
    } else if (this.enemy.health <= 0) {
        console.log("Conglaturation. You're winner!")
    }
}

//////////////////////////////////////////////////////////////////////////////// ATTACK BUTTON


attackButton.addEventListener('click', () => {
    attackButton.disabled = true;
    game.comparePlayerTurn();
    console.log(game.enemy.health);
    game.victory();

    setTimeout(function() {
        game.compareEnemyTurn();
        console.log(game.player.health);
        game.victory();
        attackButton.disabled = false;
      }, 5000);  
})




