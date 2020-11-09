var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spooky = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600,600);
  //spooky.play();
  
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 5;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
  
  
}

function draw()
{
  background(0);
  console.log(tower.height);
  
  if(tower.y > 600)
    {
      tower.y = 300;
    }
  
  if(gameState === "play")
  { 
  
  if(keyDown("space"))
    {
      ghost.velocityY = -12
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x-3;
    }
  
  if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x+3;
    }
  
  
  
  createDoors();
    
    if(climbersGroup.isTouching(ghost))
      {
        ghost.velocityY = 0;
      }
    
    if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end"
    }
  
  
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function createDoors()
{
  if(frameCount % 240 === 0) 
    {
      door = createSprite(200,-50);
      door.addImage(doorImg);
      var climber = createSprite(200,10);
      climber.addImage(climberImg);
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      
      climber.debug = true;
      invisibleBlock.debug = true;
      
      door.velocityY = 1;
      climber.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      door.x = Math.round(random(120,400));
      climber.x = door.x;
      invisibleBlock.x = door.x;
      
      ghost.depth= door.depth;
      ghost.depth= ghost.depth+1;
      
      door.lifetime = 800;
      climber.lifetime =800;
      invisibleBlock.lifetime =800;
      
      doorsGroup.add(door);
      climbersGroup.add(climber);
      invisibleBlocksGroup.add(invisibleBlock);
      
      
      
    }
  
}
