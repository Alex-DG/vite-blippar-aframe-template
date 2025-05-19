const vertexShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.y += sin(uTime + position.x) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uOpacity;
uniform vec3 uColor;
uniform vec3 uEmissive;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  vec3 finalColor = texColor.rgb * uColor + uEmissive; // Mix texture color with uniform color and add emissive
  gl_FragColor = vec4(finalColor, texColor.a * uOpacity);
}
`

class SmokeMaterial extends THREE.ShaderMaterial {
  constructor(texture) {
    super({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uColor: { value: new THREE.Color('#c8c6c6') },
        uOpacity: { value: 0 },
        uEmissive: { value: new THREE.Color('#939393') },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
    })
  }
}

export default SmokeMaterial
