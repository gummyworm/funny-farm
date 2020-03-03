class Plant extends Sprite {
  constructor() {
    super('textures/corn.png', 25, 25);
  }
}

class Room1 extends Room {
  makeField() {
    const width = 40;
    const height = 10;
    const xStep = 50;
    const yStep = 50;
    var geometry = new THREE.PlaneGeometry( xStep, xStep );
    var material = new THREE.MeshBasicMaterial( {color: 0x888800, side: THREE.DoubleSide} );
    var group = new THREE.Group();

    for (var x = -width/2; x < width/2; x++) {
      for (var y = 0; y < height; y++) {
        var plane = new THREE.Mesh( geometry, material );
        plane.position.set( x*xStep, y*yStep/3, -yStep );
        plane.t = 0;
        group.add(plane);
      }
    }
    return group;
  }
  
  makeHouse() {
    var geometry = new THREE.PlaneGeometry( 140, 80);
    var material = new THREE.MeshBasicMaterial( {color: 0x8888ff, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, 100, 340);
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
      var plane = this.field.children[i];
      plane.rotation.z = .5 * Math.sin(plane.t);
      plane.t += .005;
    }
  }
}
