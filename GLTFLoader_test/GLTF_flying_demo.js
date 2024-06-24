const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


function getDistance(object, camera) {
    var objectPosition = new THREE.Vector3();
    var cameraPosition = new THREE.Vector3();
    
    objectPosition.setFromMatrixPosition(object.matrixWorld);
    cameraPosition.setFromMatrixPosition(camera.matrixWorld);
    
    return objectPosition.distanceTo(cameraPosition);
}


const thresholdDistance = 100;


let ticktock = 0;
let modelPiles = [];
function animate() {
	requestAnimationFrame(animate);

    ticktock++;
    if(ticktock > 15){
        ticktock = 0;
        let modelPile = loadModel();
        modelPiles.push(modelPile);
        scene.add(modelPile.model);
        modelPile.model.position.set(
            modelPile.positionX,
            modelPile.positionY,
            modelPile.positionZ
        )
        console.log(modelPiles)
    }

    let size = modelPiles.length;
    let toDelete = [];
    for(let i=0;i<size;i++){
        let modelPile = modelPiles[i];
        let model = modelPile.model;
            model.position.x += modelPile.directionX;
            model.position.y += modelPile.directionY;
            model.position.z += modelPile.directionZ;
            model.rotation.x += 0.01;
            model.rotation.z += 0.03;
            let distance = getDistance(model, camera);
            
            if (distance > thresholdDistance) {
                scene.remove(model);
                toDelete.push(i);
                console.log('removed')
            }
    }

    toDelete.forEach((i) => {modelPiles.splice(i, 1)})

	renderer.render( scene, camera );
}
animate();


function loadModel(){

    //GLTFLoader 
    const loader = new THREE.GLTFLoader();
    loader.load('../models/do.gltf', function (gltf) {
    model = gltf.scene; 
    renderer.render(scene, camera);
    }, undefined, function (error) {
    console.error(error);
    });


    return {
        model:model,
        positionX: makeRandom(-0, 0),
        positionY: makeRandom(-0, 0),
        positionZ: makeRandom(-0, 0),
        directionX: makeRandom(-0.03, 0.03),
        directionY: makeRandom(-0.03, 0.03),
        directionZ: makeRandom(-0.03, 0.03)
    };
}



function makeRandom(start, end){
    let range = end - start;
    return Math.random() * range + start;
}
