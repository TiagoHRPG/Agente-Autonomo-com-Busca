class DFS{
    constructor(res){
        this.dist = []
        this.prev = []
        this.visited = []
        
        this.dx = [-1, 1, 0, 0]
        this.dy = [0, 0, -1, 1]

        for(let i = 0; i < res; i++){
            this.dist[i] = []
            this.prev[i] = []
            this.visited[i] = []
            for(let j = 0; j < res; j++){
                this.dist[i][j] = 0
                this.visited[i][j] = false;
                this.prev[i][j] = Node(-1, -1)
            }
        }
    }

    isValid(x, y){
        return (x >= 0 && x < res && y >= 0 && y < res);
    }

    dfs(startingNode){  // startingNode tem que ser do tipo Node
        const stack = [startingNode];

        while (stack.length > 0) {
            const pos = stack[-1]; // pegar a ultima posicao
            // tirar a borda do bloco

            if(!this.visited[pos.x][pos.y]){
                this.visited[pos.x][pos.y] = true;

                for(let i = 0; i < 4; i++){
                    const nx = pos.x + dx[i];
                    const ny = pos.y + dy[i];

                    if(this.isValid(nx, ny) && !this.visited[nx][ny]){  //falta checar se nao eh um obstaculo
                        //colocar a borda no bloco
                        stack.push(new node(nx, ny));
                        this.prev[nx][ny] = new node(pos.x, pos.y);
                        this.dist[nx][ny] = this.dist[pos.x][pos.y] + 1; //A distancia eh pra incrementar considerando o terreno?
                    }
                }
            }
        }
    }


}