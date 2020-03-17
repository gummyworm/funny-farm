var script;
var inventory;
var scene;
var actors = [];
var cam;
var activeItem;

class Room extends THREE.Scene {
  constructor(camera) {
    super();
    if (!camera) {
      camera = cam;
    }
    cam = camera;
    this.visited = false;
    this.background = new THREE.Color('white');
    this.add( new THREE.AmbientLight( 0x222222 ) );
    var light = new THREE.PointLight( 0xffffff );
    light.position.copy( camera.position );
    this.add( light );
  }

  addThing(t, pos) {
    this.add(t);
    t.position.set(pos.x, pos.y, pos.z);
  }
}

class Script {
  constructor(text) {
    this._div = document.createElement("div");
    document.getElementById('script').appendChild(this._div);
    this._div.setAttribute("class", "script");
  }

  print(text) {
    this._div.append(text);
  }

  option(text, handler) {
    var b = document.createElement("button")
    b.setAttribute('class', 'link');
    b.onclick = function(e) {
      if (handler) {
        handler();
      }
      b.setAttribute("disabled", "disabled");
    };
    b.innerHTML = text;
    this._div.append(b);
    console.log(word);
  }

  clear() {
    this._div.innerHTML = "";
  }
}

class Thing extends THREE.Mesh {
  constructor(geom, material) {
    super(geom, material);
  }
  moveTo( target ) {
    const speed = 100;
    const dist = target.distanceTo(this.position);
    var position = { x : this.position.x, y: this.position.y };
    var tween = new TWEEN.Tween(position).to(target, dist * speed )
      .onUpdate(function(){
        this.position.x = position.x;
        this.position.y = position.y;
      })
      .start();
  }
}

class InteractableThing extends Thing {
  constructor(geom, material) {
    super(geom, material);
  }
}

class Sprite extends InteractableThing {
  constructor(filename, w=50, h=50) {
    super(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
map: new THREE.TextureLoader().load(filename),
transparent: true
      })
    );
  }
}

// set the 'contents' property to an array of the things that are in the container
class Container extends Sprite {
  constructor(filename, w=50, h=50) {
    super(filename, w, h);
  }
  onClick() {
  }
}


class Actor extends InteractableThing {
  constructor(filename, pos) {
    super(filename, pos);
  }
}

class Inventory {
  // returns true if the inventory contains an item that is an instance of the given class
  contains(item) {
    return this._items.get(item.constructor.name) != null;
  }

  add(item) {
    this._items.set(item.constructor.name, item);
    var b = document.createElement("button")
    b.setAttribute('class', 'link');
    b.onclick = function(e) {
      activeItem = item;
    };
    b.innerHTML = item.constructor.name;
    this._div.append(b);
  }

  remove(item) {
    var i = this._div.getElementById(item);
    this._div.removeChild(i);
    delete this._items.delete(item.constructor.name);
  }

  constructor() {
    this._items = new Map();
    this._div = document.createElement("div");
    document.getElementById('inventory').appendChild(this._div);
    this._div.setAttribute("class", "inventory");
  }
}

function print(text) {
  script.print(text);
}
function option(text, handler) {
  script.option(text, handler);
}
function pause(handler) {
  var done = false;
  script.option("ok", handler);
}
function clear() {
  script.clear();
}
function say(actor, msg, style) {
  if (style) {
    // TODO:
    print(`${actor.constructor.name}: `+msg);
  } else {
    print(`${actor.constructor.name}: `+msg);
  }
}
function go(room) {
  clear();
  if (!room.visited && room.onEnter) {
    room.onEnter();
  }
  room.visited = true;
  scene = room;
}

inventory = new Inventory();
script = new Script();
