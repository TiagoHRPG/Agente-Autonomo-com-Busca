function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

var time = 0;
var i = 1;
class Agent{
    constructor(headSize, x, y){
        this.headSize = headSize;
        this.originalPos = createVector(int(x), int(y)); // será o índice da matriz do mundo
        this.pos = createVector(int(x), int(y)); // será o índice da matriz do mundo
        i = 1;
        time = 0;
        this.path = []
    }


    move_unit(x, y){
        x = int(x)
        y = int(y)
        if (abs(x) > 1 || abs(y) > 1){
            print("Movimento inválido")
        }

        this.pos.x += x
        this.pos.y += y

    }

    move(x, y){
        x = int(x)
        y = int(y)
        if (abs(x - this.pos.x) > 1 || abs(y - this.pos.y) > 1){
            print("Movimento inválido")
        }

        this.pos.x = x
        this.pos.y = y

        print(this.pos.x, this.pos.y)

    }

    cost2time(cost){
        if (cost == 1) return 200
        if (cost == 5) return 700
        if (cost == 10) return 1200
    }

    execute_path(world){
        if (i < this.path.length){
            
            let cost = world.costs[world.terrain[this.path[i-1][0]][this.path[i-1][1]]]

            if (millis() - time >= this.cost2time(cost)){
                let [pos_x, pos_y] = this.path[i]
                this.move(pos_x, pos_y)
                i += 1

                time = millis()
            }
        }
        
    }


    draw(world) {

        // Desenha a cabeca
        fill(0, 255, 0); // Cor da cabeca (rosa claro) 
        stroke(255, 255, 255);
        strokeWeight(2);

        let pos_x = (this.pos.x  + 1/2) * world.blockWidth
        let pos_y = (this.pos.y  + 1/2) * world.blockWidth
        ellipse(pos_x, pos_y, this.headSize, this.headSize);

    }
    
}
    