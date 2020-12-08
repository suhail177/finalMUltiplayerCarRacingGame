class Form {

  constructor() {
    //createInput(); helps to gather information from the player. Eg: name, age, gender, etc.
    this.input = createInput("Name");
    //create button helps to create specific buttons for specific tasks.
    this.button = createButton('Play');
    this.reset = createButton('reset');
    //createElement helps to display text which are non editable.
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    
  }
  //hide function is used to hide the particular things at particular times.
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    //this is used to display title at particular position.
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);
    //this is used to display input, button & reset at particular position.
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100,20);
    //The following are the results which occurs after the button is clicked.
    this.button.mousePressed(()=>{
      // 1. The first page which contains name and button gets hidden.
      this.input.hide();
      this.button.hide();
      // 2. The player name and count gets added and increased in firebase.
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      // 3. The player count and name gets updated in the firebase.
      player.update();
      player.updateCount(playerCount);
      // 4. displays greeting at a particular position. 
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    this.reset.mousePressed(()=>{
      // Makes the playercount and gameState 0 in firebase.
      player.updateCount(0);
      game.update(0);
    })
  }
}
