// Player Class
class Player extends Sprite {
    constructor({ collisionBlocks = [], door, imgSrc, frameRate, position, enemies }){
        super({ imgSrc: imgSrc.right, frameRate })
        this.position = position

        this.width = 64
        this.height = 64
        this.sides = {
            bottom: this.position.y + this.height
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 3
        this.gravity = 1
        this.collisionBlocks = collisionBlocks
        this.imgSrc = imgSrc
        this.currentImgSrc = this.imgSrc.right
        this.door = door
        this.enemies = enemies
        this.state = {
            damaged: {
                tick: 0,
                duration: 20,
                maxDuration: 20
            }
        }
        this.heartImg = new Image()
        this.heartImg.src = './img/heart.png'
        this.attackBox = {
            width: 16,
            height: 16,
        }
        this.attackBoxPosition = {
            right: {
                x: this.position.x + this.width,
                y: this.position.y + this.height - this.attackBox.height
            },
            left: {
                x: this.position.x - this.attackBox.width,
                y: this.position.y + this.height - this.attackBox.height
            }
        }
        this.currentDir = this.attackBoxPosition.right
    }
    

    update(){
        this.attackBoxPosition = {
            right: {
                x: this.position.x + this.width,
                y: this.position.y + this.height - this.attackBox.height
            },
            left: {
                x: this.position.x - this.attackBox.width,
                y: this.position.y + this.height - this.attackBox.height
            }
        }


        c.fillStyle = 'rgba(255, 0 , 0, 0.5)'; 

        if(keys.right.pressed)c.fillRect(this.attackBoxPosition.right.x , this.attackBoxPosition.right.y, this.attackBox.width, this.attackBox.height);
        if(keys.left.pressed)c.fillRect(this.attackBoxPosition.left.x , this.attackBoxPosition.left.y, this.attackBox.width, this.attackBox.height);

        c.drawImage(this.heartImg, 16, 16, 16, 16)

        c.font = '16px serif'
        c.fillStyle = 'white'
        c.fillText(`${playerData.currentHealth}`, 48, 28)


        // updates the player's sprite
        this.image.src = this.currentImgSrc 

        // updates player's x position
        this.position.x += this.velocity.x

        // check for collision with blocks
        this.checkHorizontalCollision()

        // check if player collides with enemy
        this.enemyCollisionHorizontal()

        // check if player's weapon collides with enemy
        this.swordCollision()

        this.applyGravity()

        // this.hitbox = {
        //     position: {
        //         x: this.position.x + 8,
        //         y: this.position.y + 8
        //     },
        //     width: 16,
        //     height: 16
        // }

        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        this.checkVerticalCollision()

        this.state.damaged.duration = this.state.damaged.duration - this.state.damaged.tick

        
        
    }

    checkHorizontalCollision(){
        // checks for horizontal collisions
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            // checks for collisions
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.y + this.height >= collisionBlock.position.y){
                    if (this.velocity.x > 0){
                        this.position.x = collisionBlock.position.x - this.width -0.01
                        break
                    }
                    if (this.velocity.x < 0){
                        this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                        break
                    }
                }
        }
    }

    checkVerticalCollision(){
        // checks for vertical collisions
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            // checks for collisions
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.y + this.height >= collisionBlock.position.y){
                    if (this.velocity.y > 0){
                        this.velocity.y = 0
                        // const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = collisionBlock.position.y - this.height - 0.01
                        break
                    }
                    if (this.velocity.y < 0){
                        this.velocity.y = 0
                        // const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height -  + 0.01
                        break
                    }
                }
        }
    }

    checkInfrontOfDoor(){
        // checks if player infront of a door
        if (this.position.x >= this.door.position.x  &&
            this.position.x + this.width <= this.door.position.x + this.door.width &&
            this.position.y >= this.door.position.y &&
            this.position.y + this.height <= this.door.position.y + this.door.height &&
            player.velocity.y === 0){
                // if enter door, increase the current level but reset if level reaches maxLevels
                levelDone = true
                currentLevel++
                if (currentLevel > maxLevels){
                    currentLevel = 1
                }
                // init();
            }
    }

    enemyCollisionHorizontal(){
        // checks for horizontal collisions
        for (let i = 0; i < this.enemies.length; i++){
            const enemy = this.enemies[i]
            // checks for collisions
            if (this.position.x <= enemy.position.x + enemy.width &&
                this.position.x + this.width >= enemy.position.x &&
                this.position.y <= enemy.position.y + enemy.height &&
                this.position.y + this.height >= enemy.position.y){
                    if (this.position.x < enemy.position.x){
                        this.velocity.x = -3
                        this.position.x = enemy.position.x - this.width - 0.01
                    }
                    else {
                        this.velocity.x = 3
                        this.position.x = enemy.position.x + enemy.width + 0.01
                    }
                    playerData.currentHealth--
                    this.state.damaged.tick = 1
                    this.velocity.y = -10
                    break
            }
        }   
    }

    swordCollision(){
        // check for collision for all enemies
        for (let i = 0; i < this.enemies.length; i++){
            const enemy = this.enemies[i]
            // checks for collisions
            if (keys.attack.pressed){
                if (this.currentDir.x <= enemy.position.x + enemy.width &&
                    this.currentDir.x + this.attackBox.width >= enemy.position.x &&
                    this.currentDir.y <= enemy.position.y + enemy.height &&
                    this.currentDir.y + this.attackBox.height >= enemy.position.y){
                        console.log('die enemy')
                        if (this.position.x < enemy.position.x) enemy.velocity.x = 3
                        else enemy.velocity.x = -3
                        enemy.velocity.y = -10
                        break
                    }
            }
        }
    }

    applyGravity (){
        // updates player's y position
        this.velocity.y += this.gravity 
        this.position.y += this.velocity.y
    }
}
