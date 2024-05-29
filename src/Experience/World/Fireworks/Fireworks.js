import * as THREE from 'three';
import gsap from 'gsap';

import fireworksVertexShader from '../../../shaders/fireworks/vertex.glsl';
import fireworksFragmentShader from '../../../shaders/fireworks/fragment.glsl';

export default class Fireworks {
  experience;
  scene;
  resources;
  time;
  debug;
  debugFolder;
  fireworks;

  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.time = this.experience.time;

    this.debug = this.experience.debug;

    this.createRandomFireworks(new THREE.Vector3(0, 0, 0));

    // Create a plane to detect clicks
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({ visible: false }); // Invisible material
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.scene.add(plane);

    // Set up raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (event) => {
      // Calculate mouse position
      mouse.x = (event.clientX / this.experience.sizes.width) * 2 - 1;
      mouse.y = -(event.clientY / this.experience.sizes.height) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, this.experience.camera.instance);

      // Calculate intersection with the plane
      const intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        this.createRandomFireworks(intersectionPoint);
      }
    });
  }

  createRandomFireworks(coordinatesObject) {
    const count = Math.round(400 + Math.random() * 10000);

    // const coordinatesObject = new THREE.Vector3(
    //   (Math.random() - 0.5) * 2,
    //   Math.random(),
    //   (Math.random() - 0.5) * 2
    // );

    const size = 0.1 + Math.random() * 0.1;

    const keys = Object.keys(this.resources.items);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const texture = this.resources.items[randomKey];

    const sphereRadius = 0.5 + Math.random();

    // const color = new THREE.Color();
    // color.setHSL(Math.random(), 1, 0.9);

    const color = new THREE.Color(Math.random(), Math.random(), Math.random());

    this.createFireworks(
      count,
      coordinatesObject,
      size,
      texture,
      sphereRadius,
      color
    );
  }

  createFireworks(count, position, size, texture, sphereRadius, color) {
    const fireworks = new THREE.Points();
    const fireworksGeometry = new THREE.BufferGeometry();
    const fireworksPositions = new Float32Array(count * 3);

    texture.flipY = false; // Fix texture orientation

    for (let i = 0; i < count * 3; i++) {
      const i3 = i * 3;

      const spherical = new THREE.Spherical(
        sphereRadius * (0.75 + Math.random() * 0.25),
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );

      const position = new THREE.Vector3();
      position.setFromSpherical(spherical);

      fireworksPositions[i3 + 0] = position.x;
      fireworksPositions[i3 + 1] = position.y;
      fireworksPositions[i3 + 2] = position.z;
    }

    fireworksGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(fireworksPositions, 3)
    );

    const fireworksParticleSizesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      fireworksParticleSizesArray[i] = Math.random();
    }

    fireworksGeometry.setAttribute(
      'aSize',
      new THREE.BufferAttribute(fireworksParticleSizesArray, 1)
    );

    const timeMultipliersArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      timeMultipliersArray[i] = 1 + Math.random();
    }

    fireworksGeometry.setAttribute(
      'aTimeMultiplier',
      new THREE.BufferAttribute(timeMultipliersArray, 1)
    );

    const fireworksMaterial = new THREE.ShaderMaterial({
      vertexShader: fireworksVertexShader,
      fragmentShader: fireworksFragmentShader,
      uniforms: {
        uTime: this.time.uTime,
        uSize: new THREE.Uniform(size),
        uResolution: new THREE.Uniform(this.experience.sizes.resolution),
        uTexture: new THREE.Uniform(texture),
        uColor: new THREE.Uniform(color),
        uProgress: new THREE.Uniform(0),
      },
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    fireworks.geometry = fireworksGeometry;
    fireworks.material = fireworksMaterial;
    fireworks.position.copy(position);

    gsap.to(fireworksMaterial.uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: 'linear',
      onComplete: () => {
        this.destroyFireworks(fireworks);
      },
    });

    this.scene.add(fireworks);
  }

  destroyFireworks(fireworks) {
    this.scene.remove(fireworks);
    fireworks.geometry.dispose();
    fireworks.material.dispose();
  }
}
