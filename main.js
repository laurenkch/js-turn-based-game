//////////////////////////////////////////////////////////////////////////////// CONSTANTS

const playerNameDisplay = document.querySelector('.player h2');
const enemyNameDisplay = document.querySelector('.enemy h2')
const playerButton = document.querySelectorAll('.dropdown-item');
const attackButton = document.querySelector('.attackButton');
const startButton = document.querySelector('.startButton');
const playerDropdown = document.querySelector('.dropdown-toggle');
const resDisplay = document.querySelector('.resDisplay');
const resetButton = document.querySelector('.resetButton');
const playerImage = document.querySelector('.player .image img');
const enemyImage = document.querySelector('.enemy .image img');
const characters = ['Monkey with a stick', 'Cougar', 'Turtle'];


startButton.style.visibility = "hidden";
attackButton.style.visibility = "hidden";
resetButton.style.visibility = "hidden";

const enemies = ['AttEnemy', 'DefEnemy', 'MedEnemy'];
let game = {};
let character = "";
let isReset = false;
let playerCount = 0;
let enemyCount = 0

///////////////////////////////////////////////////////////// SOUND CONSTRUCTOR

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


//////////////////////////////////////////////////////////////////////////////// CLASSES


class Character {
    constructor(name, health, attack, defense, attVar, defVar) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.attVar = attVar;
        this.defVar = defVar;
    }
    get healthLeft() {
        return `${this.health}%`;
    }

    updateHealth = function () {
        if (this.health > 0) {
            this.healthBar.style.width = this.healthLeft;
            this.healthStats.textContent = `${this.health}/100`;
        } else {
            this.healthBar.style.width = `0%`;
        }
    }

}

class Player extends Character {
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.healthBar = document.querySelector('.player .healthleft');
        this.healthStats = document.querySelector('.player p');
    }
}

class MedPlayer extends Player {
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.name = 'Monkey with a stick';
        this.health = 100;
        this.attack = 15;
        this.defense = 10;
        this.attVar = 5;
        this.defVar = 6;
    }
}

class DefPlayer extends Player {
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
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
        this.healthBar = document.querySelector('.enemy .healthleft');
        this.healthStats = document.querySelector('.enemy p');
        this.image = "./images/zookeeper1.png"
    }
}

class MedEnemy extends Enemy {
    constructor(name, health, attack, defense, attVar, defVar) {
        super(name, health, attack, defense, attVar, defVar);
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
        this.player.healthStats.innerHTML = `100/100`
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
        this.enemy.healthStats.innerHTML = `100/100`;
        enemyImage.src = `${this.enemy.image}`;
    }

    attVarResult() {
        playerCount += 1;
        if (enemyCount === 6){
            enemyCount = Math.floor((Math.random() * 3) + 1);
        } else if (playerCount === 5) {
            return Math.floor((Math.random() * (this.player.attVar + 5)) + 1);
        } else {
            return Math.floor((Math.random() * this.player.attVar) + 1);
        }
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
            setTimeout(function () {
                resDisplay.style.animation = 'none';
            }, 750)
            return this.enemy.defense + 100
        } else {
            return this.enemy.defense - (defResultEn);
        }
    }

    comparePlayerTurn() {
        let attackDamP = game.attDamage();
        let defDamEn = game.defDamage();
        if (attackDamP > defDamEn) {
            if (playerCount === 5) {
                resDisplay.innerHTML = 'SPECIAL ATTACK!!!!!';
            } else {
                resDisplay.innerHTML = 'DAMAGE!!!!!';
            }
           
            resDisplay.innerHTML += `<br>-${attackDamP - defDamEn}`;
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function () {
                resDisplay.style.animation = 'none';
            }, 750)
            this.enemy.health = this.enemy.health - (attackDamP - defDamEn);
        }
    }

    attVarResEnemy() {
        enemyCount += 1;
        if (enemyCount === 6){
            enemyCount = Math.floor((Math.random() * 3) + 1);
        } else if (enemyCount === 5) {
            return Math.floor((Math.random() * (this.enemy.attVar + 5)) + 1);
        } else {
            return Math.floor((Math.random() * this.enemy.attVar) + 1);
        }
    }

    defVarResEnemy() {
        return Math.floor((Math.random() * this.player.defVar) + 1);
    }

    attDamEnemy() {
        return this.enemy.attack + game.attVarResEnemy();
    }

    defDamEnemy() {
        let defResultP = game.defVarResEnemy();
        if (defResultP >= 5) {
            resDisplay.innerHTML = 'BLOCKED!!!!!';
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function () {
                resDisplay.style.animation = 'none';
            }, 750)
            return this.player.defense + 100;
        } else {
            return this.player.defense - (defResultP);
        }
    }

    compareEnemyTurn() {
        let attackDamEn = game.attDamEnemy();
        let defDamP = game.defDamEnemy();
        if (attackDamEn > defDamP) {
            if (enemyCount === 5) {
                resDisplay.innerHTML = 'SPECIAL ATTACK!!!!!';
            } else {
                resDisplay.innerHTML = 'DAMAGE!!!!!';
            }

            resDisplay.innerHTML += `<br>-${attackDamEn - defDamP}`;
            resDisplay.style.color = 'red';
            colorChange();
            setTimeout(function () {
                resDisplay.style.animation = 'none';
            }, 750)
            this.player.health = this.player.health - (attackDamEn - defDamP);
        }
    }

    victory() {
        if (this.player.health <= 0) {
            resDisplay.innerHTML = 'You lost! The zookeeper places you back in your cage.';
            let loseSound = new Sound(`./sounds/270329__littlerobotsoundfactory__jingle - lose - 00.wav`)
            loseSound.play();
        } else if (this.enemy.health <= 0) {
            resDisplay.innerHTML = "Congratulations. You escaped the zoo";
        }
    }
}

