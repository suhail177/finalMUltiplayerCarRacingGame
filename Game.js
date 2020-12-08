class Game {
  constructor(){
    //empty because no properties needed.
  }

  getState(){
    //this function gathers the gameState and it depends upon the number of players entered into the player.js .
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    //here the game state is updated from 0 to 1 or 1 to 2.
    database.ref('/').update({
      gameState: state
    });
  }
//async is used to make the javascript code wait for this function to execute.
  async start(){
    //all perform one function- keeping the gameState at 0 unless all players' information is entered.
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      //once the info is entered, it will be updated into database.
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    //add the images of the cars at particular positions.
    car1 = createSprite(100,200);
    car1.addImage("car1",car1img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    //if all players are there on the track, then track and car imgs are displayed. cars will be placed at specific locations.
    if(allPlayers !== undefined){
      background("#c68767");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //makes marker under the player's car.
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          //it helps to focus on the particular player's car.
          camera.position.x = displayWidth/2;
          //it helps to compare with other players.
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    //to  move the car use up arrow. 
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //if the player reaches finish line the ganme state is end.
    if(player.distance>4120){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
  end(){
    console.log("gameEnded");
    console.log(player.rank);
  }
}
