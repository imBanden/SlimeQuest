// animation when level is complete or just started
function levelEndAnimation(radius) {
    const xCoordinate = player.position.x + 8
    const yCoordinate = player.position.y + 8
    const gradient = c.createRadialGradient(xCoordinate, yCoordinate, 0, xCoordinate, yCoordinate, radius);
    gradient.addColorStop(0, 'transparent'); // Center of the circle is transparent
    gradient.addColorStop(1, 'transparent'); // Color of the iris
    gradient.addColorStop(1, 'black'); // Outer color of the iris

    // Draw the iris
    c.fillStyle = gradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

}

// death animation/ game over
function whenDied(){

    zoom(newSize)
    translate (canvas.width/2 - newSize/2, canvas.height/2 - newSize/2)

    c.fillStyle = `rgba(0, 0, 0,${tempWidth/newSize})`
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.font = '64px serif'
    c.fillStyle = `rgba(255, 255, 255,${tempWidth/newSize})`
    c.fillText('Game Over', 364, 150)

    c.drawImage(player.image, tempX, tempY, tempWidth, tempHeight)
}

// zoom to what pixel (scale)
function zoom (scale){
    if (tempWidth < scale){
        tempWidth += 4
        tempHeight += 4
    }
    
}

// translate helper function i guess
function translate (finalX, finalY){
    const diffX = Math.floor(finalX - tempX)/10
    const diffY = Math.floor(finalY - tempY)/10
    if (diffX != 0 && diffY != 0){
        tempX += diffX
        tempY += diffY
    }

}