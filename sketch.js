var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
	happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("Food Remaining: "+foodS, 150, 200);
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 40, 50);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  // if(x <= 0) {
  //   x = 0;
  // } else {
  //   x = x - 1;
  // }

  database.ref('/').update({
    Food:x
  })
}
