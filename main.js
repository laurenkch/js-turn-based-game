//////////////////////////////////////////////////////////////////////////////// CONSTANTS

const playerNameDisplay = document.querySelector('.player h2');
const enemyNameDisplay = document.querySelector('.enemy h2')
const playerButton = document.querySelectorAll('.dropdown-item');
const attackButton = document.querySelector('.attackButton');
const startButton = document.querySelector('.startButton');
const playerDropdown = document.querySelector('.dropdown-toggle');
const resDisplay = document.querySelector('.resDisplay');
const resetButton = document.querySelector('.resetButton');

startButton.style.visibility = "hidden";
attackButton.style.visibility = "hidden";
resetButton.style.visibility = "hidden";

const enemies = ['AttEnemy', 'DefEnemy', 'MedEnemy'];
let game = {};
let character = "";
//////////////////////////////////////////////////////////////////////////////// CLASSES


class Character {
    constructor(name, health, attack, defense, attVar, defVar) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.attVar = attVar;
        this.defVar = defVar;
        this.healBar = "";
    }
    get healthLeft() {
        return `${this.health}%`;
    }

    updateHealth = function () {
        if (this.health > 0) {
            this.healthBar.style.width = this.healthLeft;
        } else {
            this.healthBar.style.width = `0%`;
        }
    }

}

class Player extends Character {
    constructor(name, health, attack, defense, attVar, defVar, healthBar) {
        super(name, health, attack, defense, attVar, defVar);
        this.healthBar = document.querySelector('.player .healthleft');
    }
}

