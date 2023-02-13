const randint = (min, max) => {
    Math.random() * (max - min) + min;
};

// `<span class="monster">Monster</span>`;
// `<span class="player">Player</span>`;
// `<span class="loss">12</span>`;
// `<span class="gain">17</span>`;

class GameController {
    #battleLog;

    constructor() {
        this.#battleLog = document.querySelector("#battle-log");
        document.querySelectorAll(".action-btn").forEach((btn) => btn.addEventListener("click", this.#doAction));
    }

    #doAction(event) {
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
