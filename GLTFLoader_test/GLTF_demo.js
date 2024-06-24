const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//GLTFLoader 
const loader = new THREE.GLTFLoader();
loader.load('../models/do.gltf', function (gltf) {
  model = gltf.scene; 
  scene.add(model);
  renderer.render(scene, camera); 
}, undefined, function (error) {
  console.error(error);
});

//Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

//Cube 
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube ); 

//Animation loop 
function animate() {
  requestAnimationFrame(animate);

  //GLTF model rotation 
  if (model) {
    model.rotation.x += 0.01; 
    model.rotation.y += 0.01; 
    model.rotation.z += 0.03; 
  }

  //cube rotation 
  // cube.rotation.x += 0.01; 
  // cube.rotation.y += 0.01; 
  // cube.rotation.z += 0.01; 

  renderer.render(scene, camera);
}
animate(); 
