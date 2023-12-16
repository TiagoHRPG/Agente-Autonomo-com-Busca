class Greedy {
    constructor(res) {
        this.dist = [];
        this.prev = [];
        this.visited = [];
        this.res = res;
        this.dx = [-1, 1, 0, 0];
        this.dy = [0, 0, -1, 1];
        this.path = [];

        for (let i = 0; i < res; i++) {
            this.dist[i] = [];
            this.prev[i] = [];
            this.visited[i] = [];
            for (let j = 0; j < res; j++) {
                this.dist[i][j] = 0;
                this.visited[i][j] = false;
                this.prev[i][j] = new Node(-1, -1);
            }
        }
    }

    isValid(x, y) {
        return x >= 0 && x < this.res && y >= 0 && y < this.res;
    }

    heuristic(x, y) {
        return Math.abs(x - this.goal.x) + Math.abs(y - this.goal.y);  // Manhattan distance
    }

    *search(world, startingNode, goal) {
        this.goal = goal;

        const priorityQueue = new PriorityQueue(); // Talvez trocar por uma ja implementada?

        priorityQueue.enqueue(startingNode, this.heuristic(startingNode.x, startingNode.y));

        while (!priorityQueue.isEmpty()) {
            const pos = priorityQueue.dequeue();
            if(pos.x == goal.x && pos.y == goal.y) break;
            if (!this.visited[pos.x][pos.y]) {
                this.visited[pos.x][pos.y] = true;
                world.terrain_status[pos.x][pos.y] = world.status['explorado'];

                for (let i = 0; i < 4; i++) {
                    const nx = pos.x + this.dx[i];
                    const ny = pos.y + this.dy[i];

                    if (this.isValid(nx, ny) && !this.visited[nx][ny] && world.terrain[nx][ny] != world.types['obstaculo']) {    
                        const priority = this.heuristic(nx, ny);
                        priorityQueue.enqueue(new Node(nx, ny), priority);
                        world.terrain_status[nx][ny] = world.status['borda'];
                        
                        this.prev[nx][ny] = new Node(pos.x, pos.y);
                        this.dist[nx][ny] = this.dist[pos.x][pos.y] + 1;
                    }
                }
            }
            yield 0
        }
        let path = []
        let [i, j] = [goal.x, goal.y]
        while(i != -1 && j != -1){
            path.push([i, j])
            let [pi, pj] = [this.prev[i][j].x, this.prev[i][j].y]
            this.totalCost += world.costs[world.terrain[i][j]]
            i = pi
            j = pj
        }
        this.path = path.reverse()     
        for (let [i, j] of this.path){
            world.terrain_status[i][j] = world.status['caminho']
        } 

        yield 1
    }
}
