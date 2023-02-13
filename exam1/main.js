const randint = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
const clamp = (val, min, max) => Math.min(Math.max(min, val), max);
const html = (string) => {
    let t = document.createElement("div");
    t.innerHTML = string;
    return t.firstElementChild;
};

// DOM
const battleLog = document.querySelector("#battle-log");
const playerHealth = document.querySelector("#player-health");
const monsterHealth = document.querySelector("#monster-health");
const actionsCard = document.querySelector(".actions");
const gameOverInfo = document.querySelector("#game-status .card--info");
const startOver = document.querySelector("#start-over");

class GameController {
    valueRange;
    specialValueRange;
    currentHeal = 3;

    constructor(valueRange = { min: 5, max: 20 }, specialValueRange = { min: 12, max: 25 }) {
        this.valueRange = valueRange;
        this.specialValueRange = specialValueRange;
        battleLog.innerHTML = "";
        this.setHealth("player", 100);
        this.setHealth("monster", 100);
        actionsCard.dataset.hidden = "false";
    }

    opposite(type) {
        return type === "monster" ? "player" : "monster";
    }

    setHealth(type, value) {
        const health = type === "monster" ? monsterHealth : playerHealth;
        value = clamp(value, 0, 100);
        health.style.width = `${value}%`;
    }

    getHealth(type) {
        const health = type === "monster" ? monsterHealth : playerHealth;
        return parseInt(health.style.width);
    }

    logMessage(type, message, amount, isGain) {
        const who = type === "monster" ? `<span class="monster">Monster</span>` : `<span class="player">Player</span>`;
        const number = `<span class="${isGain ? "gain" : "loss"}">${amount}</span>`;
        return `${who} ${message} ${number}`;
    }

    doAction(event) {
        const btn = event.target;
        let worked = false;
        switch (btn.getAttribute("id")) {
            case "atk":
                worked = this.doAttack("player");
                this.currentHeal = 3;
                break;
            case "sp-atk":
                worked = this.doSpecial();
                this.currentHeal = 3;
                break;
            case "heal":
                worked = this.doHeal();
                break;
            case "give-up":
                this.doGiveUp();
                break;
        }
        if (worked) {
            this.doAttack("monster");
            this.checkWinner();
        }
    }

    doAttack(type) {
        const opponentType = this.opposite(type);
        const opponentHealth = this.getHealth(opponentType);
        const damage = randint(this.valueRange.min, this.valueRange.max);
        const message = this.logMessage(type, "attacks and deals", damage, false);
        this.setHealth(opponentType, opponentHealth - damage);
        battleLog.prepend(html(`<p>${message}</p>`));
        return true;
    }

    doSpecial() {
        const currentPlayerHealth = this.getHealth("player");
        const currentMonsterHealth = this.getHealth("monster");
        const startOfGame = currentPlayerHealth === currentMonsterHealth && currentPlayerHealth === 100;
        const playerLess20 = currentPlayerHealth <= currentMonsterHealth - 20;
        if (startOfGame || playerLess20) {
            const damage = randint(this.specialValueRange.min, this.specialValueRange.max);
            const message = this.logMessage("player", "attacks and deals", damage, false);
            this.setHealth("monster", currentMonsterHealth - damage);
            battleLog.prepend(html(`<p>${message}</p>`));
            return true;
        }
        battleLog.prepend(html(`<p>You can't use the special attack, it's for emergencies.</p>`));
        return false;
    }

    doHeal() {
        const currentPlayerHealth = this.getHealth("player");
        if (currentPlayerHealth === 100) {
            battleLog.prepend(html(`<p>You are at a 100 health, already! You can't heal.</p>`));
            return false;
        }
        if (this.currentHeal) {
            this.currentHeal--;
            const health = randint(this.specialValueRange.min, this.specialValueRange.max);
            const message = this.logMessage("player", "heals themselves for", health, true);
            this.setHealth("player", currentPlayerHealth + health);
            battleLog.prepend(html(`<p>${message}</p>`));
            return true;
        }
        battleLog.prepend(html(`<p>You healed 3 times, already! Attack instead.</p>`));
        return false;
    }

    doGiveUp() {
        let response = prompt("Are you sure you want to give up? [y/N]:");
        response = response?.toLowerCase().trim();
        if (response === "yes" || response === "y") this.GameOver("lose");
    }

    GameOver(status) {
        let info = "";
        switch (status) {
            case "win":
                info = "You win!";
                break;
            case "lose":
                info = "You lost :(";
                break;
            case "draw":
                info = "It's a draw!";
                break;
        }
        actionsCard.dataset.hidden = "true";
        gameOverInfo.textContent = info;
    }

    checkWinner() {
        const currentPlayerHealth = this.getHealth("player");
        const currentMonsterHealth = this.getHealth("monster");
        if (currentPlayerHealth !== 0 && currentMonsterHealth !== 0) return;
        let status = currentPlayerHealth === currentMonsterHealth ? "draw" : currentPlayerHealth > 0 ? "win" : "lose";
        this.GameOver(status);
    }
}

controller = new GameController();

document
    .querySelectorAll(".action-btn")
    .forEach((btn) => btn.addEventListener("click", controller.doAction.bind(controller)));

startOver.addEventListener("click", () => (controller = new GameController()));
