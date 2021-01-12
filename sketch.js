//Create variables here
var  dog, happyDog, database, foodS, foodStock, dogSprite;
var database, b

function preload(){
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  database.ref('/').update({Food: 20})
  
  dogSprite = createSprite(250, 250, 40, 40);
  dogSprite.addImage("a", dog);
  dogSprite.scale = 0.25
}
function draw() {  

  background("green")

  foodStock = database.ref('Food');
  foodStock.on("value", function (data){
    foodS = data.val();
  });

  if(keyWentDown(UP_ARROW)){
    foodS -= 1 
    writeStock(foodS);
    dogSprite.addImage("a", happyDog);  
  }
  drawSprites();
  //add styles here
  fill("red");
  stroke("blue")
  textSize(20);
  text("Note: press UP_ARROW to feed drago milk", 50, 100);
  fill("blue");
  textSize(15);
  text("food remaining: "+foodS, 180, 150);
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x-1
  }
  database.ref('/').update({Food: x})
}