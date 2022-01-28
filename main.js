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

const attDamage = function(){
    let attVar = 0;
    return attVar + (Math.floor(Math.random * 5) + 1);
}

const defDamage = function(){
    let defVar = 0;
    if(player === DefEnemy || player === DefPlayer){
        return defVar + (Math.floor(Math.random * 7) + 1);
    } else if (player === MedEnemy || player === MedPlayer){
        return defVar + (Math.floor(Math.random * 6) + 1);
    } else {
        return defVar + (Math.floor(Math.random * 5) + 1);
    };
};

const compare = function(){
    if(defVar >= 5){
        console.log('BLOCKED!');
    } else if (combatAtt > combatDef){
        console.log('HIT');
        defHealth = defHealth - (combatAtt - combatDef);
    };
};