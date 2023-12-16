var time = 0;
var execute = 0;

var i = 0
var food;
let dropdown;
var func_search;
var started = false;
var goToNext = false;
let buttonReset;
let buttonRetry;
var foodCounter = 0;
var animationEnd = 0;
var method_cost = {};
var method_time = {};
var escolha;

function setup() {
  let canva_width = 864
  let canva_height = 864

  createCanvas(canva_width + 200, canva_height);
  
  
  world = new World(canva_width, canva_height, 72)
  resetAgent(world)
  resetFood(world)
  
  world.resetStatus()
  
  buttonRetry = createButton('Tentar novamente');
  buttonRetry.position(canva_width + 20, 40);
  buttonReset = createButton('Regenerar');
  buttonReset.position(canva_width + 20, 70);
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
  method_cost = {
    'BFS':            -1,
    'DFS':            -1,
    'A*':             -1,
    'Guloso':         -1,
    'Custo uniforme': -1
  }
  method_time = {
    'BFS':            0,
    'DFS':            0,
    'A*':             0,
    'Guloso':         0,
    'Custo uniforme': 0
  }
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
  if(started) return;
  escolha = dropdown.value();
  print('Opção selecionada: ' + escolha);
  print("Started: " + started);
  
  if(escolha == 'BFS') search_method = new BFS(world.res);
  if(escolha == 'DFS') search_method = new DFS(world.res);
  if(escolha == 'A*') search_method = new AStar(world.res);
  if(escolha == 'Guloso') search_method = new Greedy(world.res);
  if(escolha == 'Custo uniforme') search_method = new Uniform(world.res);
  func_search = search_method.search(world, new Node(agent.pos.x, agent.pos.y), food);
  started = true;
  method_cost[escolha] = -1
  method_time[escolha] = 0

}
function regenerate(){
  world.resetStatus()
  resetAgent(world)
  resetFood(world)
  dropdown.selected('Selecione uma opção');
  started = false;
  method_cost = {
    'BFS':            -1,
    'DFS':            -1,
    'A*':             -1,
    'Guloso':         -1,
    'Custo uniforme': -1
  }
  method_time = {
    'BFS':            0,
    'DFS':            0,
    'A*':             0,
    'Guloso':         0,
    'Custo uniforme': 0
  }
}
function retry(){
  world.resetStatus()
  agent = new Agent(world.blockWidth, agent.originalPos.x, agent.originalPos.y);

  dropdown.selected('Selecione uma opção');
  started = false;
  
}
function draw() {
  frameRate(1000)
  background(220);

  if (started){
    let end = func_search.next()
    if(end.value == 0){
      method_time[escolha] += 1
    }
    //acontece uma vez
    if (end.value == 1){
      agent.path = search_method.path
      print(agent.path[0])
      animationEnd = 0;
      method_cost[escolha] = search_method.totalCost
      
    }
  

    // acontece sempre depois do fim da busca
    if (end.done == 1){
      agent.execute_path(world);
      if(agent.pos.x == food.x && agent.pos.y == food.y && animationEnd == 0){
        foodCounter += 1;
        animationEnd = 1;
      }
    }
  }

  world.draw();


  draw_food()
  agent.draw(world);
  buttonReset.mousePressed(regenerate);
  buttonRetry.mousePressed(retry);
  drawCounter();
  drawTable();
}
function drawCounter(){
  let textString = 'Comidas coletadas: ' + foodCounter;
  textSize(18)
  textAlign(CENTER, CENTER)
  print(textString, textWidth(textString))
  
  fill(255, 255, 255);
  stroke(0, 0, 0)
  rect(width - 190, 100, textWidth(textString) + 20, 40);
  fill(0, 0, 0);
  noStroke()
  text(textString, width - 190, 100, textWidth(textString) + 20, 40);
}
function drawTable(){
  const names = ['BFS', 'DFS', 'A*', 'Guloso', 'Custo uniforme'];
  let height = 0;

  let textString = 'Algoritmo: Energia, Iterações';
  height += textWidth('      ')
  textSize(11)
  fill(255, 255, 255);
  stroke(0, 0, 0)
  rect(width - 190, 150, textWidth(textString) + 20, height * (names.length + 1) + 20);
  fill(0, 0, 0);
  noStroke()
  textAlign(CENTER, CENTER)
  text(textString, width - 103, 170);
  let i = 2;
  for(let name of names){
    fill(0, 0, 0);
    noStroke()
    textAlign(LEFT, LEFT)
    textSize(13)
    
    let textString = name + ' :\t' + method_cost[name] + ', ' + method_time[name];

    
    text(textString, width - 180, 150 + height * i);

    i++;

  }
}
function draw_food(){
  fill(160, 32, 240);
  stroke(255, 255, 255);
  let pos_x = (food.x + 1/2) * world.blockWidth
  let pos_y = (food.y + 1/2) * world.blockWidth
  ellipse(pos_x, pos_y, agent.headSize, agent.headSize); 
}