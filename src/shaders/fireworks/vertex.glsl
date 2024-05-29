
uniform float uTime;
uniform float uSize; // Global size of particles
uniform vec2 uResolution;
uniform float uProgress; // Used to control the different animation phases (exploding, scaling, falling and twinkling).

attribute float aSize; // Randomized size of each particle.
attribute float aTimeMultiplier; // Randomized time multiplier of each particle. (so that some of the particles die out faster)

varying vec2 vUv;

#include ../includes/remap.glsl

void main() {
    // ''particleProgress'' is the general progress of each particle.
    float particleProgress = uProgress * aTimeMultiplier; // we multiply the uProgress by the time multiplier, to get the rythm of decay of each particle (the progress)....
    
    vec3 newPosition = position; // so we can manipulate the position, with the animation.
    
    // Exploding:
    float explodingProgress = remap(particleProgress, 0.0, 0.1, 0.0, 1.0); // we remap the particleProgress value, so it goes from 0.0 to 1.0 super fast, the curve is super fast upwards.
    explodingProgress = clamp(explodingProgress, 0.0, 1.0); // we clamp the value to make sure it doesn't go over 1.0.
    explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0); // we apply a power function to make it go faster at the beginning, and slower at the end.
    
    newPosition *= explodingProgress;// we multiply the position by the exploding progress, so the particles explode outwards.
    
    // Falling:
    float fallingProgress = remap(particleProgress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0); 
    
    newPosition.y -= fallingProgress * 0.2; // we make the particles fall down.
    
    // Scaling:
    float sizeOpeningProgress = remap(particleProgress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(particleProgress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);
    
    // Twinkling:
    float twinklingProgress = remap(particleProgress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
    
    float sizeTwinkling = sin(particleProgress * 30.0) * 0.5 + 0.5; // ''0.5 + 0.5'' So that we get no -1 values.
    
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;
    
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    
    vec4 viewPosition = viewMatrix * modelPosition;
    
    vec4 projectionPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectionPosition;
    
    // Final Particle Size:
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    
    gl_PointSize *= (1.0 / - viewPosition.z); // Perspective (sizeAttenuation property turned on) --> particles get smaller when they are far away from the camera, and bigger when they are close to the camera.
    
    if (gl_PointSize < 1.0) {
        // Fix for windows OS (particles smaller than 1.0 pixel don't get rendered, because they get positioned super far away)
        gl_Position = vec4(9999.9);
    }
    
    vUv = uv;
}