class MedPlayer extends Player {
    constructor(name, health, attack, defense, attVar, defVar, healthBar) {
        super(name, health, attack, defense, attVar, defVar, healthBar);
        this.name = 'Monkey with a stick';
        this.health = 100;
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefPlayer extends Player {
    constructor(name, health, attack, defense, attVar, defVar, healthBar) {
        super(name, health, attack, defense, attVar, defVar, healthBar);
        this.name = 'Turtle';
        this.health = 100;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttPlayer extends Player {
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

class Enemy extends Character {
    constructor(name, health, attack, defense, attVar, defVar, healthBar) {
        super(name, health, attack, defense, attVar, defVar);
        this.healthBar = document.querySelector('.enemy .healthleft');
    }
}

class MedEnemy extends Enemy {
    constructor(name, health, attack, defense, attVar, defVar, healthBar) {
        super(name, health, attack, defense, attVar, defVar, healthBar);
        this.name = 'Zookeeper Connor';
        this.health = 100;
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefEnemy extends Enemy {
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.name = 'Zookeeper Shaun';
        this.health = 100;
        this.attack = 12;
        this.defense = 13;
        this.attVar = 5;
        this.defVar = 7;
    }
}

class AttEnemy extends Enemy {
    constructor(name, health, attack, defense, attVar, defVar) {
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

    confirmPlayer() {
        if (character === 'Cougar') {
            this.player = new AttPlayer;
        } else if (character === 'Turtle') {
            this.player = new DefPlayer;
        } else {
            this.player = new MedPlayer;
        }
        playerNameDisplay.innerHTML = this.player.name;
    }

    chooseEnemy() {
        let num = Math.floor(Math.random() * 3);
        if (enemies[num] === 'AttEnemy') {
            this.enemy = new AttEnemy;
        } else if (enemies[num] === 'DefEnemy') {
            this.enemy = new DefEnemy;
        } else {
            this.enemy = new MedEnemy;
        }
        enemyNameDisplay.innerHTML = this.enemy.name;
    }

    attVarResult() {
        return Math.floor((Math.random() * this.player.attVar) + 1);
    }
    
    defVarResult() {
        return Math.floor((Math.random() * this.enemy.defVar) + 1);
    }
    
    attDamage() {
        return this.player.attack + game.attVarResult();
    }
    
    defDamage() {
        let defResultEn = game.defVarResult();
        if (defResultEn >= 5) {
            resDisplay.innerHTML = 'BLOCKED!!!!!';
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function(){
                resDisplay.style.animation = 'none';
            },750)
            return this.enemy.defense + 100
        } else {
            return this.enemy.defense - (defResultEn);
        }
    }
    
    comparePlayerTurn() {
        let attackDamP = game.attDamage();
        let defDamEn = game.defDamage();
        if (attackDamP > defDamEn) {
            resDisplay.innerHTML = 'DAMAGE!!!!!';
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function(){
                resDisplay.style.animation = 'none';
            },750)
            this.enemy.health = this.enemy.health - (attackDamP - defDamEn);
        }
    }

    attVarResEnemy() {
        return Math.floor((Math.random() * this.enemy.attVar) + 1);
    }
    
    defVarResEnemy() {
        return Math.floor((Math.random() * this.player.defVar) + 1);
    }
    
    attDamEnemy() {
        return this.enemy.attack + game.attVarResult();
    }
    
    defDamEnemy() {
        let defResultP = game.defVarResEnemy();
        if (defResultP >= 5) {
            resDisplay.innerHTML = 'BLOCKED!!!!!';
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function(){
                resDisplay.style.animation = 'none';
            },750)
            return this.player.defense + 100;
        } else {
            return this.player.defense - (defResultP);
        }
    }
    
    compareEnemyTurn() {
        let attackDamEn = game.attDamEnemy();
        let defDamP = game.defDamEnemy();
        if (attackDamEn > defDamP) {
            resDisplay.innerHTML = 'DAMAGE!!!!!';
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function(){
                resDisplay.style.animation = 'none';
            },750)
            this.player.health = this.player.health - (attackDamEn - defDamP);
        }
    }

    victory() {
        if (this.player.health <= 0) {
            resDisplay.innerHTML = 'You lost!';
        } else if (this.enemy.health <= 0) {
            resDisplay.innerHTML = "Conglaturation. You're winner!";
        }
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
    resDisplay.innerHTML = 'FIGHT!!!!!';
    rotate();
    setTimeout(function(){
        resDisplay.style.animation = 'none';
    },3000)
    
});

function start() {
    game = new Game();
    game.chooseEnemy();
    game.confirmPlayer();
    attackButton.style.visibility = "unset";
    resetButton.style.visibility = "unset";
};


//////////////////////////////////////////////////////////////////////////////// ATTACK BUTTON


attackButton.addEventListener('click', () => {
    attackButton.disabled = true;
    game.comparePlayerTurn();
    game.enemy.updateHealth();
    game.victory();

    setTimeout(function () {
        resDisplay.innerHTML = 'ENEMY TURN';
        resDisplay.style.color = 'black';
    }, 4000);

    setTimeout(function () {
        setTimeout(function () { })
        game.compareEnemyTurn();
        game.player.updateHealth();
        game.victory();
    }, 5000);

    setTimeout(function () {
        resDisplay.innerHTML = 'YOUR TURN';
        resDisplay.style.color = 'black';
        attackButton.disabled = false;
    }, 9000);
})

/////////////  ANIMATION

const rotate = function () {
    resDisplay.style.animation = 'rotate 3s';
}

const colorChange = function (){
    resDisplay.style.animation = "fade-in-and-out .75s"
}
///////////////////////////////////////////////////////////////////////////RESET 

function reset() {
    playerDropdown.style.visibility = "unset";
    attackButton.style.visibility = "hidden";
    resetButton.style.visibility = "hidden";
    console.log('restart');

    enemyNameDisplay.innerHTML = "";
    playerNameDisplay.innerHTML = "";
    document.querySelector('.player .healthleft').style.width = `100%`;
    document.querySelector('.enemy .healthleft').style.width = `100%`;
    resDisplay.innerHTML = "";
}

resetButton.addEventListener('click', reset);
