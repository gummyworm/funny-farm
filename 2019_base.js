class Room extends THREE.Scene {
  constructor(scene, cam) {
    super();
    this.background = new THREE.Color('white');
    this.add( new THREE.AmbientLight( 0x222222 ) );
    var light = new THREE.PointLight( 0xffffff );
    light.position.copy( cam.position );
    this.add( light );
  }

  addThing(t, pos) {
    this.add(t);
    t.position.set(pos.x, pos.y, pos.z);
  }
}

class Script {
  render(parent) {
    var div = this._div;
    var word = "";
    const line = this._lines[this._id];
    if (!line) {
      return;
    }
    for (var i = 0; i < line.text.length; i++) {
      var c = line.text[i];
      if (c === '[') {
	if (word.length > 0) {
          div.append(word);
	  word = "";
	}
      } else if (c === ']') {
        var b = document.createElement("button")
        b.setAttribute('class', 'link');
	var script = this;
	b.onclick = function(e) {
          script._id = b.innerHTML;
	  script.render(parent);
	  if (line.handler) {
            line.handler();
	  }
          b.setAttribute("disabled", "disabled");
	};
	b.innerHTML = word;
	div.append(b);
	word = "";
      } else {
	word += c;
      }
    }
    if (word.length > 0) {
      div.append(word);
    }
    parent.appendChild(div);
  }

  constructor(text) {
    this._div = document.createElement("div");
    this._div.setAttribute("class", "script");
    this._lines = {}; // map of ID's to text
    this._options = new Set(); // set of ID's of conversation choices
    this._id= "main";
    this.addLine("main", text);
  }

  addLine(id, text, handler = null) {
    // add the conversation ID and its corresponding to text to line
    this._lines[id] = {
      text: text,
      handler: handler,
    };
  }

  setScript(text) {
    var captureName = false;
    var lineText = "";
    var lineName = "";
    console.log(text);
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (c === "#") {
	if (lineText.length > 0) {
	  this.addLine(lineName, lineText);
          console.log(lineName, lineText);
	}
	captureName = true;
        lineName = "";
        lineText = "";
      } else if (captureName) {
        if ((c == ' ') || (c == '\t') || (c == '\n')) {
          captureName = false;
	} else {
	  lineName += c;
	}
      } else {
        lineText += c;
      }
    }
    console.log(lineName, lineText);
    this.addLine(lineName, lineText);
  }

  setLine(id) {
    this._id= id;
  }

  // get the text for the current point in the conversation
  get line() {
    return this._lines[this._id];
  }
}

class Thing extends THREE.Mesh {
  constructor(geom, material) {
    super(geom, material);
  }
  moveTo( target ) {
    const speed = 100;
    const dist = target.distanceTo(this.position);
    var position = { x : 0, y: 300 };
    var tween = new TWEEN.Tween(position).to(target, dist * speed )
      .onUpdate(function(){
        this.position.x = position.x;
        this.position.y = position.y;
      })
      .start();
  }
}

class InteractableThing extends Thing {
  constructor(filename, pos) {
    super(filename, pos);
  }
}

class Actor extends InteractableThing {
  constructor(filename, pos) {
    super(filename, pos);
  }
}

