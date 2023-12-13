class World{
    
    constructor(width, height, res){
        this.width  = width;
        this.heigth = height;
        this.res    = res;
        // Tamanho dos blocos da discretizacao
        this.blockWidth  = width / res
        this.blockHeight = height / res

        // Matriz de blocos
        this.terrain = []
        this.types = {
            'areia'     : 0,
            'lama'      : 1,
            'agua'      : 2,
            'obstaculo' : 3
        }
        this.generateTerrain();
    }

    decideTerrain(val){
        if(val < 0.25) return this.types['obstaculo'];
        else if(val < 0.4) return this.types['areia'];
        else if(val < 0.5) return this.types['lama'];
        return this.types['agua'];
    }
    
    generateTerrain(){
        noiseSeed(random(1000));
        for(let i = 0; i < this.res; i++){
            const x = (i + 1) * this.blockWidth;
            this.terrain[i] = [];
            for(let j = 0; j < this.res; j++){
                const y = (j + 1) * this.blockHeight;
                this.terrain[i][j] = this.decideTerrain(noise(x * 0.005,  y * 0.005));
            }
        }
    }

    draw(){
        for(let i = 0; i < this.res; i++){
            for(let j = 0; j < this.res; j++){
                let val = this.terrain[i][j];
                let colorVal = map(val, 0, 1, 0, 255);
                
                if(val == this.types['areia']){
                    fill(color(194, 178, 128));
                }
                else if(val == this.types['lama']){
                    fill(color(112, 84, 62)); 
                }
                else if(val == this.types['agua']){
                    fill(color(30, 100, 255));
                }
                else if(val == this.types['obstaculo']){
                    fill(color(0, 0, 0));
                }
                const x = (i + 1) * this.blockWidth;
                const y = (j + 1) * this.blockHeight;

                noStroke();
                rect(x, y, this.blockWidth, this.blockHeight)
            }
        }
    }
}