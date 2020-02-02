"use strict";
//global varibal 
let x;
let y;
//class of enemies 
class Enemy {
    constructor(initX, initY) {
        this.x = initX;
        this.y = initY;
        // generate a random speed of enemy 
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const speed = getRandomInt(75, 205);
        //  image of enemies
        this.sprite = 'images/enemy-bug.png';
        // update the enemy position
        this.update = function (dt) {
            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            // if enemy in valid right so move em right!
            if (this.x < 505) {
                this.x += speed * dt;
            }
            // if enemy reached most right of canvs, reset them 
            if (this.x >= 505) {
                this.x = initX - 101;
            }
        };
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
    }
}
//canvs close on page load, if open from previous game
document.getElementById('canvs-close').click();
// to play again
document.getElementById('play-again').addEventListener('click', function () {
    window.location.reload();
});
// player class - This class requires an update(), render() and
// a handleInput() method since we are letting the user
// control the player only.
// // player class 
class Player {
    constructor(initX, initY) {
        this.x = initX;
        this.y = initY;
        // image of player
        this.sprite = 'images/char-horn-girl.png';
        this.wonGame = false;
        this.update = function (dt) {
            // know player and enamy posotion
            for (let enemy of allEnemies) {
                let enemyX = enemy.x;
                let enemyY = enemy.y;
                if (
                    this.y === enemyY &&
                    (this.x < Math.ceil(enemyX) + (101 / 2) && this.x > Math.floor(enemyX) - (101 / 2))
                ) {
                    this.reset();
                }
            }
            // if player reached river it will be win
            if (this.y === -15) {
                this.wonGame = true;
                document.getElementById('canvs-link').click();
            }
        };
        // renders player image
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
        // movement of player
        this.handleInput = function (input) {
            //key up 
            if (input === 'up' && this.y > 0) {
                this.y -= 80;
            }
            //key down 
            else if (input === 'down' && this.y < 375) {
                this.y += 80;
            }
            //key left 
            else if (input === 'left' && this.x > 0) {
                this.x -= 101;
            }
            // key right 
            else if (input === 'right' && this.x < 400) {
                this.x += 101;
            }
        };
        // rest player when collision happen
        this.reset = function () {
            let startX = initX;
            let startY = initY;
            this.y = startY;
            this.x = startX;
        };
    }
}
// Player abject
const player = new Player(200, 385);
// enemy object
const enemy1 = new Enemy(0, 65);
const enemy2 = new Enemy(0, 145);
const enemy3 = new Enemy(0, 225);
//  enemys objects in an array 
const allEnemies = [enemy1, enemy2, enemy3];
// Listener function for key presses. Sends the keys to your
// Player.handleInput() method. Don't modify this!!!
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