playerButton.forEach(button => button.addEventListener('click', function (event) {
    character = event.target.value;
    if (character === 'Random') {
        character = characters[Math.floor(Math.random() * characters.length)];
    };
    playerNameDisplay.innerHTML = character;
    startButton.style.visibility = 'unset';
    if (character === 'Cougar') {
        playerImage.src = './images/cougar.png';
    } else if (character === 'Turtle') {
        playerImage.src = './images/turtle.png';
    } else {
        playerImage.src = './images/monkey.png';
    }
}));

//////////////////////////////////////////////////////////////////////////////// START BUTTON

startButton.addEventListener("click", function () {
    start();
    startButton.style.visibility = "hidden";
    playerDropdown.style.visibility = "hidden";
    resDisplay.innerHTML = 'FIGHT!!!!!';
    rotate();
    setTimeout(function () {
        resDisplay.style.animation = 'none';
    }, 3000)

});

function start() {
    isReset = false;
    attackButton.disabled = false;
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
        if (isReset === false) {
            resDisplay.innerHTML = 'ENEMY TURN';
            resDisplay.style.color = 'black';
        };
    }, 4000);

    setTimeout(function () {
        if (isReset === false) {
            setTimeout(function () { })
            let zookeeperSwing = new Sound(`./sounds/394441__inspectorj__bamboo-swing-a6.wav`);
            zookeeperSwing.play();
            game.compareEnemyTurn();
            loseSound.play();
            game.player.updateHealth();
            game.victory();
        };
    }, 5000);

    setTimeout(function () {
        if (isReset === false) {
            resDisplay.innerHTML = 'YOUR TURN';
            resDisplay.style.color = 'black';
            attackButton.disabled = false;
        };
    }, 9000);
})

/////////////  ANIMATION

const rotate = function () {
    resDisplay.style.animation = 'rotate 3s';
}

const colorChange = function () {
    resDisplay.style.animation = "fade-in-and-out .75s"
}

///////////////////////////////////////////////////////////////////////////RESET 

function reset() {
    playerDropdown.style.visibility = "unset";
    attackButton.style.visibility = "hidden";
    resetButton.style.visibility = "hidden";
    enemyNameDisplay.innerHTML = "";
    playerNameDisplay.innerHTML = "";

    document.querySelector('.player .healthleft').style.width = `100%`;
    document.querySelector('.enemy .healthleft').style.width = `100%`;

    document.querySelector('.player p').innerHTML = "";
    document.querySelector('.enemy p').innerHTML = "";

    playerImage.src = "";
    enemyImage.src = "";
    resDisplay.innerHTML = "";
    isReset = true;
}

resetButton.addEventListener('click', reset);



