import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import EventEmitter from './EventEmitter';

export default class Resources extends EventEmitter {
  sources;
  items;
  toLoad;
  loaded;
  loaders;

  constructor(sources) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length; // Number of sources to load (maximum amount)
    this.loaded = 0; // Number of sources loaded so far

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      this.loadSource(source);
    }
  }

  loadSource(source) {
    const { name, type, path } = source;

    switch (type) {
      case 'gltfModel':
        this.loaders.gltfLoader.load(path, (gltf) => {
          this.items[name] = gltf;
          this.checkLoading();
        });
        break;
      case 'texture':
        this.loaders.textureLoader.load(path, (texture) => {
          this.items[name] = texture;
          this.checkLoading();
        });
        break;
      case 'cubeTexture':
        this.loaders.cubeTextureLoader.load(path, (cubeTexture) => {
          this.items[name] = cubeTexture;
          this.checkLoading();
        });
        break;
      default:
        console.warn('Unknown type', type);
        break;
    }
  }

  checkLoading() {
    this.loaded++;

    const progress = this.loaded / this.toLoad;
    this.trigger('progress', progress);

    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
