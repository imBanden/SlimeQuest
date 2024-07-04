//Sprite class
class Sprite{
    constructor({ position, imgSrc, frameRate = 1}){
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
        this.image.src = imgSrc
        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
    }

    draw(){
        if (!this.loaded)return
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0
            },
            width: this.width,
            height: this.height
        }
        c.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )

        this.currentFrame++

        if (this.currentFrame >= this.frameRate){
            this.currentFrame = 0;
        }
    }
}