const start_button = document.getElementById("start-button");
const select_button = document.getElementById("select-button");
const restart_button = document.getElementById("restart-button");

const input_player1 = document.getElementById("player1-name");
const input_player2 = document.getElementById("player2-name");

const option_section = document.getElementById("options");
const results = document.getElementById("result");

const player1_info = document.getElementById("player1");
const player2_info = document.getElementById("player2");

const player1_name = document.getElementById("name1");
const player2_name = document.getElementById("name2");
const player1_hp = document.getElementById("hp1");
const player2_hp = document.getElementById("hp2");

class Player{
    constructor(name, hp){
        this.name = name;
        this.hp = hp;
        this.hand = "";
    }
}

let hand_options;
let player1 = new Player("", 0);
let player2 = new Player("", 0);

let hands = [
    {name: "Rock", wins: ["Lizard", "Scissors"]},
    {name: "Paper", wins: ["Rock", "Spock"]},
    {name: "Scissors", wins: ["Paper", "Lizard"]},
    {name: "Lizard", wins: ["Spock", "Paper"]},
    {name: "Spock", wins: ["Scissors", "Rock"]}
];

function init_game(){
    start_button.addEventListener("click", start_battle);
    select_button.addEventListener("click", seclect_hand);
    restart_button.addEventListener("click", restart);
}

function start_battle(){

    //players
    let name1 = input_player1.value;
    let name2 = input_player2.value;

    if(name1 == ""){name1 = "Player";}
    if(name2 == ""){name2 = "PC";}

    player1 = new Player(name1, 5);
    player2 = new Player(name2, 5);

    player1_name.innerHTML = player1.name;
    player2_name.innerHTML = player2.name;
    player1_hp.innerHTML = player1.hp;
    player2_hp.innerHTML = player2.hp;

    //hands

    hands.forEach((hand) => {
        hand_options = `
        <input type="radio" name="hands" id="${hand.name}"/>
        <label for="${hand.name}">
            <p>${hand.name}</p>
        </label>
        `;
        option_section.innerHTML += hand_options;
    })
}

function seclect_hand(){
    
}

function restart(){
    location.reload();
}

init_game();