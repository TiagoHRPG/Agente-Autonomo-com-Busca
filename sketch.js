var time = 0;
var execute = 0;
// jkhidd 
var i = 0
var food;
var func_search;

function setup() {
  let canva_width = 864
  let canva_height = 864

  createCanvas(canva_width, canva_height);
  
  
  world = new World(canva_width, canva_height, 36)
  let agentI = int(random(world.res))
  let agentJ = int(random(world.res))
  while(world.terrain[agentI][agentJ] == world.types['obstaculo']){
    agentI = int(random(world.res))
    agentJ = int(random(world.res))
  }
  agent = new Agent(world.blockWidth, agentI, agentJ);

  let foodI = int(random(world.res))
  let foodJ = int(random(world.res))
  while(world.terrain[foodI][foodJ] == world.types['obstaculo']){
    foodI = int(random(world.res))
    foodJ = int(random(world.res))
  }
  food = new Node(foodI, foodJ)
  
  world.resetStatus()
  bfs = new BFS(world.res);
  dfs = new DFS(world.res)
  uniform = new Uniform(world.res)
  astar = new AStar(world.res)
  func_bfs = bfs.bfs(world, new Node(agent.pos.x, agent.pos.y), food)
  func_dfs = dfs.dfs(world, new Node(agent.pos.x, agent.pos.y), food)
  func_uniform = uniform.uniform(world, new Node(agent.pos.x, agent.pos.y), food)
  func_astar = astar.astar(world, new Node(agent.pos.x, agent.pos.y), food)
  func_search = func_bfs
}

function draw() {
  frameRate(1000)
  background(220);

  end = func_search.next()
  world.draw();

  fill(160, 32, 240);
  stroke(255, 255, 255);
  let pos_x = (food.x + 1/2) * world.blockWidth
  let pos_y = (food.y + 1/2) * world.blockWidth
  ellipse(pos_x, pos_y, agent.headSize, agent.headSize); 

  agent.draw(world);
  
}

