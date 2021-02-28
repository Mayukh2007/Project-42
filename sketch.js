var monkey,monkey_running,banana,bananaImage,ground,
obstacle,obstacleImage,foodGroup,obstacleGroup,score,
survivaltime,background1,groundImage;
var gameState =0;

function preload(){
  
  
monkey_running =     loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  
}
function setup() {

 createCanvas(500,400);
 gameState=1;
 if(gameState===1){
  monkey = createSprite(100,300,20,20); 
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.10;
   
  ground = createSprite(400,330,400,10); 
  ground.x = ground.width/2;
  ground.visible = false;
    
  background1 = createSprite(0,0,600,600);
  background1.addImage("running",groundImage);
  background1.x = ground.width/2;
  background1.scale = 1.3;
  background1.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  
  obstacleGroup = new Group();
  foodGroup = new Group();
    
  monkey.setCollider("circle",0,0);
  monkey.debug = true;
 }


  
score = 0;
survivaltime = 0;
 }
function draw() {    

if(gameState===1){
  fruits();
  obstacles();
  
  ground.velocityX = -4;   
  background1.velocityX = -4; 
  if (monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();
  score = score+2;    
  }
  
  if (keyDown("space") && monkey.y>260) {
  monkey.velocityY = -17;    
  }
  switch (score){
    case 1: monkey.scale = 0.12;
    break;
    case 2: monkey.scale = 0.14;
    break;
    case 3: monkey.scale = 0.16;
    break;
    case 4: monkey.scale = 0.18;
    break;
    default:break;
  }
  if (monkey.isTouching(obstacleGroup)){
  monkey.scale = 0.10;    
  score = score-2;
  gameState = 0;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground); 
      if (ground.x < 0){
      ground.x = ground.width/2;
      }
      if (background1.x < 0){
      background1.x = background1.width/2;
      }
}
drawSprites();
textSize(20);
  fill("white")
  text("Score:" + score, 300,30);
  textSize(20);
  fill("black")
  survivaltime = Math.ceil(frameCount/frameRate());
  text("Survival Time:" + survivaltime,100,50);
  if(gameState===0){
    ground.velocityX=0;
    background1.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.velocityX=0;
    foodGroup.velocityX=0;
    textSize(50);
    fill("white")
    text("GAME OVER!!!" ,100,200);
    survivaltime=0;
  }
}
function fruits(){
if(gameState===1){
  if (frameCount % 80===0){
    banana = createSprite(500,200,20,20);  
    banana.addImage("banana",bananaImage);
    banana.scale = 0.10;
    banana.velocityX = -4;
    banana.lifetime = 120;
    banana.y = Math.round(random(120,200));
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    background1.depth = foodGroup.depth;
    foodGroup.depth =foodGroup.depth + 1;
    foodGroup.add(banana);
    }
}

}
function obstacles(){
  if(gameState===1){
    if (frameCount % 300===0){
      obstacle = createSprite(500,310,30,30);
      obstacle.addImage("rock",obstacleImage);
      obstacle.scale = 0.10;
      obstacle.velocityX = -4;
      obstacle.lifetime =120;
      background1.depth = obstacleGroup.depth;
      obstacleGroup.depth = obstacleGroup.depth + 1;
      obstacleGroup.add(obstacle);
      }
  }

}
