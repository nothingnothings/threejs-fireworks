
uniform float uTime;
uniform sampler2D uTexture;
uniform vec3 uColor;

void main() {
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0); // When we use textures with particles, we are forced to use 'gl_PointCoord' to get the texture coordinates.
    // We will use this 'r' float to COLOR our particles with the texture.
    float textureAlpha = texture(uTexture, gl_PointCoord).r; 
    
    gl_FragColor = vec4(uColor.x, uColor.y, uColor.z, textureAlpha); // We are using the 'textureAlpha' to modify the color of our particles.
    
#include <tonemapping_fragment>
#include <colorspace_fragment>
}