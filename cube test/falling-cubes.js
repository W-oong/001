import * as THREE from 'https://cdn.jsdelivr.net/npm/three/build/three.module.js';

console.log('hi')

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,5,0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );

function getDistance(object, camera) {
    var objectPosition = new THREE.Vector3();
    var cameraPosition = new THREE.Vector3();
    
    objectPosition.setFromMatrixPosition(object.matrixWorld);
    cameraPosition.setFromMatrixPosition(camera.matrixWorld);
    
    return objectPosition.distanceTo(cameraPosition);
}

const thresholdDistance = 100;

let ticktock = 0;
let cubePiles = [];
function animate() {
	requestAnimationFrame( animate );
    ticktock++;
    if(ticktock > 15){
        ticktock = 0;
        let cubePile = makeColoredCube(getRandomHexColor());
        cubePiles.push(cubePile);
        scene.add(cubePile.cube);
        cubePile.cube.position.set(
            cubePile.positionX,
            cubePile.positionY,
            cubePile.positionZ
        )
        console.log(cubePiles)
    }

    if(ticktock > 50){
        cubePiles.array.forEach(element => {
            scene.remove(element.cube);
        });
    }

    let size = cubePiles.length;
    let toDelete = [];
    for(let i=0;i<size;i++){
        let cubePile = cubePiles[i];
        let cube = cubePile.cube;
        if (cube instanceof THREE.Mesh) {
            cube.position.x += cubePile.directionX;
            cube.position.y += cubePile.directionY;
            cube.position.z += cubePile.directionZ;
            cube.rotation.x += 0.07;
            cube.rotation.y += 0.07;
            let distance = getDistance(cube, camera);
            
            if (distance > thresholdDistance) {
                scene.remove(cube);
                toDelete.push(i);
                console.log('removed')
            }
        }
    }

    toDelete.forEach((i) => {cubePiles.splice(i, 1)})


	renderer.render( scene, camera );
}
animate();

function makeColoredCube(color){
    let material = new THREE.MeshBasicMaterial( { color: color} );
    let cube = new THREE.Mesh( geometry, material );
    return {
        cube:cube,
        positionX: makeRandom(-0, 0),
        positionY: makeRandom(-0, 0),
        positionZ: makeRandom(-0, 0),
        directionX: makeRandom(-0.3, 0.3),
        directionY: makeRandom(-0.3, 0.3),
        directionZ: makeRandom(-0.7, 0.0)
    };
}

function makeRandom(start, end){
    let range = end - start;
    return Math.random() * range + start;
}

function getRandomHexColor() {
    const randomInt = Math.floor(Math.random() * 16777216);

    const hexString = randomInt.toString(16).padStart(6, '0');

    return randomInt;
}