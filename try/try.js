const canvas = window.document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 594
let radius = 0
// let radius = 1500
let img = new Image()
img.src = './try.jpg'

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.drawImage(img, 0, 0, canvas.width, canvas.height)


    // c.fillStyle = 'rgba(0, 0, 0, 0.2)'
    // c.beginPath()
    // c.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI)
    // c.closePath()
    // c.fill();


    var gradient = c.createRadialGradient(canvas.width/2, canvas.height/2, 10, canvas.width/2, canvas.height/2, radius);
    gradient.addColorStop(0, 'transparent'); // Center of the circle is transparent
    gradient.addColorStop(1, 'transparent'); // Color of the iris
    gradient.addColorStop(1, 'black'); // Outer color of the iris
    
    // Draw the iris
    c.fillStyle = gradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // if (radius != 0){
        radius += 20
    // }
    // else {
    //     c.fillStyle = 'black'
    //     c.fillRect(0, 0, canvas.width, canvas.height)
    // }
}

animate()
