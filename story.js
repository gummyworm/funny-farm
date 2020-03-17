///////////////////////////////////////////////////////////////////////////////
// things
class Sandwich extends Thing {
  constructor() {
    super();
    this.description = "It's peanut butter and jelly on two slices of thoroughly smashed wonder bread. You think it tastes better flattened like this.";
  }
}

class Garth extends Actor {
  constructor() {
    super();
    this.description = "Garth is a sweet cat.  A large orange house cat who belongs to the proprietor's of this cursed, cursed farm."
  }

  pet() {
    print("*Pat pat* Garth wants your [sandwich].");
    option("Give it up", function() {
      if(inventory.contains(Sandwich)) {
        print("Garth happily gobbles the sandwich. Good cat!");
        inventory.remove(Sandwich);
      } else {
        print("you don't have any sandwich to give :(");
      }
    });
  }
}

class Spade extends Thing {
  constructor() {
    super();
    this.description = "Your ol' rusty, trusty spade. Cuts corn almost as good as your fingernails. Also effective against the infamous Corn Yetis.";
  }
}

class SaltedNutRoll extends Thing {
  constructor() {
    this.description = "Yum! Always save dessert for last!";
  }
}

class Cooler extends Container {
  constructor() {
    this.description = "Your name is written in permanent marker on the inside.  It contains two large water bottles that will last you <i>exactly</i> through the day. And everyday before and hereafter.";
    this.contents = [new SaltedNutRoll()];
  }
}

class Bus extends Thing {
  constructor() {
    this.description = "It's covered in dust from miles driving down gravel, and your anxiety swells imagining stepping back into its torturously hot confines";
  }
}

///////////////////////////////////////////////////////////////////////////////
// main room
class Field1 extends Field {
  constructor(scene, cam) {
    super(scene, cam);
  }

  async onEnter() {
    print("It's the twelfth of July. Them crops 're tall as you, and the sun is beatin' down like the fire it is.  Your sunburnt skin sweats from the humid breath of the corn that surrounds you. Conversation picks up around you as you emerge from your row of corn and rejoin your crew.");
    this.sandwich = new Sandwich();
    inventory.add(this.sandwich);
    this.add(new Garth());
    this.add(new Spade());
    pause(function() {
      if (inventory.contains(Sandwich)) {
        print("Garth looks hungry");
      }
      else if (inventory.contains(Spade)) {
        print("Don't forget your spade!");
      } else {
       go(new DiningRoom());
      }
    });
  }

  scene2() {
    clear();
    this.add(new Cooler());
    print("You sit down on top of your cooler beneath one of the shadier trees and remove your mud caked socks.");
    print("You deeply regret feeding Garth your sandwich as you fish out the remaining supply of your lunch. You are glad, at least, to have your salted nut roll.");
    print("While you change your socks to the fresh pair tucked in your cooler, you listen to the conversation from the next tree over, you contemplate which categories of hate speech the conversation constitues.  Racism surely, sexism?");
    print("You grab a Wet One from your travel size pack and wash most of the dirt off your hands before drying them on your new socks. You feel calmed under the shade, protected from the ruthless gaze of that <i>Satanic</i> sun.");
    print("Lunch is over too soon, but the last half of the day is always easier.  The hot blades of corn may exacerbate the microscopic cuts that cover every patch of your exposed flesh...but at least you're dry!");
  }
}

///////////////////////////////////////////////////////////////////////////////
// dining room things
class Silverwear extends Thing {
  constructor() {
    super();
    this.description = "It is absolutely gorgeous. <i>Gretta</i> brought it back from her trip to <i>Hungary</i>. It is handmade, one of a kind. Marvelous!";
  }
}

class Windows extends Thing {
  constructor() {
    super();
    this.description = "From beyond you see a majestic Atlantic vista...Pacific?";
  }
}

///////////////////////////////////////////////////////////////////////////////
// dining room
class DiningRoom extends Room {
  onEnter() {
    print("Somewhere far east or west, heavy silverwear of precious metal is set at the table. Candles and ornaments adorn the dining table from one end all the way to the opposite.");
    print("The evening sun is shining through huge streakless windows and everyone is well dressed. Over the dinner table, the casual mention of a trip to an airport.");
    print("A trip to lands even further west or even further east.");
    this.add(new Windows());
    this.add(new Silverwear());
    pause();
    transition(Field1.scene2());
  }

  scene2() {
    clear();
    const lucy = new Lucy();
    const charles = new Charles();
    say(lucy, 'What should we do today, Charles!? A round of tennis?  Take the yacht out on the lake?');
    print("The distant echo of a plate crashing in a room far away reaches the hall.");
    say(lucy, "James! Heavens, that clumsy oaf...");
    say(charles, "I'll take care of this, Lucy");
    say(charles, "Gunther!", 'bellows');

    const gunther = new Gunther();
    print("Gunther comes sliding into the room");
    this.add(gunther);
    say(charles, "Gunther, go <i>take care</i> of James please");
    say(gunther, "But of course, sir", 'replies.');
  }
}

