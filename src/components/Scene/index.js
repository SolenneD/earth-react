/** ******** Imports ********* */
import React, { PureComponent } from 'react'
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import { connect } from 'react-redux'
import { getSatellites } from '../actions'

import { Earth } from './components/Earth'
import { Orbit } from './components/orbit'
import { Bg } from './components/Bg'

class Scene extends PureComponent {
  constructor(props) {
    super(props)

    // custom camera...etc.
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.scene.background = new THREE.Color(0xaaaaaa)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.position.z = 300
    this.onWindowResize = this.onWindowResize.bind(this)
    this.initRef = this.initRef.bind(this)
    this.animate = this.animate.bind(this)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true
    this.controls.maxDistance = 300
    this.controls.minDistance = 10

    // responsive de la scene
    window.addEventListener('resize', this.onWindowResize, false)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(getSatellites())

    this.ref.appendChild(this.renderer.domElement)
    setInterval(this.fetchData, 1000)
    this.renderer.render(this.scene, this.camera)
    this.animate()
  }

  componentDidUpdate() {
    this.renderer.render(this.scene, this.camera)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animation)
  }

  // fonction responsive de la scene
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.scene.rotation.y += 0.0035
    this.renderer.render(this.scene, this.camera)
  }

  initRef(ref) {
    this.ref = ref
  }

  render() {
    const { data } = this.props

    return (
      <div id="scene" ref={this.initRef}>
        <Bg scene={this.scene} />
        <Earth scene={this.scene} />
        {data.map(item => (
          <Orbit
            scene={this.scene}
            camera={this.camera}
            renderer={this.renderer}
            key={item.id}
            r={item.r}
            x={item.x}
            y={item.y}
            z={item.z}
            event={item.event}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.satellites.data
})

export default connect(mapStateToProps)(Scene)
