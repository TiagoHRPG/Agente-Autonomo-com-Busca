function setup() {
  let canva_width = 864
  let canva_height = 864

  createCanvas(canva_width, canva_height);
  
  
  world = new World(canva_width, canva_height, 72)
  agent = new Agent(world.blockWidth, random(canva_width), random(canva_height))
}

function draw() {
  background(220);

  world.draw();
  agent.draw();

}
