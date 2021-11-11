import * as THREE from './lib/build/three.module.js';
import {OrbitControls} from './lib/examples/jsm/controls/OrbitControls.js';
import {MTLLoader} from './lib/examples/jsm/loaders/MTLLoader.js';
import {OBJLoader2} from './lib/examples/jsm/loaders/OBJLoader2.js';
import {GLTFLoader} from './lib/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from './lib/examples/jsm/loaders/RGBELoader.js';
import {GUI} from './lib/build/dat.gui.module.js';

function main() {
  console.log("finally index runs");
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //include orbital control to control angle with mouse


  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  window.addEventListener('resize', function(){
  	const width = window.innerWidth;
  	const height = window.innerHeight;
    renderer.setSize(width, height);
  	camera.aspect = width / height;
  	camera.updateProjectionMatrix();
  })

  const controls = new OrbitControls(camera, renderer.domElement);

  //make dodecahedron, and material/color/image texture
  // const geometryOne = new THREE.DodecahedronGeometry(100);
  // const material = new THREE.MeshPhongMaterial({color: 0xFFFFFF, wireframe: true});
  // const dodecahedron = new THREE.Mesh(geometryOne, material);
  // // add dodecahedron
  // scene.add(dodecahedron);

  //make cube, and material/color/image texture
  const boxWidth = 100;
  const boxHeight = 100;
  const boxDepth = 100;
  const geometryTwo = new THREE.BoxBufferGeometry(boxWidth, boxHeight, boxDepth);

  const cubes =[];
  const textureLoader = new THREE.TextureLoader();
  const bgTexture = textureLoader.load('images/nightsky.jpg');
  scene.background = bgTexture;

  const cubeMaterials = [
      new THREE.MeshBasicMaterial( {map: textureLoader.load('images/one.jpg'), side: THREE.DoubleSide}), //right
      new THREE.MeshBasicMaterial( {map: textureLoader.load('images/two.jpg'), side: THREE.DoubleSide}), //left
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/three.jpg'), side: THREE.DoubleSide}), //top
      new THREE.MeshBasicMaterial( {map: textureLoader.load('images/four.png'), side: THREE.DoubleSide}), //bottom
 	    new THREE.MeshBasicMaterial( {map: textureLoader.load('images/five.jpg'), side: THREE.DoubleSide}), //front
  	  new THREE.MeshPhongMaterial( {map: textureLoader.load('images/six.jpg'), side: THREE.DoubleSide}) //back
  ];
  //var material = new THREE.MeshFaceMaterial(cubeMaterials);
  const cube = new THREE.Mesh(geometryTwo, cubeMaterials);
  // add cube
  scene.add(cube);

  const geometryThree = new THREE.BoxBufferGeometry(100, 700, 900);

  function makeVerticalWall(geometry, x, z) {
    const wallMaterial = [
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //right
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //left
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //top
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //bottom
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //front
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}) //back
    ];
 
    const wall = new THREE.Mesh(geometry, wallMaterial);
    scene.add(wall);
 
    wall.position.x = x;
    wall.position.z = z;
 
    return wall;
  }

  const geometryFour = new THREE.BoxBufferGeometry(900, 700, 100);

  function makeHorizontalWall(geometry, x, z) {
    const wallMaterial = [
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //right
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //left
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //top
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //bottom
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}), //front
      new THREE.MeshPhongMaterial( {map: textureLoader.load('images/stonebrick.png'), side: THREE.DoubleSide}) //back
    ];
 
    const wall = new THREE.Mesh(geometry, wallMaterial);
    scene.add(wall);
 
    wall.position.x = x;
    wall.position.z = z;
 
    return wall;
  }

  const walls =[
    makeVerticalWall(geometryThree, 400, 0),
    makeVerticalWall(geometryThree, -400, 0),
    makeVerticalWall(geometryThree, 1200, 0),
    makeVerticalWall(geometryThree, 1200, 900),
    makeVerticalWall(geometryThree, 1200, 1800),
    makeVerticalWall(geometryThree, 400, 900),
    makeVerticalWall(geometryThree, -400, 900),
    makeVerticalWall(geometryThree, -400, 1800),
    makeVerticalWall(geometryThree, 400, -900),
    makeVerticalWall(geometryThree, 2300, -900),
    makeVerticalWall(geometryThree, 2300, 900),
    makeVerticalWall(geometryThree, 2300, 0),
    makeVerticalWall(geometryThree, 2300, 1800),
    makeHorizontalWall(geometryFour, -100, -1300),
    makeHorizontalWall(geometryFour, -1000, -1300),
    makeHorizontalWall(geometryFour, -900, -400),
    makeHorizontalWall(geometryFour, 100, 2300),
    makeHorizontalWall(geometryFour, 1000, 2300),
    makeHorizontalWall(geometryFour, 1900, 2300),
    makeHorizontalWall(geometryFour, 900, -1300),
    makeHorizontalWall(geometryFour, 1800, -1300),
  ];  


  cubes.push(cube);





  //make a floor
  const planeSize = 8000;

  const texture = textureLoader.load('images/stonebrick.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 200;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -.5;
  scene.add(mesh);




  //make object
  const mtlLoader = new MTLLoader();
  mtlLoader.setMaterialOptions( { invertTrProperty: true } )
  mtlLoader.load('objects/mannequin.mtl', (mtlParseResult) => {
    const objLoader = new OBJLoader2();
    objLoader.load('objects/mannequin.obj', (root) => {
      scene.add(root);
      root.scale.setScalar(1/2);
      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);
 
      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());
 
      // set the camera to frame the box
      frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
 
      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });
  });

  // mtlLoader.load('objects/dqslime/source/slime/slime.mtl', (mtlParseResult) => {
  //   const objLoader = new OBJLoader2();
  //   objLoader.load('objects/dqslime/source/slime/slime.obj', (root) => {
  //     scene.add(root);
  //     root.position.z= -100;
  //     root.position.y= 50;
  //     root.scale.setScalar(100);
  //   });
  // });

  //using gltf
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('objects/rimuru_slime/scene.gltf', (gltf) => {
    const slime = gltf.scene;
    //slime.material.metalness = 0;
    slime.scale.setScalar(60);
    slime.position.z=200;
    slime.position.y=40;
    slime.rotateY(180);
    scene.add(slime);
  });

  gltfLoader.load('objects/ocarina_of_time_link/scene.gltf', (gltf) => {
    const link = gltf.scene;
    //slime.material.metalness = 0;
    link.scale.setScalar(15);
    link.position.z=-200;
    link.position.x = -100;
    link.position.y=0;
    scene.add(link);
  });

  gltfLoader.load('objects/skeleton/scene.gltf', (gltf) => {
    const skeleton = gltf.scene;
    //slime.material.metalness = 0;
    skeleton.scale.setScalar(10);
    skeleton.position.z=200;
    skeleton.position.x = 900;
    skeleton.position.y= 150;
    scene.add(skeleton);
  });

  gltfLoader.load('objects/skeleton/scene.gltf', (gltf) => {
    const skeleton = gltf.scene;
    //slime.material.metalness = 0;
    skeleton.scale.setScalar(10);
    skeleton.position.z=600;
    skeleton.position.x = 800;
    skeleton.position.y= 150;
    scene.add(skeleton);
  });

  gltfLoader.load('objects/creeper/scene.gltf', (gltf) => {
    const creeper = gltf.scene;
    //slime.material.metalness = 0;
    creeper.scale.setScalar(10);
    creeper.position.z=-900;
    creeper.position.x =-300;
    creeper.position.y=150;
    scene.add(creeper);
  });

  gltfLoader.load('objects/creeper/scene.gltf', (gltf) => {
    const creeper = gltf.scene;
    //slime.material.metalness = 0;
    creeper.scale.setScalar(10);
    creeper.position.z=-1100;
    creeper.position.x =-100;
    creeper.position.y=150;
    scene.add(creeper);
  });

  gltfLoader.load('objects/boss_emiss_test/scene.gltf', (gltf) => {
    const boss = gltf.scene;
    boss.scale.setScalar(70);
    boss.position.z=1900;
    boss.position.x = 2000;
    boss.position.y=0;
    boss.rotateY(180);
    scene.add(boss);
  });  

  const shadowTexture = textureLoader.load('images/roundshadow.png');
  const sphereShadowBases = [];

  const sphereRadius = 15;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);

  
  const shadowGeo = new THREE.PlaneBufferGeometry(1, 1);

  const numSpheres = 3;
  for (let i = 0; i < numSpheres; ++i) {
    // make a base for the shadow and the sphere.
    // so they move together.
    const base = new THREE.Object3D();
    scene.add(base);

     // add the shadow to the base
    // note: we make a new material for each sphere
    // so we can set that sphere's material transparency
    // separately.
    const shadowMat = new THREE.MeshPhongMaterial({
      map: shadowTexture,
      transparent: true,    // so we can see the ground
      depthWrite: false,    // so we don't have to sort
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = .001;  // so we're above the ground slightly
    shadowMesh.rotation.x = Math.PI * -.05;
    const shadowSize = sphereRadius * 4;
    //shadowMesh.rotateZ(270);
    shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
    base.add(shadowMesh);

    // add the sphere to the base
    const u = i / numSpheres;
    const sphereMat = new THREE.MeshPhongMaterial();
    sphereMat.color.setHSL(u, 1, .75);
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, sphereRadius + 2, 0);

    base.add(sphereMesh);

    // remember all 3 plus the y position
    sphereShadowBases.push({base, sphereMesh, shadowMesh, y: sphereMesh.position.y});
  }

  


  //positions
  camera.position.z = 10;
  camera.position.y = 100;
  cubes[0].position.x=600;
  cubes[0].position.y=200;
  cubes[0].position.z= -200;
  // dodecahedron.position.y=200
  // dodecahedron.position.z=-200
  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
 
    // compute a unit vector that points in the direction the camera is now
    // from the center of the box
        const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();
 
    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
 
    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;
 
    camera.updateProjectionMatrix();
 
    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }




  //light
  const colorOne = 0xFFFFFF;
  const colorTwo =  0xFFC0CB;
  const colorThree = 0xFFA500;
  const colorFour = 0x00FFFF;
  const intensity = 1;
  //const aLight = new THREE.AmbientLight(colorOne, intensity);
  const hLight = new THREE.HemisphereLight(colorTwo, intensity);
  const pLight = new THREE.PointLight(colorThree, intensity);
  const sLight = new THREE.SpotLight(colorFour, intensity);;
  //scene.add(aLight);
  scene.add(hLight);
  scene.add(pLight);
  scene.add(sLight);
  const pHelper = new THREE.PointLightHelper(pLight);
  scene.add(pHelper);
  const sHelper = new THREE.SpotLightHelper(sLight);
  scene.add(sHelper);

  const near = .01;
  const far = 2000;
  const color = 'lightblue';
  scene.fog = new THREE.Fog(color, near, far);
  scene.background = new THREE.Color(color);



  //gui
  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  class FogGUIHelper {
    constructor(fog, backgroundColor) {
      this.fog = fog;
      this.backgroundColor = backgroundColor;
    }
    get near() {
      return this.fog.near;
    }
    set near(v) {
      this.fog.near = v;
      this.fog.far = Math.max(this.fog.far, v);
    }
    get far() {
      return this.fog.far;
    }
    set far(v) {
      this.fog.far = v;
      this.fog.near = Math.min(this.fog.near, v);
    }
    get color() {
      return `#${this.fog.color.getHexString()}`;
    }
    set color(hexString) {
      this.fog.color.set(hexString);
      this.backgroundColor.set(hexString);
    }
  }

  class DegRadHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
      this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
  }

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -500, 500).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 500).onChange(onChangeFn);
    folder.add(vector3, 'z', -500, 500).onChange(onChangeFn);
    folder.open();
  }

  function updateLight() {
    pHelper.update();
    sHelper.update();
  }

  const gui = new GUI();
  //gui.addColor(new ColorGUIHelper(aLight, 'color'), 'value').name('car');
  //gui.add(aLight, 'intensity', 0, 2, 0.01).name('Ambient Light');
  gui.add(hLight, 'intensity', 0, 2, 0.01).name('Hemisphere Light');
  gui.add(pLight, 'intensity', 0, 2, 0.01).name('Point Light');
  gui.add(pLight, 'distance', 1, 2000).onChange(updateLight);
  gui.add(sLight, 'intensity', 0, 2, 0.01).name('Spot Light - Light');
  gui.add(sLight, 'distance', 1, 5000).onChange(updateLight);
  gui.add(new DegRadHelper(sLight, 'angle'), 'value', 0, 90).name('angle').onChange(updateLight);
  gui.add(sLight, 'penumbra', 0, 1, 0.01);
  const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
  gui.add(fogGUIHelper, 'near', near, far).listen();
  gui.add(fogGUIHelper, 'far', near, far).listen();
  gui.addColor(fogGUIHelper, 'color');

  makeXYZGUI(gui, pLight.position, 'Point position');
  makeXYZGUI(gui, sLight.position, 'Spot Light position', updateLight);
  makeXYZGUI(gui, sLight.target.position, 'target', updateLight);




  function render(time) {
    time *= 0.001;  // convert time to seconds 

    sphereShadowBases.forEach((sphereShadowBase, ndx) => {
      const {base, sphereMesh, shadowMesh, y} = sphereShadowBase;

      // u is a value that goes from 0 to 1 as we iterate the spheres
      const u = ndx / sphereShadowBases.length;

      // compute a position for there base. This will move
      // both the sphere and its shadow
      const speed = time * .2;
      const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
      const radius = Math.sin(speed - ndx) * 10;
      base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

      // yOff is a value that goes from 0 to 1
      const yOff = Math.abs(Math.sin(time * 2 + ndx));
      // move the sphere up and down
      sphereMesh.position.y = y + THREE.MathUtils.lerp(0, 100, yOff);
      // fade the shadow as the sphere goes up
      shadowMesh.material.opacity = THREE.MathUtils.lerp(1, .25, yOff);
    });

    // Set the repeat and offset properties of the background texture
    // to keep the image's aspect correct.
    // Note the image may not have loaded yet.
    const canvasAspect = window.innerWidth / window.innerHeight;
    const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
    const aspect = imageAspect / canvasAspect;
 
    bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
    bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
 
    bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
    bgTexture.repeat.y = aspect > 1 ? 1 : aspect;

    // dodecahedron.rotation.x += 0.01;
  	// dodecahedron.rotation.y += 0.005;

    //cubes[0],position.x = -2
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

main();