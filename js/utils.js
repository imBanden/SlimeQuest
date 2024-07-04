//utils to parse tiled data into 2D array then into colissions array that calls the class Collisions
Array.prototype.parse2D = function(){
    const parsed2DData = []
    let blockNumbersinWidth = 64 //number of max block on canvas width
    for (let i = 0; i < this.length; i+= blockNumbersinWidth){
        parsed2DData.push(this.slice(i, i + blockNumbersinWidth))
    }

    return parsed2DData;
}

Array.prototype.parseCollisions = function(){
    const object = [];
    const collisionWidth = 16; //width of each collision block, 16px x 16px
    this.forEach(function(row, y){
        row.forEach(function(col, x){
            if (col != 0)object.push(new Collision({position:{
                x: x * collisionWidth,
                y: y * collisionWidth
            }}))
        })
    });

    return object;
}

// gets a random number up to the variable 'max'
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
