window.addEventListener('keydown', function(event){

    switch (event.key) {
        case 'w':
            player.checkInfrontOfDoor()
            if (player.velocity.y ===0)player.velocity.y = -12
            break
        case 'a':
            keys.left.pressed = true
            break
        case 'd':
            keys.right.pressed = true
            break
        case 'r':
            init()
            break
        case 'j':
            keys.attack.pressed = true
            break
                
    }
})

window.addEventListener('keyup', function(event){

    switch (event.key) {
        case 'w':
            keys.up.pressed = false
            break
        case 'a':
            keys.left.pressed = false
            break
        case 'd':
            keys.right.pressed = false
            break
        case 'j':
            keys.attack.pressed = false
            break
                
    }
})