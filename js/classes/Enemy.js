// enemy class
class Enemy extends Sprite{
    constructor({ collisionBlocks = [], position, imgSrcRight, imgSrcLeft }){
        super({ imgSrc: imgSrcRight })
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 0.1
        this.gravity = 1
        this.collisionBlocks = collisionBlocks
        this.width = 16
        this.height = 16
        this.frame = 0
        this.movementTime = (getRandomInt(5) + 1)*100
        this.randomMovement = {
            0: 'idle',
            1: 'right',
            2: 'left'
        }
        this.imgSrcRight = imgSrcRight
        this.imgSrcLeft = imgSrcLeft
    }

    update(){
        // draw the enemy
        c.fillStyle = 'rgb(0, 255, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, 16, 16)

        // updates enemy's movement(function calls every 1-5s)
        if (this.frame === this.movementTime){
            this.movement()
            this.frame = 0
            this.movementTime = (getRandomInt(5) + 1)*100
        }

        // updates enemy's x position
        this.position.x += this.velocity.x

        this.HorizontalCollision()
        // updates enemy's y position
        this.velocity.y += this.gravity 
        this.position.y += this.velocity.y

        this.VerticalCollision()

        this.frame++
        
    }

    HorizontalCollision(){
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

    VerticalCollision(){

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
                        this.position.y = collisionBlock.position.y - this.height -0.01
                        break
                    }
                    if (this.velocity.y < 0){
                        this.velocity.y = 0
                        this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                        break
                    }
                }
        }
    }

    movement(){
        let movement = this.randomMovement[getRandomInt(3)]
        console.log(movement)
        
        if (movement === 'right'){
            this.velocity.x = this.speed
            this.image.src = this.imgSrcRight
        }
        else if (movement === 'left'){
            this.velocity.x = -this.speed
            this.image.src = this.imgSrcLeft
        }
        else {
            this.velocity.x = 0
        }
    }

}
