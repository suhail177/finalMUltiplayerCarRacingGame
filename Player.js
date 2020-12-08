class Player {
  constructor(){
    //this.index keeps the count of player entering the game.
    this.index = null;
    //this.distance keeps track of the y axis covered by each car.
    this.distance = 0;
    //this.name accepts the name entered by the players.
    this.name = null;
    this.rank = null;
  }

  getCount(){
    //.ref is used to refer the value entered by the player to the firebase.
    var playerCountRef = database.ref('playerCount');
    //.on is used to listen to the value entered.
    playerCountRef.on("value",(data)=>{
      //once the value is listened, it is stored in the variable "playerCount".
      playerCount = data.val();
    })
  }

  updateCount(count){
    //once the value is stored into player count, the same value gets updated in the database.
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    //here the updated value is used to check the number of players.
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
    //this function stores all the players' info.
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  getCarsAtEnd(){
    database.ref('CarsAtEnd').on("value", (data)=>{
      this.rank = data.val();
    })
  }
  static updateCarsAtEnd(rank){
    database.ref('/').update({
      CarsAtEnd: rank
    })
  }
}
