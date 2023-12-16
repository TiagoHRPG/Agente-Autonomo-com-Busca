var time = 0;
var execute = 0;

var i = 0
var food;
let dropdown;
var func_search;
var started = false;
var goToNext = false;
let button;

function setup() {
  let canva_width = 864
  let canva_height = 864

  createCanvas(canva_width, canva_height);
  
  
  world = new World(canva_width, canva_height, 18)
  resetAgent(world)
  resetFood(world)
  
  world.resetStatus()
   
  button = createButton('Regenerar');
  button.position(canva_width + 20, 40);
  //dropdown para selecao
  dropdown = createSelect();
  
  // Adicione opções ao dropdown
  dropdown.option('Selecione uma opção')
  dropdown.option('BFS');
  dropdown.option('DFS');
  dropdown.option('A*');
  dropdown.option('Guloso');
  dropdown.option('Custo uniforme');
  dropdown.selected('Selecione uma opção');
  
  dropdown.position(canva_width + 20, 10);
  dropdown.changed(selecionarOpcao);

  search_method = null

  func_search = null

  // trocar o nome das funções por search e chamar search_method.search
  //func_bfs = bfs.se(world, new Node(agent.pos.x, agent.pos.y), food)
  //func_dfs = dfs.dfs(world, new Node(agent.pos.x, agent.pos.y), food)
  //func_uniform = uniform.uniform(world, new Node(agent.pos.x, agent.pos.y), food)
  //func_astar = astar.astar(world, new Node(agent.pos.x, agent.pos.y), food)

}
function resetAgent(world){
  let agentI = int(random(world.res))
  let agentJ = int(random(world.res))
  while(world.terrain[agentI][agentJ] == world.types['obstaculo']){
    agentI = int(random(world.res))
    agentJ = int(random(world.res))
  }
  agent = new Agent(world.blockWidth, agentI, agentJ);

  
}
function resetFood(world){
  let foodI = int(random(world.res))
  let foodJ = int(random(world.res))
  while(world.terrain[foodI][foodJ] == world.types['obstaculo']){
    foodI = int(random(world.res))
    foodJ = int(random(world.res))
  }

  food = new Node(foodI, foodJ)
}
function selecionarOpcao() {
  // Essa função será chamada quando uma opção for selecionada
  let escolha = dropdown.value();
  print('Opção selecionada: ' + escolha);
  print("Started: " + started);
  if(started) return;
  if(escolha == 'BFS') search_method = new BFS(world.res);
  if(escolha == 'DFS') search_method = new DFS(world.res);
  if(escolha == 'A*') search_method = new AStar(world.res);
  if(escolha == 'Guloso') search_method = new Greedy(world.res);
  if(escolha == 'Custo uniforme') search_method = new Uniform(world.res);
  func_search = search_method.search(world, new Node(agent.pos.x, agent.pos.y), food);
  started = true;
  


}
function regenerate(){
  world.resetStatus()
  resetAgent(world)
  resetFood(world)
  dropdown.selected('Selecione uma opção');
  started = false;
}
function draw() {
  frameRate(1000)
  background(220);

  if (started){
    let end = func_search.next()

    //acontece uma vez
    if (end.value == 1){
      agent.path = search_method.path
      print(agent.path[0])
    }

    // acontece sempre depois do fim da busca
    if (end.done == 1){
      agent.execute_path(world);
    }
  }

  world.draw();


  draw_food()
  agent.draw(world);
  button.mousePressed(regenerate);
  
}

function draw_food(){
  fill(160, 32, 240);
  stroke(255, 255, 255);
  let pos_x = (food.x + 1/2) * world.blockWidth
  let pos_y = (food.y + 1/2) * world.blockWidth
  ellipse(pos_x, pos_y, agent.headSize, agent.headSize); 
}