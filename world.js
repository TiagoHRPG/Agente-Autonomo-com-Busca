class World{
    
    constructor(width, height, res){
        this.width  = width;
        this.heigth = height;
        this.res    = res;
        // Tamanho dos blocos da discretizacao
        this.blockWidth  = width / res
        this.blockHeight = height / res

        // Matriz de blocos
        this.terrain_status = []
        this.terrain = []
        this.types = {
            'areia'     : 0,
            'lama'      : 1,
            'agua'      : 2,
            'obstaculo' : 3
        }
        this.status = {
            'inexplorado' : 0,
            'borda'       : 1,
            'explorado'   : 2,
            'caminho'     : 3,
            'atual'       : 4
        }
        this.costs = {}
        this.costs[this.types['areia']] = 1
        this.costs[this.types['lama']]  = 5
        this.costs[this.types['agua']]  = 10
        this.costs[this.types['obstaculo']] = Infinity
        this.averageCost = 0;
        this.generateTerrain();
    }

    decideTerrain(val){
        if(val < 0.4) return this.types['areia'];
        else if(val < 0.5) return this.types['lama'];
        return this.types['agua'];
    }
    
    generateTerrain(){
        noiseSeed(random(1000));
        for(let i = 0; i < this.res; i++){
            const x = i * this.blockWidth;
            this.terrain[i] = [];
            for(let j = 0; j < this.res; j++){
                const y = j * this.blockHeight;
                this.terrain[i][j] = this.decideTerrain(noise(x * 0.005,  y * 0.005));
                this.averageCost += this.costs[this.terrain[i][j]];
            }
        }

        noiseSeed(random(100));
        for(let i = 0; i < this.res; i++){
            const x = i * this.blockWidth;
            for(let j = 0; j < this.res; j++){
                const y = j * this.blockHeight;
                
                if (noise(x * 0.05,  y * 0.05) < 0.33){
                    this.terrain[i][j] = this.types['obstaculo']
                    this.averageCost += 1;
                }
            }
        }
        this.averageCost /= (this.res * this.res);

    }
    getNeighbors(i, j){
        let neighbors = []
        if(i > 0) neighbors.push([i - 1, j])
        if(i < this.res - 1) neighbors.push([i + 1, j])
        if(j > 0) neighbors.push([i, j - 1])
        if(j < this.res - 1) neighbors.push([i, j + 1])
        return neighbors
    }
    resetStatus(){
        for(let i = 0; i < this.res; i++){
            this.terrain_status[i] = []
            for(let j = 0; j < this.res; j++){
                this.terrain_status[i][j] = this.status['inexplorado']
            }
        }
    }

    draw(){
        for(let i = 0; i < this.res; i++){
            for(let j = 0; j < this.res; j++){
                let val = this.terrain[i][j];
                let colorVal = map(val, 0, 1, 0, 255);
                
                let opacity
                if (this.terrain_status[i][j] == this.status['inexplorado']){
                    opacity = 255
                }else{
                    opacity = 150;
                }

                if (this.terrain_status[i][j] == this.status['borda']){
                    stroke(255, 0, 0)
                }
                else{
                    noStroke()
                }
                

                
                if(this.terrain_status[i][j] == this.status['atual']){
                    fill(color(255, 0, 0, opacity));
                }
                else if(val == this.types['areia']){
                    fill(color(194, 178, 128, opacity));
                }
                else if(val == this.types['lama']){
                    fill(color(112, 84, 62, opacity)); 
                }
                else if(val == this.types['agua']){
                    fill(color(30, 100, 255, opacity));
                }
                else if(val == this.types['obstaculo']){
                    fill(color(0, 0, 0, opacity));
                }
                const x = i * this.blockWidth;
                const y = j * this.blockHeight;
                

                rect(x, y, this.blockWidth, this.blockHeight)
                
                if (this.terrain_status[i][j] == this.status['caminho']){
                    push()
                    fill(color(0, 255, 0, 60));
                    rect(x, y, this.blockWidth, this.blockHeight)
                    fill(0, 0, 0, opacity)
                    textSize(this.blockHeight/2)
                    textAlign(CENTER, CENTER)
                    text(this.costs[this.terrain[i][j]], (i+1/2) * this.blockWidth, (j+1/2) * this.blockHeight)
                    pop()
                }
            }
        }
    }
}