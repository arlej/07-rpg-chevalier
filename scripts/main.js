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
const inputAttacker = document.querySelector("#attaquant");
const InputDefender = document.querySelector("#defenseur");


const heroBoxContainer = document.querySelector(".wrapper-hero-box");
const combatBoxContainer = document.querySelector(".wrapper-combat-box");
const addHeroBtn =  document.querySelector(".btn-add");

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
        const damage = this.strength;
        console.log(`${this.name} inflige ${damage} de dégâts à ${target.name}`);
    }
    magicAttack() {}
    takeDamages(amount) {
        this.life -= amount;
        console.log(`${this.name} a perdu ${amount} points de vie`)
    }
    isDead() {}
}

const heroes = [];

function resetForm(){
    inputName.value = "";
    inputStrength.value = "";
    inputSpellPower.value = "";
}

function displayHeroes(){
    heroBoxContainer.innerHTML = "";

    heroes.forEach((hero) =>{
        const heroBox = document.createElement("div");
        heroBox.classList.add("hero-box");
        heroBox.innerHTML = `<h3>${hero.name}</h3>
                                <p>💪 Force : ${hero.strength}</p>
                                <p>✨ Magie : ${hero.magic}</p>
                                <p>🔮 Mana : ${hero.mana}</p>
                                <p>❤️ Vie : ${hero.life}</p>
                                <div class="life"><div style="width:${hero.life}%"></div></div>`;
        heroBoxContainer.append(heroBox);
    })
}

addHeroBtn.addEventListener("click", function (e) {
    e.preventDefault();

        const heroName = inputName.value;
        const heroStrength = Number(inputStrength.value);
        const heroSpellPower = Number(inputSpellPower.value);

        if (heroName && heroStrength && heroSpellPower) {
            const newHero = new Hero(heroName, heroStrength, heroSpellPower);
            
            heroes.push(newHero);
            displayHeroes(newHero);
        }
        resetForm();
        console.log(heroes);
});


