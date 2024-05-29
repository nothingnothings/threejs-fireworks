// import * as THREE from 'three'

// import { Sky } from 'three/examples/jsm/objects/Sky.js'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import GUI from 'lil-gui'
// import gsap from 'gsap'; // For handling the animation phases of the fireworks. ('uProgress' uniform).

// import fireworksVertexShader from './shaders/fireworks/vertex.glsl'
// import fireworksFragmentShader from './shaders/fireworks/fragment.glsl'

// /**
//  * Base
//  */

// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     pixelRatio: Math.min(window.devicePixelRatio, 2)
// }

// sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

// // Firework parameters:
// const parameters = {
//     uTime: new THREE.Uniform(0),
//     uSize: new THREE.Uniform(50)
// };


// // Debug
// const gui = new GUI({ width: 340 })

// gui.add(parameters.uSize, 'value').min(0).max(1000).step(1).name('firework size');

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()


// // Loaders
// const textureLoader = new THREE.TextureLoader()


// const whiteCircleTexture = textureLoader.load('/particles/1.png')
// const darkCircleTexture = textureLoader.load('/textures/particles/2.png')
// const starLineTexture = textureLoader.load('/textures/particles/3.png')
// const fatStarTexture = textureLoader.load('/textures/particles/4.png')
// const starTexture = textureLoader.load('/textures/particles/5.png')
// const brightStarTexture = textureLoader.load('/textures/particles/6.png')
// const heartTexture = textureLoader.load('/textures/particles/7.png')
// const cartoonStarTexture = textureLoader.load('/particles/8.png')

// const textures = [
//     whiteCircleTexture,
//     darkCircleTexture,
//     starLineTexture,
//     fatStarTexture,
//     starTexture,
//     brightStarTexture,
//     heartTexture,
//     cartoonStarTexture
// ]

// textures.map(
//     (texture) => {
//         texture.flipY = false; // Fixes all the textures starting upside down, in our shaders.
//     }
// )

// /**
//  * Sizes
//  */

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight
    
//     // Update resolution and pixelRatio
//     sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
//     sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(sizes.pixelRatio)
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(1.5, 0, 6)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(sizes.pixelRatio)



// // Sky:
// const sky = new Sky();
// sky.scale.setScalar(450000);
// scene.add(sky);

// const sun = new THREE.Vector3();

// const skyParameters = {
//     turbidity: 10,
//     rayleigh: 3,
//     mieCoefficient: 0.005,
//     mieDirectionalG: 0.95,
//     elevation: -2.2,
//     azimuth: 180,
//     exposure: renderer.toneMappingExposure
// }

// const updateSky = () =>
//     {
//         const uniforms = sky.material.uniforms
//         uniforms['turbidity'].value = skyParameters.turbidity
//         uniforms['rayleigh'].value = skyParameters.rayleigh
//         uniforms['mieCoefficient'].value = skyParameters.mieCoefficient
//         uniforms['mieDirectionalG'].value = skyParameters.mieDirectionalG
    
//         const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation)
//         const theta = THREE.MathUtils.degToRad(skyParameters.azimuth)
    
//         sun.setFromSphericalCoords(1, phi, theta)
    
//         uniforms['sunPosition'].value.copy(sun)
    
//         renderer.toneMappingExposure = skyParameters.exposure
//         renderer.render(scene, camera)
//     }

// updateSky();




// gui.add(skyParameters, 'turbidity', 0.0, 20.0, 0.1).onChange(updateSky)
// gui.add(skyParameters, 'rayleigh', 0.0, 4, 0.001).onChange(updateSky)
// gui.add(skyParameters, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(updateSky)
// gui.add(skyParameters, 'mieDirectionalG', 0.0, 1, 0.001).onChange(updateSky)
// gui.add(skyParameters, 'elevation', -3, 10, 0.01).onChange(updateSky)
// gui.add(skyParameters, 'azimuth', - 180, 180, 0.1).onChange(updateSky)
// gui.add(skyParameters, 'exposure', 0, 1, 0.0001).onChange(updateSky)




// // Destroy
// const destroyFrameworks = (threeObject) => {

//     scene.remove(threeObject);
//     threeObject.geometry.dispose();
//     threeObject.material.dispose();

//     console.log('destroy');
// }


// const createFireworks = (count, mousePosition, size, texture, sphereRadius, color) => {
//     console.log('triggered', texture); 

//     const fireworks = new THREE.Points();

//     const fireworksGeometry = new THREE.BufferGeometry();

//     const fireworksPositions = new Float32Array(count * 3);

//     for (let i = 0; i < count * 3; i++) {
//         const i3 = i * 3;

//         // No 'sphere' fireworks:
//         // fireworksPositions[i3 + 0] = (Math.random() - 0.5);
//         // fireworksPositions[i3 + 1] = (Math.random() - 0.5);
//         // fireworksPositions[i3 + 2] = (Math.random() - 0.5);

//         // 'Sphere' fireworks:
//         const spherical = new THREE.Spherical(
//             sphereRadius * (0.75 + Math.random() * 0.25), // with this, we can make the fireworks' sphere be a 'little' random, not a totally perfect sphere.
//             Math.random() * Math.PI,
//             Math.random() * Math.PI * 2
//         );

