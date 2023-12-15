function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

var time = 0;
class Agent{
    constructor(headSize, x, y){
        this.headSize = headSize;
        this.pos = createVector(int(x), int(y)); // será o índice da matriz do mundo
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

    execute_path(){
        let i = 0
        while (i < 4){
            if (millis() - time >= 2000){
                print("here 1")
                if ( i % 2 == 0) this.move_unit(1,0)
                else this.move_unit(0, 1)
                time = millis()
                i += 1
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
    