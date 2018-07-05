import React, { Component } from 'react'
import { Shaders, Node, GLSL } from "gl-react"
import { Surface } from "gl-react-dom"

const shaders = Shaders.create({
  circle: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform vec2 center;
      uniform float radius;
      uniform float border;
      uniform vec4 bgColor;
      uniform vec4 color;
      void main() {
        float dist = sqrt((uv.x - 0.5)*(uv.x - 0.5) + (uv.y - 0.5)*(uv.y - 0.5));
        if (dist > 0.35 && dist < 0.4) {
          gl_FragColor = vec4(color);
        } else {
          gl_FragColor = vec4(bgColor);
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
          radius: 0.1,
          border: 0.1,
          bgColor: [1, 0, 0, 0.3],
          color: [0, 0, 0, 1],
        }} />
      </Surface>
    )
  }
}
