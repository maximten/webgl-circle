import React, { Component } from 'react'
import { Shaders, Node, GLSL } from "gl-react"
import { Surface } from 'gl-react-dom'
import Animated from "animated"

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
      uniform vec3 bgColor;
      uniform vec3 color;
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
        float dist = distance(uv, center);
        float distFromRad = abs(dist - radius);
        if (dist > (radius - border) && dist < (radius + border)) {
          vec2 v1 = uv - center;
          float angleRad = atan2(-v1.x, -v1.y);
          float angleDeg = angleRad * (180.0 / M_PI) + 180.0;
          if (angleDeg < angle) {
            gl_FragColor = vec4(mix(color, bgColor, smoothstep(0.0, border, distFromRad)), 1);
          } else {
            gl_FragColor = vec4(bgColor, 1);
          }
        } else {
          gl_FragColor = vec4(bgColor, 1);
        }
      }`
  }
})

class Cirlce extends Component {
  render() {
    return (
      <Node shader={shaders.circle} uniforms={{ 
        center: [0.5, 0.5],
        radius: 0.4,
        border: 0.03,
        bgColor: [1, 0.5, 0.5],
        color: [0, 0, 0],
        angle: this.props.angle
      }} />
    )
  }
}

const AnimatedCircle = Animated.createAnimatedComponent(Cirlce)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      angle: new Animated.Value(0)
    }
  }
  componentDidMount() {
    Animated.timing(this.state.angle, { toValue: 320, duration: 1000 }).start()
  }
  render() {
    return (
      <Surface width={600} height={600}>
        <AnimatedCircle angle={this.state.angle}/>
      </Surface>
    )
  }
}
