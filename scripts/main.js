/* ========= EXERCICE - RPG Chevalier =====================
🧠 Briefing : RPG - Chevalier
Créer une classe JavaScript modélisant un personnage de jeu de rôle (RPG) appelé Chevalier, avec des méthodes pour attaquer, lancer un sort, utiliser une potion et recevoir des dégâts.

🔧 Compétences mobilisées
    - Création de classes et d’objets en JavaScript
    - Utilisation de méthodes conditionnelles (if, return)
    - Gestion d’état avec des propriétés (PV, mana, potions)
    - Interactions entre objets (ex: un chevalier en attaque un autre)

🧱 Étapes à suivre

1. Créer la classe Chevalier
    Propriétés :

    - name            Nom du chevalier (à entrer par l'utilisateur)
    - strength        Force physique utilisée pour l’attaque classique (à entrer par l'utilisateur)
    - magic           Puissance magique pour les attaques magiques (à entrer par l'utilisateur)
    - life            Points de vie (PV), commence à 100
    - mana            Points de magie, commence à 50
    - potions         Nombre de potions de soin (commence à 2)

2. Créer les méthodes de class suivantes : 

    - shout()             Le chevalier entre en scène et crie son nom (quand il est sélectionné pour un combat.
    - attack()            Attaque classique, retire des PV à la cible en fonction de la strength
    - magicAttack()       Attaque magique, consomme 20 de mana, inflige des dégâts à la cible égaux à magic
    - getDamages()        Réduit les PV du chevalier et affiche l’état de santé
    - usePotion()         Utilise une potion pour restaurer 30 PV, ne peux excéder 100
    - isDead()            Retourne true si la vie est à 0 ou moins

3. Afficher les choses côté HTML :

Là, c'est à vous de jouer ! :) J'ai imaginé ce petit "jeu" ce week-end et j'ai tout testé dans la console mais j'ai pas encore imaginé comment faire niveau HTML donc ici c'est quartier libre.
A vous d'imaginer comment tout cela va s'agencer :)
*/

const inputName = document.querySelector('#hero-name');
const inputStrength = document.querySelector("#hero-strength");
const inputSpellPower = document.querySelector("#hero-spell-power");
const selectAttacker = document.querySelector("#attaquant");
const selectDefender = document.querySelector("#defenseur");
const selectWeapon = document.querySelector("#weapon");
const btnAddHero = document.querySelector(".btn-add");
const btnAttack = document.querySelector(".btn-attack");
const btnPotion = document.querySelector(".btn-potion");

const heroBoxContainer = document.querySelector(".wrapper-hero-box");
const combatBoxContainer = document.querySelector(".wrapper-combat-box");

class Hero {
    constructor(name, strength, magic) {
        this.name = name;
        this.strength = strength;
        this.magic = magic;
        this.life = 100;
        this.mana = 50;
        this.potions = 0;
    }
    shout() {
        return `MY NAME IS ${this.name}!!!!`;
    }
    attack(target) {
        const damages = this.strength;
        console.log(`${this.name} inflige ${damages} de dégâts à ${target.name}`);
    }
    magicAttack(target) {
        const magicDamages = 20;
        this.mana -= magicDamages;
        console.log(`${this.name} inflige ${magicDamages} de dégats magiques à ${target.name}`);
        console.log(`${this.name} a perdu ${magicDamages} points de mana`);
        return magicDamages;
    }
    takeDamages(amount) {
        this.life -= amount;
        console.log(`${this.name} a perdu ${amount} points de vie`);
    }
    isDead() {
        return `${this.name} is dead`;
    }
}

const heroes = [];

function resetForm() {
    inputName.value = "";
    inputStrength.value = "";
    inputSpellPower.value = "";
}

function displayHeroes() {
    heroBoxContainer.innerHTML = "";

    heroes.forEach((hero) => {
        const heroBox = document.createElement("div");
        heroBox.classList.add("hero-box");
        heroBox.innerHTML = `<h3>${hero.name}</h3>
                                <p>💪 Force : ${hero.strength}</p>
                                <p>✨ Magie : ${hero.magic}</p>
                                <p>🔮 Mana : ${hero.mana}</p>
                                <p>❤️ Vie : ${hero.life}</p>
                                <div class="life"><div style="width:${hero.life}%"></div></div>`;
        heroBoxContainer.append(heroBox);
    });
}

// ====== ADD HEROES TO A & D ======================
function selectedHeroes() {
    selectAttacker.innerHTML = "";
    selectDefender.innerHTML = "";

    const selectedDefaultA = document.createElement("option");
    selectedDefaultA.textContent = "- Choisissez un attaquant";
    selectedDefaultA.selected = true;
    selectedDefaultA.disabled = true;

    const selectedDefaultD = document.createElement("option");
    selectedDefaultD.textContent = "- Choisissez un defenseur";
    selectedDefaultD.selected = true;
    selectedDefaultD.disabled = true;

    selectAttacker.append(selectedDefaultA);
    selectDefender.append(selectedDefaultD);

    heroes.forEach((hero, index) => {
        const selectedA = document.createElement("option");
        selectedA.value = index;
        selectedA.textContent = hero.name;

        const selectedD = document.createElement("option");
        selectedD.value = index;
        selectedD.textContent = hero.name;

        selectAttacker.append(selectedA);
        selectDefender.append(selectedD);
    });
}


// ======== ADD HERO ================
btnAddHero.addEventListener("click", function (e) {
    e.preventDefault();

    const heroName = inputName.value;
    const heroStrength = Number(inputStrength.value);
    const heroSpellPower = Number(inputSpellPower.value);

    if (heroName && heroStrength && heroSpellPower) {
        const newHero = new Hero(heroName, heroStrength, heroSpellPower);

        heroes.push(newHero);
        displayHeroes(newHero);
        selectedHeroes(newHero);
    }
    resetForm();
    console.log(heroes);
});

//  ======== ATTACK ! =================
btnAttack.addEventListener("click", function (e) {
    e.preventDefault();

    // récupère index de A & D
    const attackerIndex = Number(selectAttacker.value);
    const defenderIndex = Number(selectDefender.value);

    // intialise attacker & defender
    const attacker = heroes[attackerIndex];
    const defender = heroes[defenderIndex];

    const weapon = selectWeapon.value;

    if (attacker && defender && attacker != defender) {
        if (weapon === "sword") {
            attacker.attack(defender);
            defender.takeDamages(attacker.strength);
            if(defender.life <= 0){
                console.log(defender.isDead());
            }

            displayHeroes();
        } else if (weapon === "magic") {
            const damages = attacker.magicAttack(defender);
            defender.takeDamages(damages);
            attacker.mana -= 20;
            displayHeroes();
        }
    }
    console.log(attacker.shout());
    console.log(defender.shout());
});

// ========== USE PV POTION ==================
btnPotion.addEventListener("click", function (e) {
    e.preventDefault();

    const userIndex = Number(selectAttacker.value);
    const user = heroes[userIndex];

    user.life += 30;
    displayHeroes();
})