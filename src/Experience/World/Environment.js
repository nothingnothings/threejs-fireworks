import * as THREE from 'three';

export default class Environment {
  experience;
  scene;
  resources;
  debug;

  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug 
    // if (this.debug.active) {
    //   this.debugFolder = this.debug.gui.addFolder('Environment');
    // }

    // this.setLight();
    // this.setEnvironmentMap();
  }

//   setLight() {
//     this.light = new THREE.DirectionalLight('#ffffff', 1);
//     this.light.castShadow = true;
//     this.light.shadow.camera.far = 15;
//     this.light.shadow.mapSize.set(1024, 1024);
//     this.light.shadow.normalBias = 0.05;
//     this.light.position.set(-3.5, 2, 1);
//     this.scene.add(this.light);



//     if (this.debug.active) {
//       this.debugFolder.add(this.light, 'intensity').step(0.001).min(0).max(2).name('lightIntensity');
//       this.debugFolder.add(this.light.position, 'x').step(0.001).min(-10).max(10).name('lightX');
//       this.debugFolder.add(this.light.position, 'y').step(0.001).min(-10).max(10).name('lightY');
//       this.debugFolder.add(this.light.position, 'z').step(0.001).min(-10).max(10).name('lightZ');
//     }
//   }

//   setEnvironmentMap() {
//     this.environmentMap = {};
//     this.environmentMap.intensity = 0.4;
//     this.environmentMap.texture = this.resources.items.environmentMapTexture;
//     this.environmentMap.texture.encoding = THREE.sRGBEncoding;
//     this.scene.environment = this.environmentMap.texture;

//     // Define this method on the 'environmentMap' property, so we can call it from the outside, to update the materials (meshStandardMaterial objects) after the envMap has been loaded. 
//     this.environmentMap.updateMaterials = () => {
//       this.scene.traverse((child) => {
//         if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
//           child.material.envMap = this.environmentMap.texture;
//           child.material.envMapIntensity = this.environmentMap.intensity;
//           child.material.needsUpdate = true;
//         }
//       });
//     }

//     // Debug 
//     if (this.debug.active) {
//       this.debugFolder.add(this.environmentMap, 'intensity').step(0.001).min(0).max(4).name('envMap Intensity').onChange(() => {this.environmentMap.updateMaterials()})
    
//     }

//     // Call the method, defined above.
//     this.environmentMap.updateMaterials();
//   }
}
