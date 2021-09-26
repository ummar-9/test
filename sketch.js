var man, manImage1, manImage2;
var obstacle, obstacle1Image, obstacle2Image, obstacleGroup;
var zombie, zombieImage1,zombieImage2,zombie2, zombie3,zombie4;
var gameover, gameoverImage;
var ground,backgroundImg;
var ebd;
var cash, cashImage;
var runSound, jumpSound, hurtSound;
var score = 0;
var invisibleGround;

var PLAY = 1;
var gameState= PLAY;
var END = 2;

function preload(){
manImage1 = loadAnimation("assets/man1.png","assets/man2.png","assets/man3.png","assets/man4.png");
manImage2 = loadAnimation("assets/man1.png");
zombieImage1 = loadAnimation("assets/a.png","assets/b.png","assets/c.png","assets/d.png");
zombieImage2 = loadAnimation("assets/a.png");
backgroundImg = loadImage("assets/track.jpg");
obstacle1Image = loadImage("assets/obstacle1.png");
obstacle2Image = loadImage("assets/fire.png");
cashImage = loadImage("assets/cash.png");
gameoverImage = loadImage("assets/gameover.jpg")
ebd = loadSound("assets/ebd.mp3");
jumpSound = loadSound("assets/jump.mp3");
hurtSound = loadSound("assets/hurt.mp3");
runSound = loadSound("assets/run.mp3");
}
function setup(){
  createCanvas(1200,700);


  invisibleGround = createSprite(600,650,1200,20);
  invisibleGround.visibility = false;


ground = createSprite(600,350,1400,700);
ground.addImage(backgroundImg);
ground.scale = 1.5;
ground.x = ground.width/2



man = createSprite(600,550,20,20);
man.addAnimation("man",manImage1);
man.addAnimation("manJump",manImage2);

zombie = createSprite(300,550,20,20)
zombie.addAnimation("zombie",zombieImage1);
zombie.addAnimation("zombie1",zombieImage2);
zombie.scale = 2;

zombie2 = createSprite(250,570,20,20)
zombie2.addAnimation("zombie",zombieImage1);
zombie2.addAnimation("zombie1",zombieImage2);
zombie2.scale = 2;

zombie3 = createSprite(200,500,20,20)
zombie3.addAnimation("zombie",zombieImage1);
zombie3.addAnimation("zombie1",zombieImage2);
zombie3.scale = 2;

zombie4 = createSprite(150,520,20,20)
zombie4.addAnimation("zombie",zombieImage1);
zombie4.addAnimation("zombie1",zombieImage2);
zombie4.scale = 2;


  runSound.play();

obstacleGroup = createGroup();
}

function draw(){
background(0);
text("$ "+ score,600,100);
if(gameState===PLAY){

ground.velocityX = -5;
if(ground.x<0){
ground.x = ground.width/2;
}
if(keyDown("space")&&man.y>550){

 jumpSound.play();
man.velocityY = -13;
man.changeAnimation("manJump",manImage2);

}

if(man.collide(invisibleGround)){
man.changeAnimation("man",manImage1);

}
man.velocityY = man.velocityY+ 0.5; 
spawnObstacles();
spawnCoins();
if(man.collide(cash)){
score = score + 100
}
}
if(obstacleGroup.collide(man)){
man.x = man.x -100;
hurtSound.play();
obstacleGroup.destroyEach();
}
if(man.collide(zombie)){
gameState=END;
}
man.collide(invisibleGround);
drawSprites()
}
function spawnObstacles(){
  if (frameCount % 80 === 0){
    obstacle = createSprite(1200,600,10,40);
    obstacle.velocityX = -10;

    var rand = Math.round(random(1,2));
    switch(rand){
    case 1: obstacle.addImage(obstacle1Image);
    obstacle.scale = 0.3;
    break;
    case 2: obstacle.addImage(obstacle2Image);
    obstacle.scale = 0.025;
    break;
    }   
    
    obstacle.depth = man.depth;
    man.depth = man.depth+1;

    obstacle.lifetime = 300; 
    obstacleGroup.add(obstacle);

    if(gameState===END){
      obstacleGroup.velocityX = 0
      ground.velocityX = 0
      cash.velocityX =0;
      cash.lifetime = -1;
      obstacleGroup.lifetime = -1
      man.changeAnimation("manJump",manImage2);
      zombie.changeAnimation("zombie1",zombieImage2);
      zombie2.changeAnimation("zombie1",zombieImage2);
      zombie3.changeAnimation("zombie1",zombieImage2);
      zombie4.changeAnimation("zombie1",zombieImage2);
      runSound.stop()
      ebd.play(); 
      gameover = createSprite(600,350,50,50);
      gameover.addImage(gameoverImage);
    }
  }
}
function spawnCoins(){
 if(frameCount % 90 === 0){
  cash = createSprite(1200,375,25,25);
  cash.velocityX = -10;
  cash.y = Math.round(random(350,450));
  cash.addImage(cashImage);
 cash.scale = 0.08
 cash.lifetime = 300;
 }
}