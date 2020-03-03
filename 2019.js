var camera, scene, renderer, listener;
var room;
var raycaster;
const width = 400;
const height = 600;
mouse = new THREE.Vector2();

var mouseIsOverCanvas;
var selected = [];

function init() {
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );

	renderer.setClearColor(0x000000, 1.0);
        const fov = 75;
	camera = new THREE.PerspectiveCamera( fov, width / height, .1, 1000 );
	camera.position.set( 0, 0, 500 );
	var canvas = document.getElementById('canvas');
	canvas.appendChild(renderer.domElement);
	canvas.onmouseover = function(e) {
		mouseIsOverCanvas = true;
	};
	canvas.onmouseout = function(e) {
		mouseIsOverCanvas = false;
		document.body.style.cursor = 'default';
	};
	canvas.onmousemove = onMouseMove;
	canvas.onmouseclick = onMouseClick;
        canvas.setAttribute("border-style", "solid");

	//setRoom(scene, new Room1());
	var speech = new Script();
	speech.setScript(`
		#main
		Hello World what is [this].
		#this
		Nothing special for damn sure.`);
	speech.render(document.getElementById('script'));
	raycaster = new THREE.Raycaster();

	scene = new Room1(scene, camera);
	console.log(scene.children);
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / width) * 2 - 1;
	mouse.y = - ( event.clientY / height) * 2 + 1;
	pickObjects();
}

function onMouseClick( event ) {

}

function pickObjects() {
	if (!mouseIsOverCanvas) {
		return;
	}
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	if (intersects.length > 0) {
		document.body.style.cursor = 'pointer';
	} else {
		document.body.style.cursor = 'default';
	}
	selected = [];
	for ( var i = 0; i < intersects.length; i++ ) {
		selected.push = intersects[i];
	}
}

function animate() {
	TWEEN.update();
	renderer.clear();
	renderer.render( scene, camera );
	scene.animate();
	requestAnimationFrame( animate );
}

init();
animate();
