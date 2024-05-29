import * as THREE from 'three';

import Sizes from './Utils/Sizes'; // Responsible for handling the window size and pixel ratio
import Time from './Utils/Time'; // Responsible for handling the time
import Camera from './Camera'; // Responsible for handling the camera
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import Debug from './Utils/Debug';

import sources from './sources';

export default class Experience {
  canvas;
  sizes;
  time; // Used for animations and physics
  resources; // Used for loading environment maps, textures, etc.
  scene;
  camera;
  renderer;
  world; // Used for all our objects and geometries, materials, etc.

  constructor(canvas) {
    // Global Access
    window.experience = this; // this can be a bit messy, but can be useful (access experience object inside of console in the browser, by writing 'experience' in the console)

    //Options
    this.canvas = canvas;

    // Debug
    this.debug = new Debug();

    //Set Up
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);

    // ThreeJS objects and World:
    this.world = new World(this);

    this.sizes.on('resize', () => {
      // 'on' is used along with the 'trigger' method in the Sizes class to run code when the event is triggered
      this.resize();
    });

    this.time.on('tick', () => {
      // 'on' is used along with the 'trigger' method in the Time class to run code when the event is triggered
      this.update();
    });
  }

  resize() {
    //console.log('Resizing the experience (camera, renderer, etc)');
    this.camera.resize();
    this.renderer.resize();
  }

  // Update the Experience (the world, fox animation, OrbitControls, etc)
  update() {
    // console.log('Updating the experience');

    this.camera.update();
    this.renderer.update();
  }

  // Destroy the Experience
  destroy() {
    this.sizes.off('resize'); // remove listeners
    this.time.off('tick');
    // Traverse the whole scene:
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function in that key
          if (value && typeof value.dispose === 'function') {
            // If there is that function, call it.
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.gui.destroy();
    }
  }
}