//         const position = new THREE.Vector3();
//         position.setFromSpherical(spherical); // get xyz coordinates from spherical coordinates
   
//         fireworksPositions[i3 + 0] = position.x;
//         fireworksPositions[i3 + 1] = position.y;
//         fireworksPositions[i3 + 2] = position.z;
//     }


//     fireworksGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fireworksPositions, 3));


//     const fireworksParticleSizesArray = new Float32Array(count);

//     for (let i = 0; i < count; i++) {
//         fireworksParticleSizesArray[i] = Math.random();
//     }

//     fireworksGeometry.setAttribute('aSize', new THREE.BufferAttribute(fireworksParticleSizesArray, 1));



//     const timeMultipliersArray = new Float32Array(count); // Used to control the speed at which each particle 'lives' (decay of each particle, so that some die out faster than others)


//     for (let i = 0; i < count; i++) {
//         timeMultipliersArray[i] =  1 + Math.random();
//     }

//     fireworksGeometry.setAttribute('aTimeMultiplier', new THREE.BufferAttribute(timeMultipliersArray, 1));


//     const fireworksMaterial = new THREE.ShaderMaterial({
//         vertexShader: fireworksVertexShader,
//         fragmentShader: fireworksFragmentShader,
//         uniforms: {
//             uTime: parameters.uTime,
//             uSize: new THREE.Uniform(size), // Global base size of fireworks particles
//             uResolution: new THREE.Uniform(sizes.resolution), // Fixes the 'big particles on resize for bigger screen' and 'small particles on resize for smaller screen'...
//             uTexture: new THREE.Uniform(texture),
//             uColor: new THREE.Uniform(color),
//             uProgress: new THREE.Uniform(0) // Used to control the STEPS of our FIREWORKS ANIMATION, in the VERTEX SHADER.
//             // uTexture1: new THREE.Uniform(whiteCircleTexture),
//             // uTexture2: new THREE.Uniform(darkCircleTexture),
//             // uTexture3: new THREE.Uniform(starLineTexture),
//             // uTexture4: new THREE.Uniform(fatStarTexture),
//             // uTexture5: new THREE.Uniform(starTexture),
//             // uTexture6: new THREE.Uniform(brightStarTexture),
//             // uTexture7: new THREE.Uniform(heartTexture),
//             // uTexture8: new THREE.Uniform(cartoonStarTexture)


//         },
//         transparent: true,
//         vertexColors: true,
//         depthWrite: false, // Fix the particles occluding each other (ugly texture black border fix).
//         blending: THREE.AdditiveBlending,
//     });

//     fireworks.geometry = fireworksGeometry;
//     fireworks.material = fireworksMaterial;
//     fireworks.position.copy(mousePosition);


//         // Animate the 'uProgress' uniform, to have phases in the fireworks animation:.
//         gsap.to(fireworksMaterial.uniforms.uProgress, 
//             {
//             value: 1, // uProgress will go from 0 to 1, in 3 seconds.
//             duration: 3, // 3 seconds to complete the animation.
//             ease: 'linear', // disable the default easing of 'gsap', because we are going to handle the 'easing', in the animation phases, from inside the vertexShader itself..
//             onComplete: () => {destroyFrameworks(fireworks)} // Destroy the fireworks after the animation is complete.
//         }
//     );

//     scene.add(fireworks);
// }


// const createRandomFireworks = (position) => {
//     // Count:
//     const count = Math.round(400 + Math.random() * 1000);

//     // Position:
//     const coordinatesObject = new THREE.Vector3(
//         (Math.random() - 0.5) * 2,
//         Math.random(),
//         (Math.random() - 0.5) * 2
//     );

//     // Size:
//     const size = 0.1 + Math.random() * 0.1;

//     // Texture (get a random one):
//     const texture = textures[Math.floor(Math.random() * textures.length)];

//     // Sphere Radius:
//     const sphereRadius = 0.5 + Math.random();

//     // Color:
//     const color = new THREE.Color();
//     color.setHSL(Math.random(), 1, 0.7);  // Hue, Saturation and Lightness... (this is better than randomizing RGB, the results are better, for randomized colors...)


//     // Create Firework:
//     createFireworks(count, coordinatesObject, size, texture, sphereRadius, color);
// }


// // Count, Position, Size, Texture, Radius of Sphere, Color;
// createRandomFireworks(new THREE.Vector3(0, 0, 0));



// window.addEventListener('click', (event) => {   

//     const mouseX = (event.clientX / sizes.width) * 2 - 1;
//     const mouseY = -(event.clientY / sizes.height) * 2 + 1;

//     console.log(mouseX, mouseY)

//     const coordinatesObject = new THREE.Vector3(mouseX, mouseY, 0);

//     createRandomFireworks(100, coordinatesObject, 0.5, cartoonStarTexture, 1, new THREE.Color(0xff0000));
// }); 


// const clock = new THREE.Clock();

// /**
//  * Animate
//  */
// const tick = () =>
// {

//     // Update fireworks with 'uTime':
//     const elapsedTime = clock.getElapsedTime();

//     parameters.uTime.value = elapsedTime;

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()














import './style.css'
import Experience from './Experience/Experience.js'



const domElement = document.querySelector('canvas.webgl');



const experience = new Experience(domElement);

