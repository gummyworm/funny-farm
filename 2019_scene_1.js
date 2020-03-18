class Plant extends Sprite {
  constructor() {
    super('textures/corn.png', 25, 25);
  }
}

class Field extends Room {
  makeField() {
    const width = 10;
    const height = 10;
    const xStep = 50;
    const yStep = 50;
    var group = new THREE.Group();

    group.rows = width;
    group.columns = height;
    for (var x = -width/2; x < width/2; x++) {
      for (var y = 0; y < height; y++) {
        var plane = new Sprite('textures/corn.png', xStep, yStep);
        plane.position.set( x*xStep, y*yStep/16, -y*yStep );
        plane.t = 0;
        group.add(plane);
      }
    }
    return group;
  }
  
  makeHouse() {
    var plane = new Sprite('textures/farmhouse.png', 140, 80);
    plane.position.set(0, 60, -100);
    return plane;
  }

  constructor(scene, cam) {
    super(scene, cam);
    this.addThing(new Plant(), {x: 0, y: 0, z: 0});
    this.field = this.makeField();
    this.add(this.field);
    this.add(this.makeHouse());
  }

  animate() {
    this.animField();
  }

  animField() {
    for (var i = 0; i < this.field.children.length; i++) {
      var col = i % this.field.columns
      var row = Math.floor(i / this.field.columns);
      var plane = this.field.children[i];
      var rot = plane.t + (row/3000) + (col/1000);
      plane.rotation.z = .2 * Math.sin(rot);
      plane.t += .005;
    }
  }
}
