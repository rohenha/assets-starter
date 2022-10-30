precision highp float;

uniform vec2 uViewportSizes;

varying vec2 vUv;


void main() {
  vec2 uv = gl_FragCoord.xy/uViewportSizes.xy;
  gl_FragColor = vec4(vec3(0.), 1.);
}
