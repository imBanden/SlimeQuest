const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 594

let img = new Image()
img.src = './BlueSlimeIdleRight.png'

let tempWidth = 16
let tempHeight = 16
let tempX = 800
let tempY = 400
let newSize = 160 //160pixels
let dead = false

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.drawImage(img, tempX, tempY, tempWidth, tempHeight)

    if (dead) whenDied()
    
}

animate()


// zoom to what pixel (scale)
function zoom (scale){
    if (tempWidth < 160){
        tempWidth += 4
        tempHeight += 4
    }
    
}

function translate (finalX, finalY){
    const diffX = Math.floor(finalX - tempX)/10
    const diffY = Math.floor(finalY - tempY)/10

    if (diffX != 0 && diffY != 0){
        tempX += diffX
        tempY += diffY
    }

}

function whenDied(){

    zoom(newSize)
    translate (canvas.width/2 - newSize/2, canvas.height/2 - newSize/2)

    c.fillStyle = `rgba(0, 0, 0,${tempWidth/newSize})`
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.font = '64px serif'
    c.fillStyle = `rgba(255, 255, 255,${tempWidth/newSize})`
    c.fillText('Game Over', 364, 150)

    c.drawImage(img, tempX, tempY, tempWidth, tempHeight)
}

addEventListener('keydown', function(event) {
    if (event.key === 'o'){
        dead = true
    }
})