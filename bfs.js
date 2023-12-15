class BFS{
    constructor(res){
        this.dist = []
        this.prev = []
        this.visited = []
        
        this.dx = [-1, 1, 0, 0]
        this.dy = [0, 0, -1, 1]

        this.res = res

        for(let i = 0; i < this.res; i++){
            this.dist[i] = []
            this.prev[i] = []
            this.visited[i] = []
            for(let j = 0; j < this.res; j++){
                this.dist[i][j] = 0
                this.visited[i][j] = false;
                this.prev[i][j] = new Node(-1, -1)
            }
        }
    }

    isValid(x, y){
        return (x >= 0 && x < this.res && y >= 0 && y < this.res);
    }

    *bfs(world, startingNode, endNode){  // startingNode tem que ser do tipo Node
        const queue = [startingNode];
        var end = 0
        while (queue.length > 0) {
            const pos = queue.shift();
            
            world.terrain_status[pos.x][pos.y] = world.status['explorado']

            if (pos.x == endNode.x && pos.y == endNode.y){
                end = 1
                break
            } 

            if(!this.visited[pos.x][pos.y]){
                this.visited[pos.x][pos.y] = true;

                for(let i = 0; i < 4; i++){
                    const nx = pos.x + this.dx[i];
                    const ny = pos.y + this.dy[i];

                    if(this.isValid(nx, ny) && !this.visited[nx][ny] && world.terrain[nx][ny] != world.types["obstaculo"]){  //falta checar se nao eh um obstaculo
                        world.terrain_status[nx][ny] = world.status['borda']

                        queue.push(new Node(nx, ny));
                        this.prev[nx][ny] = new Node(pos.x, pos.y);
                        this.dist[nx][ny] = this.dist[pos.x][pos.y] + 1; //A distancia eh pra incrementar considerando o terreno?
                    }
                }
            }
            yield end
        }
        if (end == 0) end = -1
        yield end

    }


}