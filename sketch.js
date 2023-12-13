function setup() {
  let canva_width = 864
  let canva_height = 864

  createCanvas(canva_width, canva_height);
  
  
  world = new World(canva_width, canva_height, 72)
  agent = new Agent(world.blockWidth, int(random(world.res)), int(random(world.res)))
}

var time = 0;
var execute = 0;

var i = 0

function draw() {
  background(220);


  if(millis() - time >= 2000){
    if (i % 2 == 0) agent.move_unit(1, 0)
    else agent.move_unit(0, 1)

    time = millis()
    i++
  }
  
  
  

  world.draw();
  agent.draw(world);
}

