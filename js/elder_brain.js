const start_button = document.getElementById("start-button");
const select_button = document.getElementById("select-button");
const restart_button = document.getElementById("restart-button");

const input_player1 = document.getElementById("player1-name");
const input_player2 = document.getElementById("player2-name");

const preparation_section = document.getElementById("preparation");
const option_section = document.getElementById("options");
const results = document.getElementById("result");
const select_section = document.getElementById("select");
const battle_section = document.getElementById("battle");
const restart_section = document.getElementById("restart");
const result_section = document.getElementById("result-section");

const player1_info = document.getElementById("player1");
const player2_info = document.getElementById("player2");

const player1_name = document.getElementById("name1");
const player2_name = document.getElementById("name2");
const player1_hp = document.getElementById("hp1");
const player2_hp = document.getElementById("hp2");
const player1_hands = document.getElementById("hands1");
const player2_hands = document.getElementById("hands2");

class Player {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.hand = "";
    }
}

let hand_options;
let player1 = new Player("", 0);
let player2 = new Player("", 0);

//Rules of the game
//name: Name of the hand
//wins: Hands that are defeated by the current hand
let hands = [
    { name: "Rock", wins: ["Lizard", "Scissors"] },
    { name: "Paper", wins: ["Rock", "Spock"] },
    { name: "Scissors", wins: ["Paper", "Lizard"] },
    { name: "Lizard", wins: ["Spock", "Paper"] },
    { name: "Spock", wins: ["Scissors", "Rock"] }
];

function init_game() {
    start_button.addEventListener("click", start_battle);
    select_button.addEventListener("click", seclect_hand);
    restart_button.addEventListener("click", restart);
}

function start_battle() {

    //players
    let name1 = input_player1.value;
    let name2 = input_player2.value;

    if (name1 == "") { name1 = "Player"; }
    if (name2 == "") { name2 = "PC"; }

    player1 = new Player(name1, 5);
    player2 = new Player(name2, 5);

    player1_name.innerHTML = player1.name;
    player2_name.innerHTML = player2.name;
    player1_hp.innerHTML = player1.hp;
    player2_hp.innerHTML = player2.hp;

    //hands

    hands.forEach((hand) => {
        hand_options = `
        <input type="radio" name="hands" id="${hand.name}" class="radio-hands"/>
        <label class="label-hands" for="${hand.name}">
            <p class="hand-paragraph">${hand.name}</p>
        </label>
        `;
        option_section.innerHTML += hand_options;
    });

    //Manage displays
    preparation_section.style.display = "none";
    option_section.style.display = "flex";
    select_section.style.display = "flex";
    battle_section.style.display = "flex";
    results.style.display = "flex";
}

function seclect_hand() {

    hands.forEach((hand) => {
        hand_checked = document.getElementById(hand.name).checked;
        if (hand_checked) { 
            player1.hand = hand.name; 
        }
    });

    if (player1.hand != "") {
        select_PC_hand();
        update_info();
        combat();
    }
}

function update_info() {
    let player1_hand = document.createElement("p");
    let player2_hand = document.createElement("p");

    player1_hand.className = "hand-info";
    player2_hand.className = "hand-info";

    player1_hand.innerHTML = player1.hand;
    player2_hand.innerHTML = player2.hand;

    player1_hands.appendChild(player1_hand);
    player2_hands.appendChild(player2_hand);
}

function combat() {
    if (player1.hand == player2.hand) {
        results.innerHTML = "You tied";
        //alert("You tied");
    } else if (defeats(player1.hand, player2.hand)) {
        results.innerHTML = "You won";
        player2.hp--;
        player2_hp.innerHTML = player2.hp;
        //alert("You win");
    } else {
        results.innerHTML = "You lost";
        player1.hp--;
        player1_hp.innerHTML = player1.hp;
        //alert("You lost");
    }

    if (player1.hp == 0) {
        disable_buttons();
        results.innerHTML = "You lost, try again";
    } else if (player2.hp == 0) {
        disable_buttons();
        results.innerHTML = "You won, another round?";
    }
}

function disable_buttons() {
    select_button.disabled = true;
    restart_section.style.display = "flex"
}

function defeats(hand1, hand2) {
    let defeats = false;
    hands.forEach((hand) => {
        if (hand.name == hand1) {
            hand.wins.forEach((win) => {
                if (win == hand2) { defeats = true; }
            });
        }
    })
    return defeats;
}

function restart() {
    location.reload();
}

function select_PC_hand() {
    player2.hand = hands[rand(0, hands.length - 1)].name;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

init_game();