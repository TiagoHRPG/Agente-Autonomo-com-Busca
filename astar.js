class AStar {
    constructor(res){
        this.res = res
        this.reset()
    }
    reset(){
        this.pqueue = new MinHeap()
        this.dist = []
        this.parent = []
        this.path = []
        this.totalCost = 0;
        for(let i = 0; i < this.res; i++){
            this.dist[i] = []
            this.parent[i] = []
            for(let j = 0; j < this.res; j++) {
                this.dist[i][j] = Infinity
                this.parent[i][j] = [-1, -1]
            }
        }
    }
    heuristic(i, j, objectiveI, objectiveJ, averageCost, curCost, objCost, isInSameTerrain){
        const dx = Math.abs(i - objectiveI)
        const dy = Math.abs(j - objectiveJ)
        const dist = Math.sqrt(dx * dx + dy * dy)
        let factor = 0
        factor = randomGaussian(3/ ((1/averageCost) + (1/curCost) + (1/objCost)))
        

        return dist * factor
    }
    *search(world, start, objective){
        /*
            O agente deve procurar o objetivo no mapa e retornar o caminho como uma lista de blocos [(i, j)...]
            A estratégia é de custo uniforme, ou seja, o agente deve escolher sempre expandir o nó com menor custo
        */
        this.reset()
        
        let startI = start.x
        let startJ = start.y
        this.pqueue.push(new PQNode([startI, startJ], 0))
        this.dist[startI][startJ] = 0   
        let end = 0
        while(!this.pqueue.empty()){
            let node = this.pqueue.pop()
            const cost = node.cost
            const [i, j] = node.value
            world.terrain_status[i][j] = world.status['atual']
        
            if (i == objective.x && j == objective.y){
                end = 1
                break
            }
           
            let neighbors = world.getNeighbors(i, j)
            for(let [ni, nj] of neighbors){
                const terrain = world.terrain[ni][nj]
        
                const nextCost = this.dist[i][j] + world.costs[terrain] 
                

                if(nextCost < this.dist[ni][nj]){
                    this.dist[ni][nj] = nextCost
                    this.parent[ni][nj] = [i, j]
                    const objTerrain = world.terrain[objective.x][objective.y]
                    const h = this.heuristic(ni, nj, objective.x, objective.y, 
                                             world.averageCost, 
                                             world.costs[terrain], world.costs[objTerrain],
                                             objTerrain == terrain)

                    
                    this.pqueue.push(new PQNode([ni, nj], this.dist[ni][nj] + h))
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
            this.totalCost += world.costs[world.terrain[i][j]]
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