/// <reference path="objects/button.ts" />

// Source file name: game.ts
// Author: Srinivasarao Chatala
// Last modified by: Srinivasarao Chatala
// Last modified date: 27/02/2015
// Description: This is the main game code that generates all of the graphics
//              and contains all of the funtionality
var canvas;
var stage;

// Game Objects
var game;
var background;
var spinButton;
var resetButton;
var betMaxButton;
var betTenButton;
var powerButton;
var tiles = [];
var tileContainers = [];

// Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

var jackpotTxt;
var creditsTxt;
var betTxt;
var winningsTxt;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function gameLoop() {
    stage.update(); // Refreshes our stage
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

// Event handlers
/*function spinButtonOut() {
spinButton.alpha = 1.0;
}
function spinButtonOver() {
spinButton.alpha = 0.5;
}*/
function spinReels() {
    if (playerMoney != 0 && playerBet != 0) {
        if (playerBet <= playerMoney) {
            playerMoney -= playerBet;
            spinResult = Reels();
            determineWinnings();
            tmnt = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

            for (var slot = 0; slot < slotContainer.length; slot++) {
                slotContainer[slot].removeAllChildren();
                icons[slot] = new createjs.Bitmap("assets/images/" + spinResult[slot] + ".png");
                slotContainer[slot].addChild(icons[slot]);
            }
            jackpotTxt.text = "$" + jackpot;
            creditsTxt.text = "$" + playerMoney;
        }
        else {
            playerBet = 0;
            betTxt.text = "$" + playerBet;
            winningsTxt.text = "Can't Bet";
        }
    }
}


//BET $10 BUTTON
function betOneButtonClicked() {
    if (playerBet >= playerMoney) {
        winningsTxt.text = "Not Enough";
    }
    else {
        playerBet += 1;
        betTxt.text = "$" + playerBet;
        winningsTxt.text = "";
    }
}
//BET MAX BUTTON (spins automatically when pressed
function betMaxButtonClicked() {
    playerBet = playerMoney;
    if (playerBet != 0) {
        playerMoney -= playerBet;
        spinResult = Reels();
        determineWinnings();
        tmnt = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

        for (var slot = 0; slot < slotContainer.length; slot++) {
            slotContainer[slot].removeAllChildren();
            icons[slot] = new createjs.Bitmap("assets/images/" + spinResult[slot] + ".png");
            slotContainer[slot].addChild(icons[slot]);
        }
        resetTally();
        jackpotTxt.text = "$" + jackpot;
        creditsTxt.text = "$" + playerMoney;
        betTxt.text = "$" + playerBet;
        winningsTxt.text = "$" + winnings;
        winnings = 0;
    }
    playerBet = 0;
}


//reset button event
function resetButtonClicked() {
    resetAll();
    for (var slot = 0; slot < slotContainer.length; slot++) {
        slotContainer[slot].removeAllChildren();
    }
    jackpotTxt.text = "$" + jackpot;
    creditsTxt.text = "$" + playerMoney;
    betTxt.text = "$" + playerBet;
    winningsTxt.text = "$" + winnings;
}
//Power button clicked
function powerButtonClicked() {
    window.open('', '_parent', '');
    window.close();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        } else if (bananas == 3) {
            winnings = playerBet * 20;
        } else if (oranges == 3) {
            winnings = playerBet * 30;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (bars == 3) {
            winnings = playerBet * 50;
        } else if (bells == 3) {
            winnings = playerBet * 75;
        } else if (sevens == 3) {
            winnings = playerBet * 100;
        } else if (grapes == 2) {
            winnings = playerBet * 2;
        } else if (bananas == 2) {
            winnings = playerBet * 2;
        } else if (oranges == 2) {
            winnings = playerBet * 3;
        } else if (cherries == 2) {
            winnings = playerBet * 4;
        } else if (bars == 2) {
            winnings = playerBet * 5;
        } else if (bells == 2) {
            winnings = playerBet * 10;
        } else if (sevens == 2) {
            winnings = playerBet * 20;
        } else {
            winnings = playerBet * 1;
        }

        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        // showWinMessage();
    } else {
        lossNumber++;
        //  showLossMessage();
    }
}

function createUI() {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background);

    // Spin Button
    spinButton = new objects.Button("assets/images/spinButton.png", 323, 376);
    game.addChild(spinButton.getImage());

    spinButton.getImage().addEventListener("click", spinReels);

    // Reset Button
    betMaxButton = new objects.Button("assets/images/betMaxButton.png", 200, 370);
    game.addChild(betMaxButton.getImage());

    betMaxButton.getImage().addEventListener("click", betMaxButtonClicked);

    // Bet One Button
    betOneButton = new objects.Button("assets/images/betOneButton.png", 150, 370);
    game.addChild(betOneButton.getImage());

    betOneButton.getImage().addEventListener("click", betOneButtonClicked);

    // Reset Button
    resetButton = new objects.Button("assets/images/resetButton.png", 80, 370);
    game.addChild(resetButton.getImage());

    resetButton.getImage().addEventListener("click", resetButtonClicked);

    // Power Button
    powerButton = new objects.Button("assets/images/powerButton.png", 70, 365);
    game.addChild(powerButton.getImage());

    powerButton.getImage().addEventListener("click", powerButtonClicked);

    jackpotTxt = new createjs.Text("$" + jackpot, "26px Arial", "#ffffff");
    game.addChild(jackpotTxt);
    jackpotTxt.x = 280;
    jackpotTxt.y = 22;

    creditsTxt = new createjs.Text("$" + playerMoney, "26px Arial", "#ffffff");
    game.addChild(creditsTxt);
    creditsTxt.x = 134;
    creditsTxt.y = 320;

    betTxt = new createjs.Text("$" + playerBet, "26px Arial", "#ffffff");
    game.addChild(betTxt);
    betTxt.x = 290;
    betTxt.y = 320;

    winningsTxt = new createjs.Text("$" + winnings, "26px Arial", "#ffffff");
    game.addChild(winningsTxt);
    winningsTxt.x = 215;
    winningsTxt.y = 376;
}

// Our Game Kicks off in here
function main() {
    // instantiate my game container
    game = new createjs.Container();
    game.x = 23;
    game.y = 6;

    // Create Slotmachine User Interface
    createUI();

    stage.addChild(game);
}
//# sourceMappingURL=game.js.map
