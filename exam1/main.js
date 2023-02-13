const randint = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
const clamp = (val, min, max) => Math.min(Math.max(min, val), max);
const html = (string) => {
    let t = document.createElement("div");
    t.innerHTML = string;
    return t.firstElementChild;
};

class GameController {
    battleLog;
    playerHealth;
    monsterHealth;
    actionsCard;
    gameOverInfo;
    damageRange;

    constructor(damageRange = { min: 5, max: 20 }) {
        this.damageRange = damageRange;
        this.monsterHealth = document.querySelector("#monster-health");
        this.playerHealth = document.querySelector("#player-health");
        this.battleLog = document.querySelector("#battle-log");
        this.actionsCard = document.querySelector(".actions");
        this.gameOverInfo = document.querySelector("#game-status .card--info");
        document
            .querySelectorAll(".action-btn")
            .forEach((btn) => btn.addEventListener("click", this.doAction.bind(this)));
    }

    opposite(type) {
        return type === "monster" ? "player" : "monster";
    }

    setHealth(type, value) {
        const health = type === "monster" ? this.monsterHealth : this.playerHealth;
        value = clamp(value, 0, 100);
        health.style.width = `${value}%`;
    }

    getHealth(type) {
        const health = type === "monster" ? this.monsterHealth : this.playerHealth;
        return parseInt(health.style.width);
    }

    logMessage(type, message, amount, isGain) {
        const who = type === "monster" ? `<span class="monster">Monster</span>` : `<span class="player">Player</span>`;
        const number = `<span class="${isGain ? "gain" : "loss"}">${amount}</span>`;
        return `${who} ${message} ${number}`;
    }

    doAction(event) {
        const btn = event.target;
        switch (btn.getAttribute("id")) {
            case "atk":
                this.doAttack("player");
                break;
            case "sp-atk":
                break;
            case "heal":
                break;
            case "give-up":
                break;
        }
    }

    doAttack(type) {
        const opponentType = this.opposite(type);
        const opponentHealth = this.getHealth(opponentType);
        const damage = randint(this.damageRange.min, this.damageRange.max);
        const message = this.logMessage(type, "attacks and deals", damage, false);
        this.setHealth(opponentType, opponentHealth - damage);
        this.battleLog.prepend(html(`<p>${message}</p>`));

        if (type === "player") this.doAttack("monster");
    }

    setGameStatus(status) {
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
        this.actionsCard.dataset.hidden = "true";
        this.gameOverInfo.textContent = info;
    }
}

controller = new GameController();
