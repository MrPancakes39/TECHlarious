const randint = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
const clamp = (val, min, max) => Math.min(Math.max(min, val), max);
const html = (string) => {
    let t = document.createElement("div");
    t.innerHTML = string;
    return t.firstElementChild;
};

// `<span class="monster">Monster</span>`;
// `<span class="player">Player</span>`;
// `<span class="loss">12</span>`;
// `<span class="gain">17</span>`;

class GameController {
    battleLog;
    playerHealth;
    monsterHealth;

    constructor() {
        this.monsterHealth = document.querySelector("#monster-health");
        this.playerHealth = document.querySelector("#player-health");
        this.battleLog = document.querySelector("#battle-log");
        document.querySelectorAll(".action-btn").forEach((btn) => btn.addEventListener("click", this.doAction));
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

    doAction(event) {
        const btn = event.target;
        switch (btn.getAttribute("id")) {
            case "atk":
                break;
            case "sp-atk":
                break;
            case "heal":
                break;
            case "give-up":
                break;
        }
    }
}

controller = new GameController();
