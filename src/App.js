import React, { Component } from 'react'
import { Shaders, Node, GLSL } from "gl-react"
import { Surface } from "gl-react-dom"

const shaders = Shaders.create({
  circle: {
    frag: GLSL`
      #define M_PI 3.1415926535897932384626433832795
      precision highp float;
      varying vec2 uv;
      uniform vec2 center;
      uniform float radius;
      uniform float border;
      uniform float angle;
      uniform vec4 bgColor;
      uniform vec4 color;
      float atan2(float y, float x) {
        if (x > 0.0) {
          return atan(y / x);
        } else if ((x < 0.0) && (y >= 0.0)) {
          return (atan(y / x) + M_PI);
        } else if ((x < 0.0) && (y < 0.0)) {
          return (atan(y / x) - M_PI);
        } else if ((x == 0.0) && (y > 0.0)) {
          return M_PI / 2.0;
        } else if ((x == 0.0) && (y < 0.0)) {
          return (0.0 - (M_PI / 2.0));
        }
      }
      void main() {
        float dist = sqrt((uv.x - center.x)*(uv.x - center.x) + (uv.y - center.y)*(uv.y - center.y));
        if (dist > (radius - border) && dist < (radius + border)) {
          vec2 v1 = uv - center;
          float angleRad = atan2(-v1.x, -v1.y);
          float angleDeg = angleRad * (180.0 / M_PI) + 180.0;
          if (angleDeg < angle) {
            gl_FragColor = color;
          } else {
            gl_FragColor = bgColor;
          }
        } else {
          gl_FragColor = bgColor;
        }
      }`
  }
})

export default class App extends Component {
  render() {
    return (
      <Surface width={600} height={600}>
        <Node shader={shaders.circle} uniforms={{ 
          center: [0.5, 0.5],
          radius: 0.4,
          border: 0.03,
          bgColor: [1, 0, 0, 0.3],
          color: [0, 0, 0, 1],
          angle: 45.0
        }} />
      </Surface>
    )
  }
}
