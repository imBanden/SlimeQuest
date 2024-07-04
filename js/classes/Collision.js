// Collision Blocks Class
class Collision{
    constructor({ position }){
        this.position = position

        this.width = 16 //16px according to tiled
        this.height = 16 //16px according to tiled
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.3)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}