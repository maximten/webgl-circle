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
        float dist = sqrt((uv.x - center.x)*(uv.x - center.x) + (uv.y - center.y)*(uv.y - center.y));
        if (dist > (radius - border) && dist < (radius + border)) {
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
          radius: 0.4,
          border: 0.03,
          bgColor: [1, 0, 0, 0.3],
          color: [0, 0, 0, 1],
        }} />
      </Surface>
    )
  }
}
