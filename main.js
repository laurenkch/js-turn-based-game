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
    constructor(name, attack, defense, attVar, defVar){
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 15;
        this.defense = 10; 
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefPlayer extends Character{
    constructor(name, attack, defense, attVar, defVar){
        super(name,  attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttPlayer extends Character{
    constructor(name, attack, defense, attVar, defVar){
        super(name,  attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 17;
        this.defense = 7;
        this.attVar = 5;
        this.defVar = 5;
    }
}

class MedEnemy extends Character{
    constructor(name, attack, defense, attVar, defVar){
        super(name, attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 15;
        this.defense = 10; 
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefEnemy extends Character{
    constructor(name, attack, defense, attVar, defVar ){
        super(name,  attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttEnemy extends Character{
    constructor(name, attack, defense, attVar, defVar){
        super(name,  attack, defense, attVar, defVar);
        this.name = name;
        this.attack = 17;
        this.defense = 7;
        this.attVar = 5;
        this.defVar = 5;
    }
}

class Game {
    constructor(player, enemy) {
        this.player = player
        // this.enemies = [new AttEnemy("M"), new DefEnemy("D"), new MedEnemy("F")]

        // this.loop = loop;
    }

    choosePlayer() {

    }

    chooseEnemy() {

    }

    win() {
        this.loop = false;
        console.log("Conglaturation. You're winner!")
    }

    lose() {
        this.loop = false;
        console.log("You lost!")
    }

    checkForWinner() {
        if (player.health === 0) {
            game.lose()
        } else if (enemy.health === 0) {
            game.win()
        }
    }

    start() {
        this.loop = true;
        // chooseEnemy()
        // start main loop
        /*
        while (loop) {
            checkForWinner();
        };

        eventListener {
            if (attack === true) {
                player.Attack(enemy, valueTaken)
            }
        }
        */
    }
    
}

function attVarResult(){
    return Math.floor((Math.random() * this.attVar) + 1);
}

function defVarResult(){
    return Math.floor((Math.random * this.defVar) + 1);
}

function attDamage(){
    return this.attack + attVarResult();
}

function defDamage(){
    defVarResult();
    if (defVarResult() >= 5){
        console.log('BLOCKED!')
        return this.defense + 100
    } else {
    return this.defense - (defResult());
    }
};

function compare(defHealth){
    attDamage();
    defDamage();
    if (attDamage() > defDamage()){
        console.log('HIT');
     defHealth = defHealth - (attResult() - defResult());
    };
};



const game = new Game();

startButton = document.getElementsByClassName('startButton')[0];

startButton.addEventListener("click", function() {
    game.start();
    startButton.style.visibility = "hidden";
});

const healthBar = document.querySelector('.healthleft');
const playerDisplay = document.querySelector('.player');
const playerButton = document.querySelectorAll('.dropdown-item');

playerButton.forEach(button => button.addEventListener("click", function (event) {
    character = event.target.value;
    game.player = character;
    playerDisplay.innerHTML = game.player
    healthBar.innerHTML = game.player.health
}));



