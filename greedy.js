class GreedySearch {
    constructor(res, goal) {
        this.dist = [];
        this.prev = [];
        this.visited = [];

        this.dx = [-1, 1, 0, 0];
        this.dy = [0, 0, -1, 1];

        this.goal = goal;

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
        return x >= 0 && x < res && y >= 0 && y < res;
    }

    heuristic(x, y) {
        return Math.abs(x - this.goal.x) + Math.abs(y - this.goal.y);  // Manhattan distance
    }

    greedySearch(startingNode) {
        const priorityQueue = new PriorityQueue(); // Talvez trocar por uma ja implementada?

        priorityQueue.enqueue(startingNode, this.heuristic(startingNode.x, startingNode.y));

        while (!priorityQueue.isEmpty()) {
            const pos = priorityQueue.dequeue();

            if (!this.visited[pos.x][pos.y]) {
                this.visited[pos.x][pos.y] = true;

                for (let i = 0; i < 4; i++) {
                    const nx = pos.x + this.dx[i];
                    const ny = pos.y + this.dy[i];

                    if (this.isValid(nx, ny) && !this.visited[nx][ny]) {    // Faltar checar se eh obstaculo
                        const priority = this.heuristic(nx, ny);
                        priorityQueue.enqueue(new Node(nx, ny), priority);

                        this.prev[nx][ny] = new Node(pos.x, pos.y);
                        this.dist[nx][ny] = this.dist[pos.x][pos.y] + 1;
                    }
                }
            }
        }
    }
}
