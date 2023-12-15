class PQNode {
    constructor(value, cost){
        this.value = value
        this.cost = cost
    }
    valueOf(){
        return this.cost
    }
    toString(){
        return this.cost.toString()
    }
}

class Uniform {
    constructor(res){
        this.res = res
        this.reset()
    }
    reset(){
        this.pqueue = new MinHeap()
        this.dist = []
        this.parent = []
        this.path = []
        for(let i = 0; i < this.res; i++){
            this.dist[i] = []
            this.parent[i] = []
            for(let j = 0; j < this.res; j++) {
                this.dist[i][j] = Infinity
                this.parent[i][j] = [-1, -1]
            }
        }
    }
   
    *uniform(world, start, objective){
        /*
            O agente deve procurar o objetivo no mapa e retornar o caminho como uma lista de blocos [(i, j)...]
            A estratégia é de custo uniforme, ou seja, o agente deve escolher sempre expandir o nó com menor custo
        */
        let startI = start.x
        let startJ = start.y
        print(startI, startJ)
        this.pqueue.push(new PQNode([startI, startJ], 0))
        this.dist[startI][startJ] = 0   
        let end = 0
        while(!this.pqueue.empty()){
            let node = this.pqueue.pop()
            const cost = node.cost
            const [i, j] = node.value
            world.terrain_status[i][j] = world.status['atual']
            if(cost > this.dist[i][j]){
                world.terrain_status[i][j] = world.status['explorado']
                continue
            }
            if (i == objective.x && j == objective.y){
                end = 1
                break
            }
           
            let neighbors = world.getNeighbors(i, j)
            for(let [ni, nj] of neighbors){
                const terrain = world.terrain[ni][nj]
                if(this.dist[i][j] + world.costs[terrain] < this.dist[ni][nj]){
                    this.dist[ni][nj] = this.dist[i][j] + world.costs[terrain]
                    this.parent[ni][nj] = [i, j]
                    this.pqueue.push(new PQNode([ni, nj], this.dist[ni][nj]))
                    world.terrain_status[ni][nj] = world.status['borda']
                }
            }
            
            yield end
            world.terrain_status[i][j] = world.status['explorado']
        }
        if (end == 0) end = -1
        let path = []
        let [i, j] = [objective.x, objective.y]
        while(i != -1 && j != -1){
            path.push([i, j])
            let [pi, pj] = this.parent[i][j]
            i = pi
            j = pj
        }
        this.path = path.reverse()     
        for (let [i, j] of this.path){
            world.terrain_status[i][j] = world.status['caminho']
        } 
        yield end  
    }
}