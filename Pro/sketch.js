var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0,survivaltime;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var survivalTime = 0;

function preload(){
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeystop = loadImage("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,400)
  
  ground = createSprite(400,315,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  monkey = createSprite(80,315,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addImage(monkeystop)
  monkey.scale = 0.15;
  
  obstacleGroup = new Group;
  FoodGroup = new Group;
}

function draw() {
  background(150,255,150);
  if(gamestate === PLAY){
    if(keyDown("space") && monkey.collide(ground)){
     monkey.velocityY = -19;
   }
    if(FoodGroup.collide(monkey)){
   FoodGroup.destroyEach();
     score = score + 1
   }
    
    survivalTime = Math.round(frameCount/getFrameRate());
    
    obstacles();
    
    fruits();
 }
  
  if(obstacleGroup.collide(monkey)){
     gamestate = END;
  }
  
  if(gamestate === END){
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    ground.velocityX = 0
    
    monkey.addImage(monkeystop)
  }
    
  if(ground.x < 200){
   ground.x = ground.width/2
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Banana(s): " + score,450,50);
  
  stroke("black");
  textSize("20");
  fill("black");
  text("Survival Time: " + survivalTime,50,50)
    
  monkey.velocityY = monkey.velocityY + 0.8; 
  
  monkey.collide(ground);
  
  drawSprites();
}

function obstacles(){
  if(frameCount%150 === 0){
    var obstacle = createSprite(600,285,50,50);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.18;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function fruits(){
  if(frameCount%100 === 0){
    var fruit = createSprite(590,(Math.round(random(120,200))),50,50);
    fruit.velocityX = -6;
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.lifetime = 100;
    FoodGroup.add(fruit);
  }
}

