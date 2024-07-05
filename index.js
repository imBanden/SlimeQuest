// getting the canvas ready
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64*16; //1024px
canvas.height = 64*9; //576px

// audio
// const audio = new Audio()
// audio.src = './audio/Surreal-Forest.mp3'
// audio.play()



// initialise new sprite and player and collisions
let collisionsData;
let sprite;
let door;
let player;
let currentLevel = 1;
let maxLevels = Object.keys(dataLevel).length
let enemiesData;
let levelDone = false
let radius = 1200


let tempX = 0;
let tempY = 0;
let newSize = 160 //160px
let tempWidth = 16
let tempHeight = 16
let justDied = false

function init(){
    enemiesData = []
    let level = dataLevel[currentLevel];
    collisionsData = level.collisionsData.parse2D().parseCollisions();
    sprite = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imgSrc: level.ImgSrc
    });
    door = new Door({
        position: {
            x: level.doorPosition.x,
            y: level.doorPosition.y
        },
        imgSrc: './img/door.png'
    });
    
    for (let enemy of level.enemies){
        enemiesData.push(new Enemy({
            collisionBlocks: collisionsData,
            position: {
                x: enemy.position.x,
                y: enemy.position.y
            },
            imgSrcRight: enemy.imgSrcRight,
            imgSrcLeft: enemy.imgSrcLeft
            
        }))
    };

    player = new Player({
        collisionBlocks: collisionsData,
        door: door,
        imgSrc: {
            right: './img/BlueSlimeIdleRight.png',
            left: './img/BlueSlimeIdleLeft.png',
            attack: {
                right: './img/BlueSlimeSwordRight.png',
                left: './img/BlueSlimeSwordLeft.png'
            }
        },
        frameRate: 1,
        position: {
            x: level.playerStartPosition.x,
            y: level.playerStartPosition.y
        },
        enemies: enemiesData
    });
}

// keypressed 
const keys = {
    up: {
        pressed: false
    },
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    attack: {
        pressed: false
    }
}


// animation function
function animate(){
    // function calls itself
    window.requestAnimationFrame(animate);

    // clear the canvas at each frame
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);  

    // draw the level
    sprite.draw()
    door.draw()

    // draw the game instruction at lv 1
    if (currentLevel === 1){
        c.font = '12px "Press Start 2P"';
        c.fillText('WASD for movement', 250, 40)
        c.fillText('Press W infront of the door to go next level', 250, 60)
        c.fillText('Avoid monster!', 250, 80)
        c.fillText('Press R to reset current level', 250, 100)
    }

    if (currentLevel === 4){
        c.font = '12px "Press Start 2P"';
        c.fillText('Thank you for playing this short game!', 250, 120)
        c.fillText('Enjoy the companionship of this cute piggy', 250, 140)
    }
    


    // draw the collisions
    collisionsData.forEach(function(collision){
        collision.draw()
    })

    
    
    // player movement and check for state of player
    if (player.state.damaged.duration === player.state.damaged.maxDuration){
        player.velocity.x = 0
        if (keys.right.pressed){
            player.velocity.x = player.speed
            player.currentImgSrc = player.imgSrc.right
            player.currentDir = player.attackBoxPosition.right
        }
        else if (keys.left.pressed){
            player.velocity.x = -player.speed
            player.currentImgSrc = player.imgSrc.left
            player.currentDir = player.attackBoxPosition.left
        }
        // if (keys.attack.pressed) player.currentImgSrc = player.imgSrc.attack.right
    }
    else if (player.state.damaged.duration === 0){
        player.state.damaged.duration = player.state.damaged.maxDuration
        player.state.damaged.tick = 0
    }
    

    // draw the player
    player.draw();
    player.update();

    // draw the enemies
    enemiesData.forEach(function(enemy){
        enemy.draw()
        enemy.update()
     
    })

    // player health logic
    if (playerData.currentHealth <= 0 && justDied === false){
        tempX = player.position.x
        tempY = player.position.y
        justDied = true
        // init()
        // playerData.currentHealth = playerData.maxHealth
    }

    if (justDied) whenDied()

    // level transition (very spaghetti now, need to clean up)
    if (levelDone && radius > 0){
        levelEndAnimation(radius)
        radius -= 25
    }
    if (levelDone && radius === 0){
        init()
        levelDone = false
    }

    if (!levelDone){
        levelEndAnimation(radius)
        radius += 25
    }
    if (radius > 1200){
        radius = 1200
    }
    
}

init();
animate();






